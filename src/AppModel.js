import pLimit from "p-limit";
import { categorizeItems } from "./gemini";
import { scrapeIca } from "./webScraping";
import { allIcaStores } from "./constData";
import { loadStore } from "./firestoreModel";

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

    allStores: allIcaStores,

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

    setStoreData(store, week, articles) {

        
        console.log(storesDataObject);
        this.storesData = [...this.storesData, storesDataObject];
    },

    async getData(store) {
        return limit(async () => {
            console.log("scraping: " + store.name);

            const articles = await scrapeIca(store.url); 
            console.log("scraped!");   
            const processed = await categorizeItems(articles);
            console.log("processed!");

            const week = this.getWeek();

            const storesDataObject = {
                id: store.id,
                name: store.name,
                week: week,
                articles: articles
            }
            return storesDataObject;
        })
    },

    async safeScrape(store) {

        if(this.storesData.some((s) => s.id === store.id)) {
            console.log("store: " + storeName + " already scraped!")
            return this.storesData.find(s => s.id === store.id);
        };

        if (running.has(store)) {
            console.log("scrape already running:", store.name);
            return running.get(store);
        };

        const p = this.getData(store)
            .finally(() => {running.delete(store)});

        running.set(store, p);

        return p; // promise that resolves to the storeData
    },

    async scrapeInit(store) {
        try {
            const result = await this.safeScrape(store); // this is where the magic happens

            this.selectedStores = this.selectedStores.map(s =>
                s.id === store.id ? { ...s, status: "ready" } : s
            );
            return result;
        } catch (error) {
            console.error(error);

            // removes store (eventually we want to show error popup)
            this.selectedStores = this.selectedStores.filter(s =>
                s.id !== store.id 
            );
            return null;
        }
    },

    async addStore(store) {

        this.selectedStores = [{ ...store, status:"loading" }, ...this.selectedStores];

        await loadStore(this, store);

        this.selectedStores = this.selectedStores.map(s =>
            s.id === store.id ? { ...s, status: "ready" } : s
        );
    },

    setCurrentSearch(searchInput) {
        this.searchInput = searchInput;
    },

    removeStore(store) {
        this.selectedStores = this.selectedStores.filter(s => s.id !== store.id);
        this.storesData = this.storesData.filter(s => s.id !== store.id);
    },

    addCartItem(article, storeName) {

        const maxId = this.cartItems.length > 0 
            ? Math.max(...this.cartItems.map(i => i.id)) 
            : 0;

        const newItem = {
            id: maxId + 1,
            amount: 1,
            storeName: storeName, 
            article: article
        };

        this.cartItems = [newItem, ...this.cartItems];
    },

    // +1 or -1, removes if = 0
    updateCartAmount(itemId, increment) {
        this.cartItems = this.cartItems.reduce((acc, item) => {
            if (item.id === itemId) {
                const newAmount = item.amount + increment;
                if (newAmount > 0) {
                    acc.push({ ...item, amount: newAmount });
                }
            } else {
                acc.push(item);
            }
            return acc;
        }, []);
    },
}