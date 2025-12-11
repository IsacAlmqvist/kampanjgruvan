import { initializeApp } from "firebase/app";
import { doc, setDoc, getDoc, getFirestore, deleteDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  try {
    console.log("wtf");
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    console.error(err);
  }
}
export async function logout() {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
}

export function setupAuthListener(model, reactionFunction) {
    onAuthStateChanged(auth, user => {
        model.setUser(user);

        // Call connect once on login or guest mode
        connectToPersistence(model, reactionFunction, user ? user.uid : null);
    });
}

export async function connectToPersistence(model, reactionFunction, uid){

    model.ready = false;

    const userDoc = uid ? doc(db, "userData", uid) : null;

    if (uid) {
        try {
            const userSnap = await getDoc(userDoc);
            model.selectedStores = userSnap.data()?.selectedStores || [];
            model.cartItems = userSnap.data()?.cartItems || [];
        } catch (err) {
            console.log("Error loading user data:", err);
        }
    } else {
        model.selectedStores = [];
        console.log("not logged in!");
    }

    if (model.selectedStores.length > 0) {
        await Promise.all(
            model.selectedStores.map(store => {
                loadStore(model, store);
                model.selectedStores = model.selectedStores.map(s =>
                    s.id === store.id ? { ...s, status: "ready" } : s
                );
            })
        );
    } else {
        // TODO: load 2-3 first docs in public data
    }

    model.ready = true;

    reactionFunction(
        function watchtThesePropsACB(){ return [
            model.storesData,
            model.selectedStores,
            model.cartItems,
            uid
        ]},
        function saveModelSideEffectACB(){
            if(!model.ready) return;

            if (uid) {
                setDoc(userDoc, {
                    selectedStores: model.selectedStores,
                    cartItems: model.cartItems
                }, { merge: true });
            }
        }
    )
}

export async function loadStore(model, store) {

    model.selectedStores = model.selectedStores.map(s =>
        s.id === store.id ? { ...s, status: "loading" } : s
    );

    const storeDoc = doc(db, "publicData", store.id);
    const storeSnap = await getDoc(storeDoc);
    const loadedData = storeSnap.exists() ? storeSnap.data() : null;

    if(!loadedData) {
        model.selectedStores = model.selectedStores.map(s =>
            s.id === store.id ? { ...s, status: "scraping" } : s
        );
        const scrapeResult = await model.scrapeInit(store);
        model.storesData = [scrapeResult, ...model.storesData];
        await setDoc(storeDoc, scrapeResult, { merge: true });
    } else {
        model.storesData = [loadedData, ...model.storesData];
    }

    // const currentWeek = model.getWeek();
    // if(storesData[0] && storesData[0]?.week !== currentWeek){
    //     await deleteDoc(publicDoc);
    // } else {
}