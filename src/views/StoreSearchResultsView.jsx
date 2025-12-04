import { observer } from "mobx-react-lite";
import { Utils } from "../utilities";

export const StoreSearchResultsView = observer(function StoreSearchResultsRender(props) {
    
    // styling done by Gemini with prompt (with a lot of adjustments afterwards): 
    // can you help me style this so that the search results are in boxes, 
    // like 4 per row, with some shadow, with a like button in them ( i can do the logic of that) 
    // and that the button is wide with an up arrow
    return (
        <div className="w-full p-4 bg-gray-50 flex flex-col">
            
            {/* Grid Container: 1 column on mobile, 4 columns on medium screens+ */}
            <div className="gap-6 w-full max-w-7xl mx-auto mb-8
                grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] 
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3 
                lg:grid-cols-4">
                {props.stores
                    .filter(store => matchesSearch(store))
                    .slice(0, 8)
                    .map(renderSearchResultCB)}
            </div>

            <button 
                className="w-[80%] max-w-7xl mx-auto mt-auto py-2 bg-white border border-gray-200 text-gray-500 rounded-xl 
                    shadow-sm hover:bg-gray-100 hover:text-gray-800 transition-all 
                    duration-200 flex items-center justify-center group"
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
    )

    function matchesSearch(storeName) {
        const query = props.searchInput?.toLowerCase() || "";

        return storeName.includes(query);
    }

    function renderSearchResultCB(store) {

        const liked = props.selectedStores.find(item => item.name === store);

        return (
            <div
                key={store} 
                className="flex flex-row justify-between bg-white rounded-2xl shadow-md hover:shadow-xl 
                    hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
            >
                <div 
                    className="ms-2 p-3 cursor-pointer items-center flex"
                >
                    <h3 className="fs-5 font-bold text-gray-800 tracking-tight">
                        {Utils.formatStoreName(store)}
                    </h3>
                </div>
                
                <button
                    className="p-4 bg-gray-50 hover:bg-gray-200 border-t border-gray-100
                        w-[30%] flex items-center justify-center gap-2 text-pink-400 
                        py-3 rounded-xl transition-colors duration-200"
                    onClick={() => {
                        liked ? props.removeSelected(store) : props.addStore(store)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 flex-shrink-0" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                    </svg>
                </button>
            </div> 
        )
    }

})