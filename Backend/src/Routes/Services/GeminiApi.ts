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
    model: "gemini-2.5-flash",
    generationConfig: {
      maxOutputTokens: 8192,
      temperature: 0.7,
      responseMimeType: "application/json",
    }
  });

  const prompt = `
Generate a COMPLETE travel itinerary in STRICT JSON format. 

CRITICAL RULES:
1. "GoogleMapsLocationLink" MUST be a direct search URL: https://www.google.com/maps/search/?api=1&query=[Hotel+Name+Plus+Destination]
2. You MUST generate exactly ${input.numberOfDays} days.
3. Every single day MUST have at least 3 distinct events in the "events" array. DO NOT OMIT ANY DAYS OR EVENTS.
4. "Time" field MUST start with the prefix "Day X - " (e.g., "Day 1 - Morning"). This is mandatory for the parser.

REQUIRED SCHEMA:
{
  "planName": "string",
  "planDate": "string",
  "PlaceName": "${input.destination}",
  "PlanDescription": "string",
  "PlaceImage": "https://image.dummyjson.com/1200x600/2c3e50/ffffff?text=${encodeURIComponent(input.destination)}",
  "numberOfPeople": ${input.numberOfPeople},
  "BudgetCategory": "${input.budgetType}",
  "EstimatedTotalCostINR": number,
  "hotelList": [
    {
      "NameOfHotel": "string",
      "GoogleMapsLocationLink": "string",
      "LocationOfHotel": "string",
      "PricePerNight": number,
      "HotelStars": number,
      "EstimatedBudget": number,
      "HotelImage": "string"
    }
  ],
  "events": [
    {
      "Day": number,
      "Nameoftheday": "string",
      "DayDate": "YYYY-MM-DD",
      "Time": "Day X - Morning/Afternoon/Evening",
      "NameOfEvent": "string",
      "TotalTimeConsumption": number,
      "PriceType": "string",
      "EventDescription": "string"
    }
  ]
}

INPUT DATA:
Destination: ${input.destination}
People: ${input.numberOfPeople}
Budget Type: ${input.budgetType}
Number of Days: ${input.numberOfDays}
Start Date: ${input.startDate}
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