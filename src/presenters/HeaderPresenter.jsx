import { HeaderView } from "../views/HeaderView";
import { StoreSearchResultsView } from "../views/StoreSearchResultsView";
import { observer } from "mobx-react-lite";

export const Header = observer(function HeaderRender(props) {
    
    function handleSetCurrentSearchACB(searchInput) {
        props.model.setCurrentSearch(searchInput);
    }
    
    function handleSetSearchFocusACB(newFocus) {
        props.model.setSearchFocus(newFocus);
    }
    
    function handleGetLocationACB() {
        props.model.handleGetLocation();
    }
    
    function handleAddStoreACB(store) {
        props.model.addStore(store);
    }
    
    function handleRemoveSelectedACB(store) {
        props.model.removeStore(store);
    }
    
    function handleSetSearchFocusFalseACB() {
        props.model.setSearchFocus(false);
    }

    return (
        <>
            <HeaderView
                numberOfItemsInCart={props.model.numberOfItemsInCart}
                setCurrentSearch={handleSetCurrentSearchACB}
                searchInput={props.model.searchInput}
                setSearchFocus={handleSetSearchFocusACB}
                user={props.model.user}
                cartItems={props.model.cartItems}
                city={props.model.userPosition.city}
                handleGetLocation={handleGetLocationACB}
            />
            <StoreSearchResultsView 
                addStore={handleAddStoreACB}
                stores={props.model.allStores}
                searchInput={props.model.searchInput}
                setSearchFocus={handleSetSearchFocusFalseACB}
                selectedStores={props.model.selectedStores}
                removeSelected={handleRemoveSelectedACB}
                searchFocus={props.model.searchFocus}
            />
        </>
    );
});