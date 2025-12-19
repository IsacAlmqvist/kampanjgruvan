import { LikedStoresView } from "../views/LikedStoresView";
import { observer } from "mobx-react-lite";

export const LikedStores = observer(function LikedStoresRender(props) {

    return (
        <>
            {props.model.selectedStores.length ?
                <LikedStoresView
                    selectedStores = {props.model.selectedStores}
                    removeSelected={(store) => props.model.removeStore(store)}
                />
                : null
            }
        </>
    );
});