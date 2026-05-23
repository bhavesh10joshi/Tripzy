import mongoose, { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const WeatherSchema = new Schema({
  Day : {type : String , required : true} , 
  Temperature : {type : String , required : true} , 
  WeatherInfo : {type : String , required : true}
});

const PlaceSchema = new Schema({
  PlaceName : {type : String} , 
  PlaceVisits : {type : Number , default : 0}
});

const ContinentSchema = new Schema({
  NorthAmerica : {type : Number , default : 0} ,
  Asia : {type : Number , default : 0} ,
  Europe : {type : Number , default : 0} , 
  SouthAmerica : {type : Number , default : 0} ,
  Australia : {type : Number , default : 0} ,
  Africa : {type : Number , default : 0} ,
});

const HotelSchema = new Schema({
  NameOfHotel: { type: String, required: true },
  GoogleMapsLocationLink : {type : String , required:true},
  LocationOfHotel: { type: String, required: true },
  PricePerNight: { type: Number, required: true },
  HotelStars: { type: Number, required: true },
  EstimatedBudget: { type: Number, required: true },
  HotelImage: { type: String, required: true } 
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
  Nameoftheday: { type: String, required: true },
  DayDate: { type: String, required: true }, 
  Events: [EventSchema]
});

const user = new Schema({
  email: { type: String, required: true, unique: false },
  nameofUser: { type: String, required: true },
  password: { type: String, required: true }
});

const plan = new Schema({
  userId: { type: ObjectId, required: true }, 
  UsersName : {type : String , required : true},
  PlaceName: { type: String, required: true },
  ContinentName : {type:String , required : true},
  PlanDescription: { type: String, required: true },
  PlaceImage: { type: String, required: true }, 
  planName: { type: String, required: true },
  planDate: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  BudgetCategory: { type: String, required: true },
  EstimatedTotalCostINR: { type: Number, required: true },
  hotelList: [HotelSchema],
  events: [DayEventSchema],
  UniqueId: { type: String, required: true } , 
  CanEdit : {type : Boolean , default : false} , 
  WeatherForecast : [WeatherSchema]
});

const UserAnalytics = new Schema({
  userId : {type : ObjectId , required : true} , 
  TotaltripsPlanned : {type : Number , required : true , default : 0} , 
  MostVisitedPlace : [PlaceSchema] , 
  ContinentVists : [ContinentSchema]
});

export const UserModel = model("User", user);
export const PlanModel = model("Plan", plan);
export const UserAnalyticsModel = model("UserAnalytics" , UserAnalytics);