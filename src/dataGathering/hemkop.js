const PROXY_URL = "https://proxy.corsfix.com/?";

export async function getHemkopOffers(storeId = "4520") {
  try {
    const targetUrl = `https://www.hemkop.se/search/campaigns/offline?q=${storeId}&type=PERSONAL_GENERAL&page=0&size=150&disableMimerSort=true`;

    const res = await fetch(`${PROXY_URL}${targetUrl}`, {
      headers: {
        "x-corsfix-headers": JSON.stringify({
          Origin: "https://www.hemkop.se",
          Referer: "https://www.hemkop.se/erbjudanden/"
        })
      }
    });

    const data = await res.json();
    console.log("hemköp: ",data.results[0])
    return data.results;

  } catch (err) {
    console.error("Failed to fetch Hemköp offers:", err);
  }
}