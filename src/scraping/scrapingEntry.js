import { scrapeIca } from "./ica";
import { scrapeCoop } from "./coop";
import { scrapeWillys } from "./willys";
import { scrapeHemkop } from "./hemkop";

export async function scrapeStore(store) {
    try {
        if(store.name.includes("ICA")){
            return await scrapeIca(store);
        } else if(store.name.includes("Coop")) {
            return await scrapeCoop(store);
        } else if(store.name.includes("Willys")) {
            return await scrapeWillys(store);
        } else if(store.name.includes("Hemköp")) {
            return await scrapeHemkop(store);
        } else {
            return [];
        }
    } catch(err) {
        console.log("Error scraping from " + store.name + err);
        return [];
    }
}