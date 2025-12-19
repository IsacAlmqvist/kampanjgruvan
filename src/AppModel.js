import pLimit from "p-limit";
import { fetchOffers } from "./fetchingEntry";
import { allHemkopStores, allIcaStores, allWillysStores, allCoopStores } from "./constData";
import { Utils } from "./utilities";

const limit = pLimit(5);
const running = new Map();

export const model = {

    userPosition: {x: 18.0617,y: 59.3324, city: "Stockholm"},

    user: null,
    hasCheckedAuth: false,

    setUser(u) {
        this.user = u;
    },

    ready: true,

    cartItems: [],

    searchInput: "",
    itemSearchInput: "",

    filterCategories: ["Visa Alla"],

    selectedStores: [],

    closestStores: [],

    storesData: [],

    allStores: [...allIcaStores, ...allWillysStores, ...allCoopStores, ...allHemkopStores],

    searchFocus: false,

    setSearchFocus(newValue) {
        this.searchFocus = newValue;
    },

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
        if(newArr.length === 0) newArr = ["Visa Alla"];
        this.filterCategories = newArr;
    },

    async fetchData(store) {
        try {
            this.selectedStores = this.selectedStores.map(s =>
                s.name === store.name ? { ...s, status: "loading" } : s
            );

            // fetching default closest stores
            this.closestStores = this.closestStores.map(s =>
                s.name === store.name ? { ...s, status: "loading" } : s
            );

            const articles = await fetchOffers(store); // unified API fetch
            if(articles === null || articles == []) return null;

            const storeData = {
                id: store.id,
                name: store.name,
                articles: articles
            };

            // Update state
            this.storesData = [storeData, ...this.storesData];
            this.selectedStores = this.selectedStores.map(s =>
                s.name === store.name ? { ...s, status: "ready" } : s
            );
            this.closestStores = this.closestStores.map(s =>
                s.name === store.name ? { ...s, status: "ready" } : s
            );

            return storeData;

        } catch (err) {
            console.error("Failed to fetch store data:", store.name, err);
            this.selectedStores = this.selectedStores.filter(s => s.name !== store.name);
            return null;
        }
    },
    
    async fetchClosestStores() {

        console.log("fetching closest!!");
    
        const numDefaults = 4;
    
        const sorted = Utils.sortStoresByDistance(this.allStores, this.userPosition);
    
        const unselected = sorted.filter(
            s => !this.selectedStores.some(sel => sel.id === s.id)
        );
    
        const defaultsToFetch = unselected.slice(0, numDefaults);
        this.closestStores = defaultsToFetch;
    
        await Promise.all(
            defaultsToFetch.map(async store => {
                if (!this.storesData.some(s => s.id === store.id)) {
                    const data = await this.fetchData(store);
                    return data;
                }
            })
        );
        
    },

    async addStore(store) {
        this.selectedStores = [{ ...store, status: "loading" }, ...this.selectedStores];
        return this.fetchData(store);
    },

    setCurrentSearch(searchInput) {
        this.searchInput = searchInput;
    },

    removeStore(store) {
        this.selectedStores = this.selectedStores.filter(s => s.name !== store.name);
        if(!this.closestStores.some(s => s.name === store.name)) 
            this.storesData = this.storesData.filter(s => s.name !== store.name);
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

    async handleGetLocation() {
        if (!navigator.geolocation) {
            alert("Platstjänster stöds inte i din webbläsare");
            return;
        }
        console.log(this);

        try {
            const coords = await Utils.getUserCoords(this.userPosition);
            this.userPosition = coords; // { x: longitude, y: latitude, city: "Stockholm" }
        } catch (err) {
            console.error("Could not get position:", err);
            alert("Tillåt platstjänster");
        }
    }
}