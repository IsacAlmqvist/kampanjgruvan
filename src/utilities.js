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
        console.log(currentPos);
        let pos;
        try {
            pos = await new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: false,
                timeout: 10000,
            })
            );
        } catch (err) {
            console.warn("Could not get geolocation, using default:", err);
            return { ...currentPos, city: null };
        }

        const longitude = pos.coords.longitude;
        const latitude = pos.coords.latitude;

        let city = null;

        try {
            const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            city = data.address?.city || data.address?.town || data.address?.village || null;
        } catch (err) {
            console.warn("Could not get city from coordinates", err);
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

    getStoreBrandStyle(storeName = "") {
        const name = storeName.toLowerCase();

        if (name.includes("ica")) {
            return "text-red-600"
        }

        if (name.includes("coop")) {
            return "text-green-700"
        }

        if (name.includes("willys")) {
            return "text-black"
        }

        if (name.includes("hemköp") || name.includes("hemkop")) {
            return "text-red-600"
        }

        return "text-gray-800"
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