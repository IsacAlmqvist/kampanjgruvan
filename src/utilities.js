export const Utils = {

    // Function to insert line breaks in long text
    formatLongText(text, maxLength = 50) {
        if (!text) return "";
        
        // If text is too long, find a good breaking point
        if (text.length > maxLength) {
            // Try to break at the last space before maxLength
            const breakPoint = text.lastIndexOf(' ', maxLength);
            if (breakPoint > 0) {
                return text.substring(0, breakPoint) + '\n' + text.substring(breakPoint + 1);
            }
            // If no space found, force break at maxLength
            return text.substring(0, maxLength) + '\n' + text.substring(maxLength);
        }
        return text;
    },

    resizeImage(url, w = 300) {
      if (!url) return null;
      return url.includes("?") ? `${url}&w=${w}` : `${url}?w=${w}`;
    },

    async getUserCoords(currentPos) {
        let pos = null;
        const MAX_RETRIES = 4;
        const sleep = (ms) => new Promise(res => setTimeout(res, ms));

        // 4 retries
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
            pos = await new Promise((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: false,
                timeout: 20000,
                })
            );
            break;
            } catch (err) {
                if (attempt < MAX_RETRIES) await sleep(800);
            }
        }

        if (!pos) {
            this.quickAlert("Kunde inte hämta plats, tillåt platstjänster eller sök efter butiker", 4000);
            return { ...currentPos, city: null };
        }

        const { longitude, latitude } = pos.coords;

        let city = null;
        try {
            const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            null;
        } catch {
        }

        return { x: longitude, y: latitude, city };
    },

    sortStoresByDistance(stores, userPos) {
        if (!userPos) return stores;

        return [...stores]
            .map(store => ({
            ...store,
            distance: distanceKm(userPos, store)
            }))
            .sort((a, b) => a.distance - b.distance);
    },

    getStoreTextStyle(storeName = "") {
        const name = storeName.toLowerCase();

        if (name.includes("ica")) {return "text-red-600"}
        if (name.includes("coop")) {return "text-green-700"}
        if (name.includes("willys")) {return "text-black"}
        if (name.includes("hemköp") || name.includes("hemkop")) {return "text-red-600"}

        return "text-gray-800"
    },
    
    getStoreLineStyle(storeName = "") {
        const name = storeName.toLowerCase();

        if (name.includes("ica")) {return "bg-red-600"}
        if (name.includes("coop")) {return "bg-green-700"}
        if (name.includes("willys")) {return "bg-black"}
        if (name.includes("hemköp") || name.includes("hemkop")) {return "bg-red-600"}

        return "bg-gray-800"
    },

    quickAlert(message, duration = 2000) {
        const el = document.createElement("div");
        el.textContent = message;

        el.className =
            "fixed bottom-4 right-4 z-50 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg";

        document.body.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, duration);
    },

    // string parsing written with the help of chatGPT
    priceStringToOre(priceStr) {

        if (!priceStr) return 0;

        const s = String(priceStr)
            .toLowerCase()
            .replace(/\s+/g, " ")
            .replace(/\d+\s*för\s*/i, "")
            .trim();

        const normalized = s.replace(":-", ",00");

        const numMatch = normalized.match(/([0-9]+(?:[.,][0-9]{1,2})?)/);
        if (!numMatch) return 0;

        return(parseSwedishNumberToOre(numMatch[1]));
    },

    formatOreToSek(ore) {
        const sek = (ore || 0) / 100;
        return (
            sek.toLocaleString("sv-SE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            }) + " kr"
        );
    },

    getMultiBuyCount(price) {
        if (!price) return 1;

        const match = String(price).match(/(\d+)\s*för/i);
        return match ? parseInt(match[1], 10) : 1;
    }
}

// haversince distance algorithm
function distanceKm(a, b) {
    const R = 6371;
    const dy = (b.y - a.y) * Math.PI / 180;
    const dx = (b.x - a.x) * Math.PI / 180;

    const y1 = a.y * Math.PI / 180;
    const y2 = b.y * Math.PI / 180;

    const h =
        Math.sin(dy / 2) ** 2 +
        Math.cos(y1) * Math.cos(y2) *
        Math.sin(dx / 2) ** 2;

    return 2 * R * Math.asin(Math.sqrt(h));
}

function parseSwedishNumberToOre(numStr) {
    const cleaned = String(numStr).replace(",", ".").trim();

    const [wholePartRaw, decPartRaw = ""] = cleaned.split(".");
    const whole = parseInt(wholePartRaw, 10);
    if (!Number.isFinite(whole)) return 0;

    const dec2 = (decPartRaw + "00").slice(0, 2);
    const dec = parseInt(dec2, 10);
    if (!Number.isFinite(dec)) return whole * 100;

    return whole * 100 + dec;
}