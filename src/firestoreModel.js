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

    const defaultPos = {x: 18.0617,y: 59.3324, city: "Stockholm"}

    const userDoc = uid ? doc(db, "userData", uid) : null;

    if (uid) {
        try {
            const userSnap = await getDoc(userDoc);
            model.selectedStores = userSnap.data()?.selectedStores || [];
            model.cartItems = userSnap.data()?.cartItems || [];
            model.userPosition = userSnap.data()?.userPosition || defaultPos;
        } catch (err) {
            console.log("Error loading user data:", err);
        }
    } else {
        model.selectedStores = [];
        model.userPosition = defaultPos;
    }

    if (model.selectedStores.length > 0) {
        await Promise.all(
            model.selectedStores.map(store =>
                model.fetchData(store)
            )
        );
    }

    model.ready = true;

    reactionFunction(
        function watchtThesePropsACB(){ return [
            model.selectedStores,
            model.cartItems,
            model.userPosition,
        ]},
        function saveModelSideEffectACB(){
            if(!model.ready) return;

            if (uid) {
                setDoc(userDoc, {
                    selectedStores: model.selectedStores,
                    cartItems: model.cartItems,
                    userPosition: model.userPosition
                }, { merge: true });
            }
        }
    )
}