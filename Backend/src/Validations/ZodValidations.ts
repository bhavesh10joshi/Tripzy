import { z } from "zod";

export const UserObject = z.object({
    email : z.string().includes("@") ,
    Password : z.string().min(10).regex(/[0-9]/)
});

export const HotelZod = z.object({
  NameOfHotel: z.string(),
  LocationOfHotel: z.string(),
  PricePerNight: z.number(),
  HotelStars: z.number().min(1).max(5),
  EstimatedBudget: z.number()
});

export const EventZod = z.object({
  Time: z.string(),
  NameOfEvent: z.string(),
  TotalTimeConsumption: z.number(),
  PriceType: z.string(),
  EventDescription: z.string()
});

export const PlanZod = z.object({
  planName: z.string(),
  planDate: z.string(),
  numberOfPeople: z.number(),
  hotelList: z.array(HotelZod).min(1),
  events: z.array(EventZod).min(1)
});