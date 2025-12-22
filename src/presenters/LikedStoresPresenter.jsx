import { LikedStoresView } from "../views/LikedStoresView";
import { observer } from "mobx-react-lite";

export const LikedStores = observer(function LikedStoresRender(props) {
    
    function handleRemoveSelectedACB(store) {
        props.model.removeStore(store);
    }

    return (
        <>
            {props.model.selectedStores.length ?
                <LikedStoresView
                    selectedStores={props.model.selectedStores}
                    removeSelected={handleRemoveSelectedACB}
                />
                : null
            }
        </>
    );
});