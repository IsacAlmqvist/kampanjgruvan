import { observer } from "mobx-react-lite";

export const LikedStoresView = observer(function LikedStoresRender(props) {

    return (
        <div className="flex flex-wrap gap-2 p-2 bg-theme-100 shadow-inner-sm">
            {props.selectedStores.map(renderSelectedCB)}
        </div>
    )

    function renderSelectedCB(store) {
        return (
            <div
                key={store.name}
                className="bg-theme-100 rounded-full border border-theme-200 
                    flex items-center justify-between mx-1 overflow-hidden"
            >
                <div className="pl-3 pr-2 text-sm font-semibold text-theme-800">             
                    {store.name}
                </div>
                <button
                    className="px-3 py-1 text-[11px] bg-theme-50 hover:bg-theme-200 rounded-full
                        flex items-center justify-between transition-colors duration-200"
                    onClick={() => props.removeSelected(store)}
                >
                    {store.status !== "ready" ?
                        <div className="animate-spin rounded-full h-5 w-5 border-2 
                            border-theme-300 border-t-transparent">
                        </div>
                    : "X" }
                </button>
            </div>
        )
    }

})
