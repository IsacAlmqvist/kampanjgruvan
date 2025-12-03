import { observer } from "mobx-react-lite";
import { Utils } from "../utilities";

export const LikedStoresView = observer(function LikedStoresRender(props) {
    
    return (
        <div>

            <div className="d-flex flex-wrap gap-1 bg-secondary p-2">
                {props.selectedStores.map(renderSelectedCB)}
            </div>

            {/* buttons for debug */}
            <button className="btn btn-primary m-2" onClick={onScrapeClickACB}>SCRAPE</button>
            <button className="btn btn-primary m-2" onClick={props.getCategoriesTestACB}>LLM-TEST</button>
        </div>
    )

    function renderSelectedCB(store) {
        return (
            <div
                key={store}
                className="bg-gray-50 rounded-full border border-gray-300 
                    flex items-center justify-between mx-2 overflow-hidden"
            >
                <div className="pl-3 pr-2">             
                    {Utils.formatStoreName(store)}
                </div>
                <button
                    className="px-3 py-1 bg-gray-50 hover:bg-gray-200 rounded-full
                        flex items-center justify-between"
                    onClick={() => props.removeSelected(store)}
                >
                    X
                </button>
            </div>
        )
    }

    async function onScrapeClickACB() {
        props.onScrapeStore();
    }

})