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
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

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

// Connect to MongoDB globally for serverless environments
mongoose.connect(MongoDB_URL).then(() => {
    console.log("Successfully connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

// Start the server only if not running in a Vercel serverless environment
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server successfully listening on port ${PORT}`);
    });
}

export default app;
