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
5. The "PlaceName" MUST match exactly: "${input.destination.trim()}" across the object.
6. Deduce the standard global continent name based on the destination and fill "ContinentName". It MUST be one of these exact values: "NorthAmerica", "Asia", "Europe", "SouthAmerica", "Australia", "Africa".
7. Generate an exact 7-day weather trend forecast array in "WeatherForecast" representing standard conditions for the location during the start date month.
8. You MUST generate between 5 to 10 distinct hotel recommendations in the "hotelList" array, covering a comprehensive price range spanning budget, mid-range, premium, and luxury choices tailored around the destination.

REQUIRED SCHEMA:
{
  "PlaceName": "${input.destination.trim()}",
  "ContinentName": "string",
  "PlanDescription": "string",
  "PlaceImage": "https://image.dummyjson.com/1200x600/2c3e50/ffffff?text=${encodeURIComponent(input.destination)}",
  "planName": "string",
  "planDate": "string",
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
  ],
  "WeatherForecast": [
    {
      "Day": "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday",
      "Temperature": "XX° / XX°",
      "WeatherInfo": "ClearSunny" | "Clouds" | "Drizzle" | "Rain" | "ThunderStorm" | "Snow" | "Fog"
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

export const refineItinerary = async (existingPlan: any, refinementPrompt: string) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      maxOutputTokens: 8192,
      temperature: 0.7,
      responseMimeType: "application/json",
    }
  });

  const flatEvents = existingPlan.events.flatMap((dayEvent: any) => 
    dayEvent.Events.map((e: any) => ({
      Day: dayEvent.Day,
      Nameoftheday: dayEvent.Nameoftheday,
      DayDate: dayEvent.DayDate,
      Time: e.Time,
      NameOfEvent: e.NameOfEvent,
      TotalTimeConsumption: e.TotalTimeConsumption,
      PriceType: e.PriceType,
      EventDescription: e.EventDescription
    }))
  );

  const flatPlan = {
    ...existingPlan,
    events: flatEvents
  };

  const prompt = `
You are an expert travel assistant. Modify the provided travel itinerary plan based STRICTLY on the Refinement Instructions.

CRITICAL RULES FOR MODIFICATION:
1. Preserve the structure and update only what is requested by the instructions.
2. "GoogleMapsLocationLink" MUST remain or be a direct search URL: https://www.google.com/maps/search/?api=1&query=[Hotel+Name+Plus+Destination]
3. Every single day MUST still maintain at least 3 distinct events in the "events" array.
4. "Time" field MUST start with the prefix "Day X - " (e.g., "Day 1 - Morning").
5. The "PlaceName" and "ContinentName" MUST remain consistent with the original data unless explicitly asked to change locations.
6. Retain, adapt or keep the "WeatherForecast" array structure matches the schema exactly.
7. You MUST ensure the updated or returned plan maintains between 5 to 10 distinct hotel options in the "hotelList" covering various matching baseline budgets.

EXISTING PLAN (JSON):
${JSON.stringify(flatPlan, null, 2)}

REFINEMENT INSTRUCTIONS:
${refinementPrompt}

REQUIRED OUTPUT SCHEMA:
{
  "PlaceName": "string",
  "ContinentName": "string",
  "PlanDescription": "string",
  "PlaceImage": "string",
  "planName": "string",
  "planDate": "string",
  "numberOfPeople": number,
  "BudgetCategory": "string",
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
  ],
  "WeatherForecast": [
    {
      "Day": "string",
      "Temperature": "string",
      "WeatherInfo": "string"
    }
  ]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) throw new Error("Empty Gemini response during refinement");

    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    parsed.events = groupEventsByDay(parsed.events);

    return PlanZod.parse(parsed);
  } catch (error: any) {
    console.error("Gemini Refinement Error:", error);
    throw error;
  }
};