import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
import path from "path";
import PlanRouter from "./Routes/TravelPlan/TravelPlan";
import UserRouter from "./Routes/User/User";
import UserPlanAnalyticsRouter from "./Routes/UserTravelAnalytics/Analytics";
import SharedPlanRouter from "./Routes/SharePlan/Shareplan";
import PlanExportRouter from "./Routes/ExportPlan/ExportPlan";

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
app.use("/Tripzy/Api/Plan/Analytics" , UserPlanAnalyticsRouter);
app.use("/Tripzy/Api/plan" , SharedPlanRouter);
app.use("/Tripzy/Export/Plan" , PlanExportRouter);

app.get("/api/health", (req, res) => {
    res.status(200).send("OK");
});

main();

async function main()
{
    try{
        await mongoose.connect(MongoDB_URL);
        app.listen(8000 , function () {
            console.log("Server successfully listening on port 8000");
        });
        return;
    }
    catch(e)
    {
        console.log("Error Occured while listening !", e);
        return;
    }
}

export default app;


