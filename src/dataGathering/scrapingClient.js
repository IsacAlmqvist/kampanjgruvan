// const API_KEY = import.meta.env.VITE_SCRAPINGBEE_API_KEY

// export async function fetchWithScrapingBee(url) {
//     try {
//         const apiKey = API_KEY;
//         const scrapingBeeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${apiKey}&url=${encodeURIComponent(url)}&render_js=true`;
        
//         console.log('Fetching from ScrapingBee..., with url: ' + scrapingBeeUrl);

//         const response = await fetch(scrapingBeeUrl);

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
//         }
        
//         const text = await response.text();

//         // Check if we got an error message from ScrapingBee
//         if (text.includes('Unauthorized') || text.includes('Invalid API key')) {
//             throw new Error('Invalid ScrapingBee API key');
//         }

//         const parser = new DOMParser();
//         const doc = parser.parseFromString(text, 'text/html');
        
//         return doc;
//     } catch (error) {
//         console.error('ScrapingBee Error:', error.message);
//         throw error;
//     }
// }