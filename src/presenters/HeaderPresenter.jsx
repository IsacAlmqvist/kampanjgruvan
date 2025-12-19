import { HeaderView } from "../views/HeaderView";
import { StoreSearchResultsView } from "../views/StoreSearchResultsView";

import { observer } from "mobx-react-lite";


export const Header = observer(function HeaderRender(props) {

    return (
        <>
            <HeaderView
                setCurrentSearch={(searchInput) => {props.model.setCurrentSearch(searchInput)}}
                searchInput={props.model.searchInput}
                setSearchFocus={(newFocus) => props.model.setSearchFocus(newFocus)}
                user={props.model.user}
                cartItems={props.model.cartItems}
                city={props.model.userPosition.city}
                handleGetLocation={() => props.model.handleGetLocation()}
            />
            <StoreSearchResultsView 
                addStore={(store) => props.model.addStore(store)}
                stores = {props.model.allStores}
                searchInput = {props.model.searchInput}
                setSearchFocus = {() => props.model.setSearchFocus(false)}
                selectedStores = {props.model.selectedStores}
                removeSelected = {(store) => props.model.removeStore(store)}
                searchFocus = {props.model.searchFocus}
            />
        </>
        
    );

});