import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv";
import path from "path";
import PlanRouter from "./Routes/TravelPlan/TravelPlan";
import UserRouter from "./Routes/User/User";
const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

const app = express();
app.use(express.json());
app.use(cors());

const MongoDB_URL:any = process.env.MongoDB_URL as string;

if (!MongoDB_URL) {
  throw new Error("Cloudinary environment variables are missing from .env!");
}

app.use("/Tripzy/Api/User" , UserRouter)
app.use("/Tripzy/Api/TravelPlan" , PlanRouter);


main();

async function main()
{
    try{
        await mongoose.connect(MongoDB_URL);
        app.listen(8000 , function()
        {
            console.log("Successfully listening on port 8000");
        });
    }
    catch(e)
    {
        console.log("Error Occured while listening !");
        return;
    }
}



