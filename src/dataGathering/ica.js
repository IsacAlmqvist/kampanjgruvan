// import { fetchWithScrapingBee } from "./scrapingClient";

// export async function scrapeIca(store){

//     const url = "https://www.ica.se/erbjudanden/" + store.url;

//     // scraping
//     let doc;
//     try {
//         doc = await fetchWithScrapingBee(url)  
//     } catch (error) {
//         console.error('Error extracting offers:', error);
//         return [];
//     }

//     // data processing
//     const offersContainer = doc.querySelector('div.offers__container');  
//     if (!offersContainer) return [];

//     const articles = offersContainer.querySelectorAll('article');

//     const articlesData = Array.from(articles).slice(0,100).map((article) => {

//         const parts = [];
//         article.querySelectorAll("*").forEach(el => {
//             if (el.children.length === 0) {
//                 const t = el.innerText?.trim();
//                 if (t) parts.push(t);
//             }
//         });

//         const mainImage = article.querySelector('.offer-card__image-inner');
//         if (mainImage && mainImage.src) {
//             parts.push(mainImage.src);
//             if (mainImage.alt) {
//                 parts.push(mainImage.alt);
//             }
//         }

//         return parts;
//     });
//     console.log(`Successfully extracted ${articlesData.length} articles from ${url}`);

//     const newStoreData = [];

//     articlesData.forEach((array, index) => {

//         const article = {
//             id: index,
//             text: ""       
//         }

//         article.title = array[0];
//         article.descripton = array[1];
        
//         for (const element of array) {
//             if (!isNaN(parseInt(element.charAt(0)))) {
//                 article.price = element;
//                 break;
//             }
//             article.text += element;
//         }
//         article.mainImgSrc = array[array.length-2];
//         article.mainImgAlt = array[array.length-1];
//         newStoreData.push(article);
//     });

//     return newStoreData;

// }