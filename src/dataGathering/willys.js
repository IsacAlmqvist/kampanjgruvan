const PROXY_URL = "https://proxy.corsfix.com/?";

export async function getWillysOffers() {
    const storeId = "2219" //any store works
  try {
        const targetUrl = `https://www.willys.se/search/campaigns/offline?q=${storeId}&type=PERSONAL_GENERAL&page=0&size=300`;

        const res = await fetch(`${PROXY_URL}${targetUrl}`, {
        headers: {
            "x-corsfix-headers": JSON.stringify({
            "Origin": "https://www.willys.se",
            "Referer": "https://www.willys.se/erbjudanden/"
            })
        }
        });

        const data = await res.json();
        console.log("W: ", data.results[0]);
        return data.results;
    } catch (err) {
        console.error("Failed to fetch Willys offers:", err);
    }
}