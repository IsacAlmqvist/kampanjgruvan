import { observer } from "mobx-react-lite";

export const StoreSearchResultsView = observer(function StoreSearchResultsRender(props) {

    let sliceSize = 8;

    if(window.innerWidth < 640) sliceSize = 5;
    else if(window.innerWidth < 1024) sliceSize = 6;
    
    return (
        <div 
            className={`
                w-full bg-theme-50 flex flex-col transition-all duration-200 overflow-hidden
                ${props.searchFocus ? "max-h-[1000px]" : "max-h-0"}
            `}
        >
            <div className="p-4">
                <div className="grid gap-6 w-full mx-auto
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4">
                    {props.stores
                        .filter(store => matchesSearch(store.name))
                        .slice(0, sliceSize)
                        .map(renderSearchResultCB)}
                </div>
            </div>

            <div className="pt-2 pb-4">
                <button
                    className="w-[80%] max-w-4xl mx-auto py-2 bg-white border border-theme-200 text-theme-700 rounded-lg
                        shadow-sm hover:bg-theme-50 transition-all duration-200 flex items-center justify-center group"
                    onClick={props.setSearchFocus}
                >
                    <span className="font-semibold mr-2">Stäng</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5 group-hover:-translate-y-1 transition-transform"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )

    function matchesSearch(storeName) {
        const query = props.searchInput?.toLowerCase() || "";
        return storeName.toLowerCase().includes(query);
    }

    function renderSearchResultCB(store) {
        const liked = props.selectedStores.find(item => item.id === store.id);

        return (
            <div
                key={store.name} 
                className="flex justify-between bg-white rounded-xl border border-theme-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => {
                    liked ? props.removeSelected(store) : props.addStore(store)
                }}
            >
                <div className="p-4 pr-2 flex items-center">
                    <h3 className="font-semibold text-gray-800 leading-tight">
                        {store.name}
                    </h3>
                </div>
                
                <button
                    className={`
                        w-[26%] flex flex-none items-center justify-center rounded-r-xl transition-colors duration-200
                        ${liked ? "bg-theme-100 text-theme-700" : "bg-theme-50 text-theme-400 hover:bg-theme-100"}
                    `}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 flex-shrink-0" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                    </svg>
                </button>
            </div> 
        )
    }
})
