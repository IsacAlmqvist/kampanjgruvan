import { fetchWithScrapingBee } from "./scrapingClient";

export async function scrapeCoop(store){
    const url = "https://www.coop.se" + store.url;

    let doc;
    try {
        doc = await fetchWithScrapingBee(url)  
    } catch (error) {
        console.error('Error extracting offers:', error);
        return [];
    }

    console.log(doc);
    const articles = doc.querySelectorAll('article');

    console.log("got articles: ", articles);

    const newStoreData = Array.from(articles)
        .slice(0, 100)
        .map((article, index) => {
            const titleEl = article.querySelector('h4');
            const descEl = article.querySelector('.u-textSmall');
            const priceEl = article.querySelector('.slH8Imgo');
            const imgEl = article.querySelector('img');

            const articleData = {
            id: index,
            text: "",
            title: titleEl?.innerText?.trim(),
            description: descEl?.innerText?.trim(),
            price: priceEl?.innerText?.replace(/\s+/g, ' ').trim(),
            mainImgSrc: imgEl?.src,
            mainImgAlt: imgEl?.alt,
            };

            // optional extra text (brand + size)
            const metaEls = article.querySelectorAll('.uLmN8HjX span');
            metaEls.forEach(el => {
            articleData.text += el.innerText + " ";
            });

            articleData.text = articleData.text.trim();

            console.log(articleData);
            return articleData;
        });

    console.log(`Successfully extracted ${newStoreData.length} articles from ${url}`);
    return newStoreData;

}