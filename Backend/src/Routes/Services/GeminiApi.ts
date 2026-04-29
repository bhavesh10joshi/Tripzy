import { PlanZod } from "../../Validations/ZodValidations";
import { groupEventsByDay } from "../../Helper/Helper";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const generateItinerary = async (input: any) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
Generate a COMPLETE travel itinerary in STRICT JSON.

IMPORTANT RULES:
- Return ONLY JSON
- No markdown
- No explanation
- No trailing commas
- Use exact format below

FORMAT:
{
  "planName": "string",
  "planDate": "string",
  "numberOfPeople": number,
  "hotelList": [
    {
      "NameOfHotel": "string",
      "LocationOfHotel": "string",
      "PricePerNight": number,
      "HotelStars": number,
      "EstimatedBudget": number
    }
  ],
  "events": [
    {
      "Time": "Day X - Morning",
      "NameOfEvent": "string",
      "TotalTimeConsumption": number,
      "PriceType": "string",
      "EventDescription": "string"
    }
  ]
}

INPUT:
Destination: ${input.destination}
People: ${input.numberOfPeople}
Budget: ${input.budgetType}
Number of Days: ${input.numberOfDays}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) throw new Error("Empty Gemini response");

    const cleaned = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(cleaned);

    parsed.events = groupEventsByDay(parsed.events);

    return PlanZod.parse(parsed);

  } catch (error: any) {
    console.error("Gemini Error:", error);
    throw error;
  }
};