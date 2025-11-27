import { initializeApp } from "firebase/app";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function connectToPersistence(model, reactionFunction){

    console.log("initial store: " + model.currentStore);

    model.ready = false;

    const firestoreDoc = doc(db, "modelCollection", "modelDocument");

    getDoc(firestoreDoc).then(loadDataACB).catch(function errorACB(err){console.log(err)});

    function loadDataACB(doc) {
        model.currentStore = doc.data()?.currentStore || null;       
        model.ready = true;
    }

    reactionFunction(
        function watchtThesePropsACB(){ return [
            model.currentStore,
        ]},
        function saveModelSideEffectACB(){
            if(model.ready) {
                setDoc(firestoreDoc, {
                    currentStore: model.currentStore
                }, {merge:true});
                console.log("updated firebase: " + model.currentStore);
            }
        }
    )
}