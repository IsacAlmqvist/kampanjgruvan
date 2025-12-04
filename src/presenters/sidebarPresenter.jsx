import { SidebarView } from "../views/sidebarView";
import { ChooseLocalStoresView } from "../views/chooseLocalStoresView";
import { observer } from "mobx-react-lite";

import { categorizeItems } from "../gemini";

export const Sidebar = observer(function SidebarRender(props) {

    return (
        <>
            {/* <ChooseLocalStoresView
                stores = {props.model.dummyStores}
                setCurrentStore={(store) => {props.model.setCurrentStore(store)}}
                currentStore = {props.currentStore}
                scrapeStore={handleScrapeClick}
            /> */}
            <SidebarView
                stores = {props.model.allStores}
                setCurrentSearch={(searchInput) => {props.model.setCurrentSearch(searchInput)}}
                selectedStores = {props.model.selectedStores}
                scrapeStore={handleScrapeClick}
                addStore={(store) => props.model.addStore(store)}
                searchInput={props.model.searchInput}
                removeSelected={(store) => props.model.removeStore(store)}

                getCategoriesTestACB = {handleGetCategoriesTest} // temp
            />
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