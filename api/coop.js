// api/coop.js
export default async function handler(req, res) {
  try {
    // Use the real Coop API URL
    const offerId = req.query.offerId || "196183";
    const target_url = `https://external.api.coop.se/dke/offers/${offerId}?api-version=v1&clustered=true`;

    // Fetch server-side (bypasses browser CORS)
    const response = await fetch(target_url, {
      headers: {
        "Referer": "https://www.coop.se/",
        "ocp-apim-subscription-key": "3804fe145c4e4629ab9b6c755d2e3cfb"
      }
    });

    // Read the body as text first for debugging
    const text = await response.text();

    // Set CORS so your frontend can fetch it
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    // Send the raw response
    res.status(200).send(text);

  } catch (err) {
    console.error("Error fetching Coop API:", err);
    res.status(500).json({ error: "Failed to fetch Coop offers" });
  }
}