import { Router } from "express";
import { Middleware } from "../../Middleware/middleware";
import { PlanModel } from "../../DB/db";
import { ServerErrors , SuccessStatusCodes } from "../../StatusCodes/StatusCodes";
import { getCache, setCache, deleteCache } from "../../Services/redisService";
const SharedPlanRouter = Router();

SharedPlanRouter.get("/Share/:PlanUniqueId" , async function(req:any , res:any)
{
    const {PlanUniqueId}= req.params;

    try
    {
        const cached = await getCache(PlanUniqueId);
        if (cached) {
            res.status(SuccessStatusCodes.Success).json({
                msg : cached
            });
            return;
        }

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

        await setCache(PlanUniqueId, result);

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
SharedPlanRouter.post("/Settings/Edit/Approval", Middleware, async function(req: any, res: any) {
    const PlanUniqueId = req.body.PlanUniqueId;
    const Decision: boolean = req.body.Decision;

    try {
        const updatedPlan = await PlanModel.findOneAndUpdate(
            { UniqueId: PlanUniqueId },
            { $set: { CanEdit: Decision } },
            { new: true }
        );

        if (!updatedPlan) {
            res.status(500).json({
                msg: "No such Itinerary Found"
            });
            return;
        }

        await deleteCache(PlanUniqueId);

        res.status(SuccessStatusCodes.Success).json({
            msg: "The changes have been set!",
            Data: updatedPlan
        });
        return;
    }
    catch (e) {
        res.status(ServerErrors.InternalServerError).json({
            msg: "Internal Server Error !"
        });
        return;
    }
});
SharedPlanRouter.post("/Change/Existing/Plan" , Middleware , async function(req:any , res:any)
{
    const WhatToChange:String = req.body.WhatToChange;
    const NewData:String = req.body.NewData;
    const PlanUniqueId:string = req.body.PlanUniqueId;
    
    switch(WhatToChange){
        case "PlanDescription":
            {
                try
                {
                    await PlanModel.updateOne(
                        { UniqueId : PlanUniqueId },
                        {
                            PlanDescription : NewData
                        }
                    ); 
                    await deleteCache(PlanUniqueId);
                    res.status(SuccessStatusCodes.Success).json({
                        msg : "Changes Made Successfully !" 
                    });
                    return;
                }
                catch(e)
                {
                    res.status(ServerErrors.InternalServerError).json({
                        msg : "Internal Server Error !"
                    });
                    return;
                }
                break;
            }
        case "planName":
            {
                try
                {
                    await PlanModel.updateOne(
                        { UniqueId : PlanUniqueId },
                        {
                            planName : NewData
                        }
                    ); 
                    await deleteCache(PlanUniqueId);
                    res.status(SuccessStatusCodes.Success).json({
                        msg : "Changes Made Successfully !" 
                    });
                    return;
                }
                catch(e)
                {
                    res.status(ServerErrors.InternalServerError).json({
                        msg : "Internal Server Error !"
                    });
                    return;
                }
                break;
            }
        case "planDate":
            {
                try
                {
                    await PlanModel.updateOne(
                        { UniqueId : PlanUniqueId },
                        {
                            planDate : NewData
                        }
                    ); 
                    await deleteCache(PlanUniqueId);
                    res.status(SuccessStatusCodes.Success).json({
                        msg : "Changes Made Successfully !" 
                    });
                    return;
                }
                catch(e)
                {
                    res.status(ServerErrors.InternalServerError).json({
                        msg : "Internal Server Error !"
                    });
                    return;
                }
                break;
            }
        case "numberOfPeople":
            {
                try
                {
                    await PlanModel.updateOne(
                        { UniqueId : PlanUniqueId },
                        {
                            numberOfPeople : NewData
                        }
                    ); 
                    await deleteCache(PlanUniqueId);
                    res.status(SuccessStatusCodes.Success).json({
                        msg : "Changes Made Successfully !" 
                    });
                    return;
                }
                catch(e)
                {
                    res.status(ServerErrors.InternalServerError).json({
                        msg : "Internal Server Error !"
                    });
                    return;
                }
                break;
            }
        case "BudgetCategory":
            {
                try
                {
                    await PlanModel.updateOne(
                        { UniqueId : PlanUniqueId },
                        {
                            BudgetCategory : NewData
                        }
                    ); 
                    await deleteCache(PlanUniqueId);
                    res.status(SuccessStatusCodes.Success).json({
                        msg : "Changes Made Successfully !" 
                    });
                    return;
                }
                catch(e)
                {
                    res.status(ServerErrors.InternalServerError).json({
                        msg : "Internal Server Error !"
                    });
                    return;
                }
                break;
            }
        case "EstimatedTotalCostINR":
            {
                try
                {
                    await PlanModel.updateOne(
                        { UniqueId : PlanUniqueId },
                        {
                            EstimatedTotalCostINR : NewData
                        }
                    ); 
                    await deleteCache(PlanUniqueId);
                    res.status(SuccessStatusCodes.Success).json({
                        msg : "Changes Made Successfully !" 
                    });
                    return;
                }
                catch(e)
                {
                    res.status(ServerErrors.InternalServerError).json({
                        msg : "Internal Server Error !"
                    });
                    return;
                }
                break;
            }
    }
});
SharedPlanRouter.post("/Change/Existing/Plan/Event", Middleware, async (req: any, res: any) => {
    try {
        const { PlanUniqueId, PlanUpdates, DayNumber, EventId, NewEventData }:any = req.body;

        if (!PlanUniqueId) {
            return res.status(ServerErrors.InternalServerError).json({ msg: "PlanUniqueId is required." });
        }

        const updatePayload: Record<string, any> = {};
        const arrayFilters: any[] = [];

        if (PlanUpdates && typeof PlanUpdates === 'object') {
            Object.keys(PlanUpdates).forEach((field) => {
                updatePayload[field] = PlanUpdates[field];
            });
        }

        if (DayNumber !== undefined && EventId && NewEventData) {
            updatePayload["events.$[day].Events.$[event]"] = NewEventData;
            arrayFilters.push({ "day.Day": DayNumber });
            arrayFilters.push({ "event._id": EventId });
        }

        if (Object.keys(updatePayload).length === 0) {
            return res.status(400).json({ msg: "No valid update fields or event data provided." });
        }

        const updateOptions: any = { new: true };
        if (arrayFilters.length > 0) {
            updateOptions.arrayFilters = arrayFilters;
        }

        const updatedPlan = await PlanModel.findOneAndUpdate(
            { UniqueId: PlanUniqueId },
            { $set: updatePayload },
            updateOptions
        );

        if (!updatedPlan) {
            return res.status(404).json({ msg: "Plan not found." });
        }

        await deleteCache(PlanUniqueId);

        return res.status(SuccessStatusCodes.Success).json({
            msg: "Changes Made Successfully !",
            updatedPlan
        });

    } catch (e) {
        console.error(e);
        return res.status(ServerErrors.InternalServerError).json({
            msg: "Internal Server Error !"
        });
    }
});
export default SharedPlanRouter;
