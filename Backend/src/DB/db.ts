import mongoose, { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const HotelSchema = new Schema({
  NameOfHotel: { type: String, required: true },
  LocationOfHotel: { type: String, required: true },
  PricePerNight: { type: Number, required: true },
  HotelStars: { type: Number, required: true },
  EstimatedBudget: { type: Number, required: true }
});

const EventSchema = new Schema({
  Time: { type: String, required: true },
  NameOfEvent: { type: String, required: true },
  TotalTimeConsumption: { type: Number, required: true },
  PriceType: { type: String, required: true },
  EventDescription: { type: String, required: true }
});

const DayEventSchema = new Schema({
  Day: { type: Number, required: true },
  Events: [EventSchema]
});

const user = new Schema({
  email: { type: String, required: true, unique: true },
  nameofUser: { type: String, required: true },
  password: { type: String, required: true }
});

const plan = new Schema({
  userId: { type: ObjectId, required: true }, 
  planName: { type: String, required: true },
  planDate: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  hotelList: [HotelSchema],
  events: [DayEventSchema], // ✅ updated
  UniqueId: { type: String, required: true }
});

export const UserModel = model("User", user);
export const PlanModel = model("Plan", plan);