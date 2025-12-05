import { HeaderView } from "../views/HeaderView";
import { LikedStoresView } from "../views/LikedStoresView";
import { StoreSearchResultsView } from "../views/StoreSearchResultsView";

import { observer } from "mobx-react-lite";

import { categorizeItems } from "../gemini";

export const Header = observer(function HeaderRender(props) {

    return (
        <>
            <HeaderView
                setCurrentSearch={(searchInput) => {props.model.setCurrentSearch(searchInput)}}
                searchInput={props.model.searchInput}
                setSearchFocus={() => props.model.setSearchFocus(true)}
            />
            {props.model.searchFocus ? 
                <StoreSearchResultsView 
                    addStore={(store) => props.model.addStore(store)}
                    stores = {props.model.allStores}
                    searchInput = {props.model.searchInput}
                    setSearchFocus = {() => props.model.setSearchFocus(false)}
                    selectedStores = {props.model.selectedStores}
                    removeSelected = {(store) => props.model.removeStore(store)}
                />
                : null
            }
            {props.model.selectedStores.length ?
                <LikedStoresView
                    selectedStores = {props.model.selectedStores}
                    removeSelected={(store) => props.model.removeStore(store)}
                    onScrapeStore={handleScrapeClick}
                    getCategoriesTestACB = {handleGetCategoriesTest} // temp
                />
                : null
            }
        </>
        
    );

    function handleScrapeClick(){
        props.model.scrapeStore();
    }

    async function handleGetCategoriesTest() {
        const targetStore = props.model.storesData.find(store => 
            store.storeName === "ica-nara-rosendal-1004328/" // test
        );

        const responseJson = await categorizeItems(targetStore);

        console.log(responseJson)

    }
});