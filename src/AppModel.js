import pLimit from "p-limit";
import { categorizeItems } from "./gemini";
import { scrapeIca } from "./webScraping";

const limit = pLimit(5);
const running = new Map();

export const model = {
    user: null,

    setUser(u) {
        this.user = u;
    },

    ready: true,

    cartItems: [],

    searchInput: "",
    itemSearchInput: "",

    filterCategories: ["Visa Alla"],

    selectedStores: [],

    storesData: [],

    allStores: [
        "ica-kvantum-liljeholmen-1003417/",
        "ica-aspudden-1003601/",
        "maxi-ica-stormarknad-lindhagen-1003418/",
        "ica-nara-rosendal-1004328/",
        "ica-supermarket-lysekil-1004460/",
        "ica-supermarket-brommaplan-1004577/",
        "ica-nara-alvsjo-1004436/"
    ],

    searchFocus: false,

    setSearchFocus(newValue) {
        this.searchFocus = newValue;
    },

    // Sidebar props
    filterFocus: false,
    setFilterFocus(newValue) {
        this.filterFocus = newValue;
    },
    setCurrentItemSearch(input) {
        this.itemSearchInput = input;
    },
    setFilterCategory(category) {
        let newArr = [...this.filterCategories];

        if(category === "Visa Alla") {
            newArr = [category];
        } else {
            newArr.includes(category) ?
                newArr = newArr.filter(c => c !== category)
                    :
                newArr = [...newArr, category];
            newArr = newArr.filter(c => c !== "Visa Alla");
        }

        this.filterCategories = newArr;
    },


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
    },

    async getData(storeName) {
        return limit(async () => {
            console.log("scraping: " + storeName);

            const articles = await scrapeIca(storeName); 
            console.log("scraped!");   
            const processed = await categorizeItems(articles);
            console.log("processed!");

            const week = this.getWeek();

            this.setStoreData(storeName, week, processed);
        })
    },

    async safeScrape(storeName) {

        if(this.storesData.some((store) => store.storeName === storeName)) {
            console.log("store: " + storeName + " already scraped!")
            return;
        };

        if (running.has(storeName)) {
            console.log("scrape already running:", storeName);
            return running.get(storeName);
        };

        const p = this.getData(storeName)
            .finally(() => {running.delete(storeName)});

        running.set(storeName, p);

        return p;
    },

    setCurrentSearch(searchInput) {
        this.searchInput = searchInput;
    },

    async addStore(store) {
        const existing = this.selectedStores.some(i => i.name === store);
        if(existing) return;

        this.selectedStores = [
            ...this.selectedStores,
            { name: store, status: "loading" }
        ];

        try {
            await this.safeScrape(store); // this is where the magic happens

            this.selectedStores = this.selectedStores.map(s =>
                s.name === store ? { ...s, status: "ready" } : s
            );
        } catch (error) {
            console.error(error);

            // removes store (eventually we want to show error popup)
            this.selectedStores = this.selectedStores.filter(s =>
                s.name !== store 
            );
        }
        
    },
    removeStore(store) {
        this.selectedStores = this.selectedStores.filter(s => s.name !== store);
    },

    addCartItem(article, store) {
        const newItem = {store: store, article: article};
        this.cartItems = [...this.cartItems, newItem];
    },
    removeCartItem(id) {
        this.cartItems = this.cartItems.filter(i => i.article.id !== id);
    }
}