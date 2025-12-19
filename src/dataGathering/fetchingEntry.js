import { category_keywords } from "../constData";
// import { getHemkopOffers } from "./hemkop";
// import { scrapeIca } from "./ica";
// import { getIcaOffers } from "./icaNew";
// import { getWillysOffers } from "./willys";
// import { scrapeCoop } from "./coop";

const API_BASE =
  import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://iprog-proxy-2vj79tn2k-isacs-projects-a57141f1.vercel.app";

export async function fetchOffers(store) {
    try {
        if(store.name.includes("ICA")){
            // return await scrapeIca(store);
            return normalizeIca(await getOffers("ica", store.id));
        } else if(store.name.includes("Coop")) {
            return normalizeCoop(await getOffers("coop", store.id));
        } else if(store.name.includes("Willys")) {
            return normalizeWillys(await getOffers("willys", store.id));
        } else if(store.name.includes("Hemköp")) {
            return normalizeHemkop(await getOffers("hemkop", store.id));
        } else {
            return [];
        }
    } catch(err) {
        console.log("Error scraping from " + store.name + err);
        return [];
    }
}

// calls our vercel API with the corresponding endpoint
export async function getOffers(store, storeId) {
  const params = new URLSearchParams({
    store,
    storeId
  });

  const res = await fetch(`${API_BASE}/api/offers?${params}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${store} offers`);
  }

  return await res.json();
}

function normalizeIca(arr) {
  return arr
    .map(o => {
      if (!o.id || !o.details?.name || !o.picture?.url) return null;
      return {
        id: o.id,
        title: o.details.name,
        description: o.details.mechanicInfo || o.description || "",
        category: normalizeCategory({
          category: o.category?.expandedArticleGroupName,
          title: o.details.name,
        }),
        brand: o.details.brand,
        amount: o.details.packageInformation,
        price: o.parsedMechanics?.value2
          ? `${o.parsedMechanics.value1} ${o.parsedMechanics.value2} kr`
          : null,
        comparePrice: o.comparisonPrice || null,
        image: o.picture.url,
        requirements: [
          o.details.requiresLoyaltyCard ? "Stammis" : null
        ].filter(Boolean)
      };
    })
    .filter(Boolean); // remove null entries
}

function normalizeCoop(arr) {
  return arr
    .map(o => {
      if (!o.id || !o.content?.title || !o.content?.imageUrl) return null;
      return {
        id: o.id,
        title: o.content.title,
        description: o.content.description || "",
        category: normalizeCategory({
          category: o.categoryTeam?.name,
          title: o.content.title
        }),
        brand: o.content.brand,
        amount: o.content.amountInformation,
        price: o.priceInformation?.discountValue
          ? `${o.priceInformation.discountValue}:-`
          : null,
        comparePrice: o.content.formattedComparativePriceText || null,
        image: normalizeCoopImage(o.content.imageUrl),
        requirements: [
          o.priceInformation?.isMemberPrice ? "Medlemspris" : null
        ].filter(Boolean)
      };
    })
    .filter(Boolean);
}

function normalizeWillys(arr) {
  return arr
    .map(o => {
      const promo = o.potentialPromotions?.[0];
      if (!promo?.code && !o.name) return null;
      return {
        id: promo?.code || o.id,
        title: promo?.name || o.name || "",
        description: promo?.description || "",
        category: normalizeCategory({
          category: "",
          title: promo?.name || o.name || ""
        }),
        brand: o.manufacturer,
        amount: o.displayVolume,
        price: promo?.rewardLabel || o.price || null,
        comparePrice: promo?.comparePrice || null,
        image: o.image?.url || null,
        requirements: [
          promo?.redeemLimit ? `Max ${promo.redeemLimit} köp` : null,
          promo?.campaignType === "LOYALTY" ? "Stammis" : null
        ].filter(Boolean)
      };
    })
    .filter(Boolean);
}

function normalizeHemkop(arr) {
  return arr
    .map(o => {
      const promo = o.potentialPromotions?.[0];
      if (!promo?.code && !o.name) return null;
      return {
        id: promo?.code || o.id,
        title: promo?.name || o.name || "",
        description: promo?.description || "",
        category: normalizeCategory({
          category: o.googleAnalyticsCategory?.split("|")[0],
          title: promo?.name || o.name || ""
        }),
        brand: o.manufacturer,
        amount: o.displayVolume,
        price: promo?.rewardLabel || null,
        comparePrice: promo?.comparePrice || null,
        image: o.image?.url || null,
        requirements: [
          promo?.qualifyingCount ? `${promo.qualifyingCount} st` : null
        ].filter(Boolean)
      };
    })
    .filter(Boolean);
}

function normalizeCoopImage(url) {

  let image = null;

  if (url) {
    const cleanUrl = url.startsWith("//")
      ? "https:" + url
      : url;

    image = cleanUrl.replace(
      "/image/upload/",
      "/image/upload/f_auto,q_auto,w_300,c_fill/"
    );
  }
  return image;
}

// with help of ChatGPT, promt: "help me fit all the categories into a set of 10 categories"
function normalizeCategory({ category, title }) {
  const text = `${category || ""} ${title || ""}`.toLowerCase();

  for (const [canonical, keywords] of Object.entries(category_keywords)) {
    if (keywords.some(k => text.includes(k))) {
      return canonical;
    }
  }

  return "Övrigt";
}