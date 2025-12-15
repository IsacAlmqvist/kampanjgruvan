import { LikedStoresView } from "../views/LikedStoresView";

import { observer } from "mobx-react-lite";

import { categorizeItems } from "../gemini";

export const LikedStores = observer(function LikedStoresRender(props) {

    return (
        <>
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