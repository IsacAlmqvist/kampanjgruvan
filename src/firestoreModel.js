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
        console.log("in FIREBASE");
        console.log(model.user);

        // Call connect once on login or guest mode
        connectToPersistence(model, reactionFunction, user ? user.uid : null);
    });
}

export function connectToPersistence(model, reactionFunction, uid){

    model.ready = false;

    const publicDoc = doc(db, "modelCollection", "publicData");
    const userDoc = uid ? doc(db, "modelCollection", uid) : null;

    getDoc(publicDoc).then(loadPublicDataACB).catch(function errorACB(err){console.log(err)});

    async function loadPublicDataACB(doc) {
        const data = doc.data();
        const storesData = data?.storesData || [];

        console.log("loading data...");

        const currentWeek = model.getWeek();

        // load user data if already logged in
        if (uid) {
            const userSnap = await getDoc(userDoc);
            model.selectedStores = userSnap.data()?.selectedStores || [];
            model.cartItems = userSnap.data()?.cartItems || [];
        } else {
            model.selectedStores = [];
            console.log("not logged in!");
        }

        if(storesData[0] && storesData[0]?.week !== currentWeek){
            await deleteDoc(publicDoc);
        } else {
            model.storesData = storesData;      
        }
        model.ready = true;
    }

    reactionFunction(
        function watchtThesePropsACB(){ return [
            model.storesData,
            model.selectedStores,
            model.cartItems,
            uid
        ]},
        function saveModelSideEffectACB(){
            if(!model.ready) return;

            setDoc(publicDoc, {
                storesData: model.storesData,
            }, {merge:true});

            if (uid) {
                setDoc(userDoc, {
                    selectedStores: model.selectedStores,
                    cartItems: model.cartItems
                }, { merge: true });
            }
        }
    )
}