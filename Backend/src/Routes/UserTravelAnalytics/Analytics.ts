import { Router } from "express";
import { ServerErrors, SuccessStatusCodes } from "../../StatusCodes/StatusCodes";
import { UserAnalyticsModel, PlanModel } from "../../DB/db";
import { Middleware } from "../../Middleware/middleware";

const UserPlanAnalyticsRouter = Router();

UserPlanAnalyticsRouter.get("/Show", Middleware, async function (req: any, res: any) {
    const UserId = req.UserId;

    try {
        const result = await UserAnalyticsModel.findOne({
            userId: UserId
        });

        const plans = await PlanModel.find({ userId: UserId });
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthlyVisits = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0
        };

        for (const plan of plans) {
            if (plan.planDate) {
                let monthIndex = -1;
                if (plan.planDate.includes("-")) {
                    const parts = plan.planDate.split("-");
                    if (parts.length >= 2) {
                        monthIndex = parseInt(parts[1] || "") - 1;
                    }
                } else {
                    const date = new Date(plan.planDate as string);
                    if (!isNaN(date.getTime())) {
                        monthIndex = date.getMonth();
                    }
                }
                if (monthIndex >= 0 && monthIndex < 12) {
                    const monthName = monthNames[monthIndex] as keyof typeof monthlyVisits;
                    monthlyVisits[monthName]++;
                }
            }
        }

        if (result) {
            res.status(SuccessStatusCodes.Success).json({
                Data: {
                    ...result.toObject(),
                    MonthlyVisits: monthlyVisits
                }
            });
            return;
        } else {
            res.status(SuccessStatusCodes.Success).json({
                Data: {
                    TotaltripsPlanned: 0,
                    MostVisitedPlace: [],
                    ContinentVists: [{}],
                    MonthlyVisits: monthlyVisits
                }
            });
            return;
        }
    } catch (e) {
        res.status(ServerErrors.InternalServerError).json({
            msg: "Internal Server Error Occurred !"
        });
        return;
    }
});

export default UserPlanAnalyticsRouter;