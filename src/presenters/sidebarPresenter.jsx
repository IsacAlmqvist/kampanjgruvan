import { SidebarView } from "../views/sidebarView";
import { ChooseLocalStoresView } from "../views/chooseLocalStoresView";
import { observer } from "mobx-react-lite";

export const SidebarPresenter = observer(function SidebarRender(props) {

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
                selectedStores = {props.selectedStores}
                scrapeStore={handleScrapeClick}
                addStore={addStore}
                searchInput={props.searchInput}
            />
        </>
        
    );

    function update() {
        props.model.myValue++;
        console.log("updated value " + props.model.myValue);
    }
    function handleScrapeClick(){
        props.model.scrapeStore();
    }

    function addStore(store) {
        props.model.addStore();
    }
});