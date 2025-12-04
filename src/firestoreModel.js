import { initializeApp } from "firebase/app";
import { doc, setDoc, getDoc, getFirestore, deleteDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function connectToPersistence(model, reactionFunction){

    model.ready = false;

    const firestoreDoc = doc(db, "modelCollection", "modelDocument");

    getDoc(firestoreDoc).then(loadDataACB).catch(function errorACB(err){console.log(err)});

    async function loadDataACB(doc) {
        const snapShot = doc.data();
        const dataSnap = snapShot?.storesData || [];
        const selectedSnap = snapShot?.selectedStores || [];

        const currentWeek = model.getWeek();

        if(dataSnap[0] && dataSnap[0]?.week !== currentWeek){
            await deleteDoc(firestoreDoc);
        } else {
            model.storesData = dataSnap;      
        }
        model.selectedStores = selectedSnap;
        model.ready = true;
    }

    reactionFunction(
        function watchtThesePropsACB(){ return [
            model.storesData,
            model.selectedStores
        ]},
        function saveModelSideEffectACB(){
            if(model.ready) {
                setDoc(firestoreDoc, {
                    storesData: model.storesData,
                    selectedStores: model.selectedStores
                }, {merge:true});
            }
        }
    )
}