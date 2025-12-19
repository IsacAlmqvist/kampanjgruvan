import { observer } from "mobx-react-lite";
import { Utils } from "../utilities";

import { categories } from "../constData";


// design help from ChatGPT with prompt:
// design the UI for a "dropdown" filter that toggles 
// with the filter button, where you can search, and press a category, 
// i have given all the necessary props
export const FilterView = observer(function FilterRender(props) {

    return (
        <div className="relative w-full -mb-[18px]">

            {/* DROPDOWN PANEL */}
            <div
                className={`transition-all duration-200 overflow-hidden
                    m-0 shadow-lg border border-gray-400
                    ${props.filterFocus ? "max-h-[500px]" : "max-h-0"}
                `}
            >
                <div className="p-4 bg-gray-100">

                    {/* SEARCH */}
                    <input
                        type="text"
                        value={props.itemSearchInput}
                        onChange={(e) => props.setCurrentItemSearch(e.target.value)}
                        placeholder="Sök produkter..."
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-green-300
                            mb-3"
                    />

                    <div className="flex flex-wrap gap-2">
                        {["Visa Alla", ...categories].map((cat) => {
                            const active = props.filterCategories.includes(cat);

                            return (
                                <button
                                    key={cat}
                                    onClick={() => props.setFilterCategory(cat)}
                                    className={`
                                        px-3 py-2 
                                        rounded-lg text-md font-medium
                                        border transition-all duration-100

                                        ${active
                                            ? "bg-green-100 border-green-400 text-green-700 shadow-inner"
                                            : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200"
                                        }
                                    `}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* FLOATING TAB BUTTON */}
            <button
                onClick={() => {
                    props.setFilterFocus(!props.filterFocus);
                    !props.filterFocus && props.setSearchFocus(false);
                }}
                className={`ml-auto mr-3 hover:bg-gray-200 shadow-t-0
                    px-5 py-3 rounded-b-xl shadow-lg border border-t-0
                    bg-gray-100 border-gray-400 flex items-center gap-2
                    -mt-[1px]
                `}
            >
                <span className="font-semibold text-xl text-gray-700">Filter</span>
                <svg xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5
                        ${props.filterFocus ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
        </div>
    );
});

    