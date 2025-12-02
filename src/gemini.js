const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

import { GoogleGenerativeAI } from "@google/generative-ai";

import { categories } from "./constData";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json",
  }
});

export async function categorizeItems(storeData) {

  // extract the essencial info of the item to pass to LLM
  const foodItems = storeData.articles.map((item, id) => {
    return { id: id, details: item.title + ". " + item.details };
  })

  const prompt = `
    You are an API that categorizes food items.
    
    Here is the list of allowed categories:
    ${JSON.stringify(categories)}

    Here are the items to categorize:
    ${JSON.stringify(foodItems)}

    Rules:
    1. Match each item to exactly one category from the list.
    2. The food items are in SWEDISH.
    3. If an item does not fit well, use the closest match or 'Non-Food'.
    4. Return a JSON Array of objects.
    5. Each object must have: "ID", "category".
  `;

  try {
    const result = await model.generateContent(prompt);
    
    // parse response
    const responseText = result.response.text();
    const structuredData = JSON.parse(responseText);

    return structuredData;

  } catch (error) {
    console.error("Error:", error);
  }

  return null;
}