import { Router } from "express";
import { Middleware } from "../../Middleware/middleware";
import { PlanModel } from "../../DB/db";
import { generateItineraryPDF } from "../Services/pdfService";

const PlanExportRouter = Router();

PlanExportRouter.get("/Pdf/:UniqueId", Middleware, async (req: any, res: any) => {
  try {
    const { UniqueId } = req.params;
    const UserId = req.UserId;

    const tripPlan = await PlanModel.findOne({
        UniqueId: UniqueId,
        userId: UserId
    });
    
    if (!tripPlan) {
      return res.status(404).json({ msg: "Itinerary data not found." });
    }

    const pdfBuffer = await generateItineraryPDF(tripPlan);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${tripPlan.planName.replace(/\s+/g, "_")}.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    return res.end(pdfBuffer);
  } catch (error: any) {
    console.error("PDF Export Error:", error);
    return res.status(500).json({ msg: "Failed to generate PDF." });
  }
});

export default PlanExportRouter;