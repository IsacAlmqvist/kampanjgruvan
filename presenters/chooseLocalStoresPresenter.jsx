import { ChooseLocalStoresView } from "../views/chooseLocalStoresView";
import { observer } from "mobx-react-lite";

export const ChooseLocalStoresPresenter = observer(function ChooseLocalStoresRender(props) {

    return (
        <ChooseLocalStoresView 
            stores = {props.model.stores} 
            setCurrentStore={(store) => {props.model.setCurrentStore(store)}} 
            currentStore = {props.currentStore}    
        />
    );

    function update() {
        props.model.myValue++;
        console.log("updated value " + props.model.myValue);
    }
});