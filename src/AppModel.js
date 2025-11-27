
export const model = {

    ready: true,

    stores: [
        "ica-kvantum-liljeholmen-1003417/",
        "ica-aspudden-1003601/",
        "coop-liljeholmen/",
        "coop-midsommarkransen/"
    ],

    currentStore: null,

    setCurrentStore(store){
        this.currentStore = store;
    },

}