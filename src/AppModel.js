import { scrapeIca } from "./webScraping";

export const model = {

    ready: true,

    searchInput: "",

    selectedStores: [],

    storesData: [],

    allStores: [
        "ica-kvantum-liljeholmen-1003417/",
        "ica-aspudden-1003601/",
        "maxi-ica-stormarknad-lindhagen-1003418/",
        "ica-nara-rosendal-1004328/"
        // "coop-liljeholmen/",
        // "coop-midsommarkransen/"
    ],

    currentStore: null,
 

    getWeek() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const days = Math.floor((now - start) / (24 * 60 * 60 * 1000));
        const week = Math.ceil((days + 1) / 7);
        return week;
    },

    setStoreData(storeName, week, articles) {

        const storesDataObject = {
            storeName: storeName,
            week: week,
            articles: articles
        }
        console.log(storesDataObject);
        this.storesData = [...this.storesData, storesDataObject];
        console.log(this.storesData);
    },

    async getStoreData(storeName) {

        if(this.storesData.some((store) => store.storeName === storeName))
        {
            console.log("store: " + storeName + " already scraped!")
        } else {
            console.log(storeName);
            const articles = await scrapeIca(storeName);    
            const week = this.getWeek();

            this.setStoreData(storeName, week, articles);
        }
    },

    setCurrentSearch(searchInput) {
        this.searchInput = searchInput;
    },

    // setCurrentStore(store){
    //     this.currentStore = store;
    // },

    async scrapeStore(){
        await this.getStoreData(this.currentStore);
    },

    addStore(store) {
        this.selectedStores.some((i) => i === store) && (
            this.selectedStores = [...this.selectedStores, store]);
    }

}