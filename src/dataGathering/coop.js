const COURSE_PROXY = "https://brfenergi.se/iprog/group/490/";
const PROXY_KEY = "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767";

const PROXY_URL = "https://proxy.corsfix.com/?";

export async function getCoopOffers(offerId = "196183") {
  try {
    const target_url = `https://external.api.coop.se/dke/offers/${offerId}?api-version=v1&clustered=true`;

    // const res = await fetch(`${PROXY_URL}${target_url}`, {
    // headers: {
    //     // 1. Put your real API key here as normal
    //     "ocp-apim-subscription-key": "3804fe145c4e4629ab9b6c755d2e3cfb",
        
    //     // 2. Use this magic header to "sneak" the forbidden headers past the browser
    //     "x-corsfix-headers": JSON.stringify({
    //     "Origin": "https://www.coop.se",
    //     "Referer": "https://www.coop.se/"
    //     })
    // }
    // });

  const res = await fetch(
    COURSE_PROXY +
    encodeURIComponent(target_url) +
    "&origin=https://www.coop.se" +
    "&referer=https://www.coop.se/" + 
    "&ocp-apim-subscription-key=3804fe145c4e4629ab9b6c755d2e3cfb",
    {
      headers: {
        "X-DH2642-Key": PROXY_KEY,
        "X-DH2642-Group": "490",
        "Accept": "application/json",
      }
    }
  );

  console.log("status:", res.status);
  console.log("headers:", [...res.headers.entries()]);

    // return data;
  } catch (err) {
    console.error("Failed to fetch Coop offers:", err);
  }
}
