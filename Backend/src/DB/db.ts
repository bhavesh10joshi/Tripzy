import mongoose from "mongoose";
import { Schema, model } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

interface HotelLists {
    NameOfHotel: string;
    LocationOfHotel: string;
    PricePerNight: number;
    HotelStars: number;
    EstimatedBudget: number;
}

interface EventCards {
    Time: string;
    NameOfEvent: string;
    TotalTimeConsumption: number;
    PriceType: string;
    EventDescription: string;
}

const HotelSchema = new Schema<HotelLists>({
    NameOfHotel: { type: String, required: true },
    LocationOfHotel: { type: String, required: true },
    PricePerNight: { type: Number, required: true },
    HotelStars: { type: Number, required: true },
    EstimatedBudget: { type: Number, required: true }
});

const EventSchema = new Schema<EventCards>({
    Time: { type: String, required: true },
    NameOfEvent: { type: String, required: true },
    TotalTimeConsumption: { type: Number, required: true },
    PriceType: { type: String, required: true },
    EventDescription: { type: String, required: true }
});

const user = new Schema({
    email : {type : String , required : true , unique : true} , 
    nameofUser : {type : String , required : true} , 
    password : {type : String , required : true}
});

const plan = new Schema({
    userId : {type : ObjectId , required:true , unique : true} , 
    planName : {type : String , required : true } , 
    planDate : {type : String , required : true} ,
    numberOfPeople : {type : Number, required : true}, 
    hotelList: [HotelSchema],
    events: [EventSchema] ,
    UniqueId : {type : String , required:true}  
});

export const UserModel = model("User" , user);
export const PlanModel = model("Plan" , plan);



