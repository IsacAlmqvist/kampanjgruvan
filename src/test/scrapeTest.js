const API_KEY = "D6SXE7M8TPOJSS7WU4V1CRCBO2B4O8C03VJHCS4P616W904JH5M00N1XAQTT1EJ5RJUE6MGRB41FB431"

export async function fetchWithScrapingBee(url) {
    try {
        const apiKey = API_KEY;
        const scrapingBeeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${apiKey}&url=${encodeURIComponent(url)}&render_js=true`;
        
        console.log('Fetching from ScrapingBee...');
        
        const response = await fetch(scrapingBeeUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const text = await response.text();
        
        // Check if we got an error message from ScrapingBee
        if (text.includes('Unauthorized') || text.includes('Invalid API key')) {
            throw new Error('Invalid ScrapingBee API key');
        }
        
        return text;
    } catch (error) {
        console.error('ScrapingBee Error:', error.message);
        throw error;
    }
}

export async function extractArticlesFromOffersContainer(url) {
    try {
        const html = await fetchWithScrapingBee(url);
        
        // Parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Find the offers container - note the double underscore in class name
        const offersContainer = doc.querySelector('div.offers__container');
        
        if (!offersContainer) {
            console.log('Offers container not found. Available div classes:');
            // Debug: show all div classes to help with troubleshooting
            const allDivs = doc.querySelectorAll('div');
            const divClasses = Array.from(allDivs)
                .map(div => div.className)
                .filter(className => className.length > 0);
            console.log('Unique div classes found:', [...new Set(divClasses)]);
            return [];
        }
        
        console.log('Offers container found, searching for articles...');
        
        // Find all article elements within the offers container
        const articles = offersContainer.querySelectorAll('article');
        
        // Extract data from each article
        const articlesData = Array.from(articles).map((article, index) => {

            const parts = [];
            article.querySelectorAll("*").forEach(el => {
                if (el.children.length === 0) {
                    const t = el.innerText?.trim();
                    if (t) parts.push(t);
                }
            });

            return parts;
        });
        
        console.log(`Successfully extracted ${articlesData.length} articles from ${url}`);
        return articlesData;
        
    } catch (error) {
        console.error('Error extracting articles:', error);
        return [];
    }
}
