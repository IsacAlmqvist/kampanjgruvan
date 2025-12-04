import { observer } from "mobx-react-lite";
import { Utils } from "../utilities";

export const LikedStoresView = observer(function LikedStoresRender(props) {
    
    return (
        <div className="d-flex flex-wrap gap-1 bg-secondary p-2">
            {props.selectedStores.map(renderSelectedCB)}
        </div>
    )

    function renderSelectedCB(store) {
        return (
            <div
                key={store.name}
                className="bg-gray-50 rounded-full border border-gray-300 
                    flex items-center justify-between mx-2 overflow-hidden"
            >
                <div className="pl-3 pr-2">             
                    {Utils.formatStoreName(store.name)}
                </div>
                <button
                    className="px-3 py-1 bg-gray-50 hover:bg-gray-200 rounded-full
                        flex items-center justify-between"
                    onClick={() => props.removeSelected(store.name)}
                >
                    {store.status === "loading" ?
                        <div className="animate-spin rounded-full h-5 w-5 border-2 
                            border-gray-300 border-t-transparent">
                        </div>
                    : "X" }
                </button>
            </div>
        )
    }

    async function onScrapeClickACB() {
        props.onScrapeStore();
    }

})