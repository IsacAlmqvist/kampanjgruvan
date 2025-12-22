import { FilterView } from "../views/FilterView";
import { observer } from "mobx-react-lite";

export const Filter = observer(function Filter(props) {
    
    function handleSetFilterFocusACB(f) {
        props.model.setFilterFocus(f);
    }
    
    function handleSetCurrentItemSearchACB(searchInput) {
        props.model.setCurrentItemSearch(searchInput);
    }
    
    function handleSetFilterCategoryACB(c) {
        props.model.setFilterCategory(c);
    }
    
    function handleSetSearchFocusACB() {
        props.model.setSearchFocus(false);
    }
    
    return (
        <FilterView
            setFilterFocus={handleSetFilterFocusACB}
            filterFocus={props.model.filterFocus}
            itemSearchInput={props.model.itemSearchInput}
            setCurrentItemSearch={handleSetCurrentItemSearchACB}
            filterCategories={props.model.filterCategories}
            setFilterCategory={handleSetFilterCategoryACB}
            setSearchFocus={handleSetSearchFocusACB}
        /> 
    );
});