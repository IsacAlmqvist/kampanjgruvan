export default async function handler(req, res) {
  const { store, storeId } = req.query;

  try {
    let data;

    if (store === "coop") {
      const url = `https://external.api.coop.se/dke/offers/${storeId}?api-version=v1&clustered=true`;
      const r = await fetch(url, {
        headers: {
          "Referer": "https://www.coop.se/",
          "ocp-apim-subscription-key": "3804fe145c4e4629ab9b6c755d2e3cfb"
        }
      });
      data = await r.json();
    }

    else if (store === "willys") {
      const url = `https://www.willys.se/search/campaigns/offline?q=${storeId}&type=PERSONAL_GENERAL&page=0&size=300`;
      const r = await fetch(url, {
        headers: {
          "Origin": "https://www.willys.se",
          "Referer": "https://www.willys.se/erbjudanden/"
        }
      });
      const json = await r.json();
      data = json.results;
    }

    else if (store === "hemkop") {
      const url = `https://www.hemkop.se/search/campaigns/offline?q=${storeId}&type=PERSONAL_GENERAL&page=0&size=150&disableMimerSort=true`;
      const r = await fetch(url, {
        headers: {
          "Origin": "https://www.hemkop.se",
          "Referer": "https://www.hemkop.se/erbjudanden/"
        }
      });
      const json = await r.json();
      data = json.results;
    }

    else if (store === "ica") {
        const tokenRes = await fetch(
            "https://www.ica.se/e11/public-access-token"
        );

        const { publicAccessToken } = await tokenRes.json();

        const offersRes = await fetch(
            `https://apimgw-pub.ica.se/sverige/digx/offerreader/v1/offers/store/${storeId}`,
            {
            headers: {
                "Authorization": `Bearer ${publicAccessToken}`,
                "Accept": "application/json"
            }
            }
        );

        data = await offersRes.json();
        }


    else {
      return res.status(400).json({ error: "Unknown store" });
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (err) {
    console.error("Offers API error:", err);
    res.status(500).json({ error: "Failed to fetch offers" });
  }
}
