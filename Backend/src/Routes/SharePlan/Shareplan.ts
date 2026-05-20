import { Router } from "express";
import { Middleware } from "../../Middleware/middleware";
import { PlanModel } from "../../DB/db";
import { ServerErrors , SuccessStatusCodes } from "../../StatusCodes/StatusCodes";
const SharedPlanRouter = Router();

SharedPlanRouter.get("/Share/:PlanUniqueId" , Middleware , async function(req:any , res:any)
{
    const {PlanUniqueId}= req.params;

    try
    {
        const result = await PlanModel.findOne({
            UniqueId : PlanUniqueId
        });
        if(!result)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Occurred !"
            });
            return;
        }
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
})

export default SharedPlanRouter;
