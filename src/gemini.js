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
  const foodItems = storeData.map(item => {
    return { id: item.id, details: item.title + ". " + item.details };
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
    5. Each object must have: "id", "category".
  `;

  try {
    const result = await model.generateContent(prompt);
    
    // parse response
    const responseText = result.response.text();
    const categorized = JSON.parse(responseText);
 
    const finalData = storeData.map(article => {
      const match = categorized.find(c => c.id === article.id);
      return { ...article, category: match?.category ?? "Unknown" };
    });

    console.log(finalData);
    return finalData;

  } catch (error) {
    console.error("Error:", error);
  }

  return null;
}