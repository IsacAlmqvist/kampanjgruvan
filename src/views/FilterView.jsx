import { observer } from "mobx-react-lite";
import { categories } from "../constData";

export const FilterView = observer(function FilterRender(props) {
    return (
        <div className="relative w-full -mb-[28px]">

            <div
                className={`transition-all duration-300 overflow-hidden
                    m-0 shadow-lg border border-theme-300
                    ${props.filterFocus ? "max-h-[500px]" : "max-h-0"}
                    bg-theme-50`}
            >
                <div className="p-4">

                    <input
                        type="text"
                        value={props.itemSearchInput}
                        onChange={(e) => props.setCurrentItemSearch(e.target.value)}
                        placeholder="Sök produkter..."
                        className="mt-2 w-full px-3 py-[7px] border border-theme-200 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-theme-300
                            mb-3 bg-white text-theme-800 placeholder-theme-500"
                    />

                    <div className="flex flex-wrap gap-2">
                        {["Visa Alla", ...categories].map((cat) => {
                            const active = props.filterCategories.includes(cat);

                            return (
                                <button
                                    key={cat}
                                    onClick={() => props.setFilterCategory(cat)}
                                    className={`px-3 py-[7px] rounded-lg text-md font-medium border transition-all duration-150
                                        ${active
                                            ? "bg-theme-200 border-theme-400 text-theme-700 shadow-inner"
                                            : "bg-theme-100 border-theme-200 text-theme-600 hover:bg-theme-150 hover:text-theme-800"
                                        }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <button
                onClick={() => {
                    props.setFilterFocus(!props.filterFocus);
                    !props.filterFocus && props.setSearchFocus(false);
                }}
                className={`ml-auto mr-3 hover:bg-theme-100 shadow-lg
                    px-4 py-2 rounded-b-xl border border-t-0 border-theme-300
                    bg-theme-50 flex items-center gap-2 ${props.filterFocus && "-mt-[1px]"} transition-all duration-150`}
            >
                <span className="font-semibold text-lg text-theme-700">Filter</span>
                <svg xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 transition-transform duration-200 ${props.filterFocus ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
        </div>
    );
});
