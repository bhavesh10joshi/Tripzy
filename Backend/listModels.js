const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // The SDK doesn't natively expose listModels directly easily in older versions, 
  // but we can just use fetch.
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
  const data = await response.json();
  
  if (data.models) {
    const generateModels = data.models
      .filter(m => m.supportedGenerationMethods.includes("generateContent"))
      .map(m => m.name.replace('models/', ''));
    console.log("Available generateContent models:", generateModels);
  } else {
    console.log("Error fetching models:", data);
  }
}

listModels();
