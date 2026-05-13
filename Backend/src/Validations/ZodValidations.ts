



import { z } from "zod";

export const UserObject = z.object({
  email: z.string().includes("@"),
  Password: z.string().min(2)
});

export const HotelZod = z.object({
  NameOfHotel: z.string(),
  LocationOfHotel: z.string(),
  PricePerNight: z.number(),
  HotelStars: z.number(),
  EstimatedBudget: z.number(),
  HotelImage: z.string(),
  GoogleMapsLocationLink: z.string(),
});

export const EventZod = z.object({
  Time: z.string(),
  NameOfEvent: z.string(),
  TotalTimeConsumption: z.number(),
  PriceType: z.string(),
  EventDescription: z.string()
});

export const DayEventZod = z.object({
  Day: z.number(),
  Nameoftheday: z.string(),
  DayDate: z.string(),
  Events: z.array(EventZod)
});

export const PlanZod = z.object({
  planName: z.string(),
  planDate: z.string(),
  PlaceImage: z.string(),
  numberOfPeople: z.number(),
  BudgetCategory: z.string(),
  EstimatedTotalCostINR: z.number(),
  hotelList: z.array(HotelZod),
  events: z.array(DayEventZod),
  PlaceName: z.string(),        
  PlanDescription: z.string(),
});