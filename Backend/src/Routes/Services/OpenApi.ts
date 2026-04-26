import OpenAI from "openai";
import { PlanZod } from "../../Validations/ZodValidations";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string
});

export const generateItinerary = async (input: any) => {

  const prompt = `
You are a travel planner AI.

Generate a COMPLETE travel itinerary in STRICT JSON format.

Rules:
- Return ONLY JSON (no text, no explanation)
- All numbers must be numbers (not strings)
- Time format: "HH:MM AM/PM"
- PriceType must be: "Free", "Paid", or "$$"
- No missing fields
- No trailing commas

Output format:
{
  "planName": "",
  "planDate": "",
  "numberOfPeople": number,
  "hotelList": [
    {
      "NameOfHotel": "",
      "LocationOfHotel": "",
      "PricePerNight": number,
      "HotelStars": number,
      "EstimatedBudget": number
    }
  ],
  "events": [
    {
      "Time": "",
      "NameOfEvent": "",
      "TotalTimeConsumption": number,
      "PriceType": "",
      "EventDescription": ""
    }
  ]
}

User Input:
Destination: ${input.destination}
People: ${input.numberOfPeople}
Budget: ${input.budgetType}
Dates: ${input.startDate} to ${input.endDate}
`;

  const response:any = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: "You ONLY return valid JSON. No explanation."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });

  const text = response.choices[0].message.content;

  if (!text) {
    throw new Error("Empty AI response");
  }

  const cleaned = text.replace(/```json|```/g, "").trim();

  const parsed = JSON.parse(cleaned);

  return PlanZod.parse(parsed);
};