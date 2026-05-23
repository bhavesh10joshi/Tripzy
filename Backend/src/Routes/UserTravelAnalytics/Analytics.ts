import { Router } from "express";
import { ServerErrors , SuccessStatusCodes } from "../../StatusCodes/StatusCodes";
import { UserAnalyticsModel } from "../../DB/db";
import { Middleware } from "../../Middleware/middleware";

const UserPlanAnalyticsRouter = Router();

UserPlanAnalyticsRouter.post("/get" , Middleware , async function(req:any , res:any)
{
    const UserId = req.UserId;

    try{
        const result = UserAnalyticsModel.findOne({
            userId : UserId 
        });
        res.status(SuccessStatusCodes.Success).json({
            msg : result
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
        return;
    }
});

export default UserPlanAnalyticsRouter;