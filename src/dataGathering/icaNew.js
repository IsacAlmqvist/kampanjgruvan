const PROXY_URL_BASE = "https://brfenergi.se/iprog/group/490/";
const PROXY_KEY = "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767";
// const PROXY = "https://api.allorigins.win/raw?url=";

export async function getIcaOffers(storeId) {
  try {

    const tokenRes = await fetch(`${PROXY_URL_BASE}https://www.ica.se/e11/public-access-token`, {
      headers: {
        "X-DH2642-Key": PROXY_KEY,
        "X-DH2642-Group": "490",
        "Accept": "application/json",
      },
    });
    const { publicAccessToken } = await tokenRes.json();

    // ${PROXY_URL_BASE}

    const offersRes = await fetch(`https://apimgw-pub.ica.se/sverige/digx/offerreader/v1/offers/store/${storeId}`, {
      headers: {
        // "X-DH2642-Key": PROXY_KEY,
        // "X-DH2642-Group": "490",
        "Authorization": `Bearer ${publicAccessToken}`,
        "Accept": "application/json",
      },
    });
    const offers = await offersRes.json();
    console.log("ica: ", offers[0])
    console.log("ica: ", offers[3])
    console.log("ica: ", offers[5])
    console.log("ica: ", offers[6])
    return offers;
  } catch (err) {
    console.error("Failed to fetch ICA offers:", err);
  }
}