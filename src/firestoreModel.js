import { initializeApp } from "firebase/app";
import { doc, setDoc, getDoc, getFirestore, deleteDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function connectToPersistence(model, reactionFunction){

    console.log("initial store: " + model.currentStore);

    model.ready = false;

    const firestoreDoc = doc(db, "modelCollection", "modelDocument");

    getDoc(firestoreDoc).then(loadDataACB).catch(function errorACB(err){console.log(err)});

    async function loadDataACB(doc) {
        const snapShot = doc.data()?.storesData || [];
        const currentWeek = model.getWeek();
        if(snapShot[0] && snapShot[0]?.week !== currentWeek){
            await deleteDoc(firestoreDoc);
        } else {
            model.storesData = snapShot;      
            model.ready = true;
        }
    }

    reactionFunction(
        function watchtThesePropsACB(){ return [
            model.storesData,
        ]},
        function saveModelSideEffectACB(){
            if(model.ready) {
                console.log(model.storesData);
                setDoc(firestoreDoc, {
                    storesData: model.storesData
                }, {merge:true});
            }
        }
    )
}