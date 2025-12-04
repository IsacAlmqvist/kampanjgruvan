const API_KEY = "D6SXE7M8TPOJSS7WU4V1CRCBO2B4O8C03VJHCS4P616W904JH5M00N1XAQTT1EJ5RJUE6MGRB41FB431"
const baseIcaUrl = "https://www.ica.se/erbjudanden/"

export async function fetchWithScrapingBee(url) {
    try {
        const apiKey = API_KEY;
        const scrapingBeeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${apiKey}&url=${encodeURIComponent(url)}&render_js=true`;
        
        console.log('Fetching from ScrapingBee..., with url: ' + scrapingBeeUrl);

        const response = await fetch(scrapingBeeUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const text = await response.text();

        console.log(text);
        
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


            const mainImage = article.querySelector('.offer-card__image-inner');
            if (mainImage && mainImage.src) {
                parts.push(mainImage.src);
                if (mainImage.alt) {
                    parts.push(mainImage.alt);
                }
            }

            return parts;
        });
        
        console.log(`Successfully extracted ${articlesData.length} articles from ${url}`);
        return articlesData;
        
    } catch (error) {
        console.error('Error extracting articles:', error);
        return [];
    }
}


export async function scrapeIca(storeName){
    const url = baseIcaUrl + storeName;
    const articlesRaw = await extractArticlesFromOffersContainer(url);

    const newStoreData = [];

    articlesRaw.forEach((array, index) => {

        console.log(array);

        const article = {
            id: index,
            text: ""       
        }

        article.title = array[0];
        article.descripton = array[1];
        
        for (const element of array) {
            if (!isNaN(parseInt(element.charAt(0)))) {
                article.price = element;
                break;
            }
            article.text += element;
        }
        article.mainImgSrc = array[array.length-2];
        article.mainImgAlt = array[array.length-1];
        newStoreData.push(article);
    });
    
    // newStoreData.forEach(element => {
    //     console.log("\n");
    //     console.log("title: ", element.title);
    //     console.log("descripton: ", element.descripton);
    //     console.log("text: ", element.text);
    //     console.log("price: ", element.price);
    // });

    return newStoreData;

}