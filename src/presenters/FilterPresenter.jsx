import { FilterView } from "../views/FilterView";
import { observer } from "mobx-react-lite";

import { categorizeItems } from "../gemini";

export const Filter = observer(function FilterRender(props) {

    return (
        <FilterView
            setFilterFocus = {(f) => props.model.setFilterFocus(f)}
            filterFocus = {props.model.filterFocus}
            itemSearchInput = {props.model.itemSearchInput}
            setCurrentItemSearch={(searchInput) => {props.model.setCurrentItemSearch(searchInput)}}
            filterCategory={props.model.filterCategory}
            setFilterCategory={(c) => props.model.setFilterCategory(c)}
        /> 
    );
});