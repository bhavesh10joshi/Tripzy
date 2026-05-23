import { z } from "zod";

export const UserObject = z.object({
  email: z.string().includes("@"),
  Password: z.string().min(2)
});

export const WeatherZod = z.object({
  Day: z.enum(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]),
  Temperature: z.string(),
  WeatherInfo: z.string()
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
  PlaceName: z.string(),        
  ContinentName: z.enum(["NorthAmerica", "Asia", "Europe", "SouthAmerica", "Australia", "Africa"]),
  PlanDescription: z.string(),
  PlaceImage: z.string(),
  planName: z.string(),
  planDate: z.string(),
  numberOfPeople: z.number(),
  BudgetCategory: z.string(),
  EstimatedTotalCostINR: z.number(),
  hotelList: z.array(HotelZod),
  events: z.array(DayEventZod),
  WeatherForecast: z.array(WeatherZod)
});