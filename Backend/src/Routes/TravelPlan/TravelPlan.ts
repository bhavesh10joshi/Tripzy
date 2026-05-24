import { PlanModel , UserAnalyticsModel, UserModel} from "../../DB/db";
import { ServerErrors , ClientErrorStatusCodes , SuccessStatusCodes} from "../../StatusCodes/StatusCodes";
import { Middleware } from "../../Middleware/middleware";
import { generateItinerary } from "../Services/GeminiApi";
import { retry } from "../Services/retry";
import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { refineItinerary } from "../Services/GeminiApi";

const PlanRouter = Router();

PlanRouter.post("/New", Middleware, async function(req: any, res: any) {
    const UserId: any = req.UserId;

    try {
        const UserDetails = await UserModel.findOne({
            _id : UserId  
        });

        if(UserDetails)
        {
            const PlanData = await retry(() => generateItinerary(req.body), 3);
            const done = await PlanModel.create({
                UsersName : UserDetails.nameofUser , 
                userId: UserId,
                ...PlanData, 
                UniqueId: uuidv4()
            });

            if (done) 
            {
                try
                {
                    let analyticsDoc: any = await UserAnalyticsModel.findOne({ userId: UserId });
                    
                    if (!analyticsDoc) {
                        await UserAnalyticsModel.create({
                            userId: UserId,
                            TotaltripsPlanned: 1,
                            MostVisitedPlace: [{ PlaceName: PlanData.PlaceName, PlaceVisits: 1 }],
                            ContinentVists: [{ [PlanData.ContinentName]: 1 }]
                        });
                    } 
                    else 
                    {
                        const continentField = `ContinentVists.0.${PlanData.ContinentName}`;
                        const placeIndex = analyticsDoc.MostVisitedPlace.findIndex(
                            (p: any) => p.PlaceName.toLowerCase() === PlanData.PlaceName.toLowerCase()
                        );

                        if (placeIndex !== -1) {
                            analyticsDoc.TotaltripsPlanned += 1;
                            analyticsDoc.MostVisitedPlace[placeIndex].PlaceVisits += 1;
                            
                            if (analyticsDoc.ContinentVists && analyticsDoc.ContinentVists[0]) {
                                const currentCount = analyticsDoc.ContinentVists[0][PlanData.ContinentName] || 0;
                                analyticsDoc.ContinentVists[0][PlanData.ContinentName] = currentCount + 1;
                            }

                            analyticsDoc.MostVisitedPlace.sort((a: any, b: any) => b.PlaceVisits - a.PlaceVisits);
                            analyticsDoc.markModified('ContinentVists');
                            analyticsDoc.markModified('MostVisitedPlace');
                            await analyticsDoc.save();
                        } else {
                            await UserAnalyticsModel.updateOne(
                                { userId: UserId },
                                {
                                    $inc: { 
                                        TotaltripsPlanned: 1,
                                        [continentField]: 1
                                    },
                                    $push: {
                                        MostVisitedPlace: {
                                            $each: [{ PlaceName: PlanData.PlaceName, PlaceVisits: 1 }],
                                            $sort: { PlaceVisits: -1 }
                                        }
                                    }
                                }
                            );
                        }
                    }
                } 
                catch (analyticsError) 
                {
                    console.error(analyticsError);
                }

                res.status(SuccessStatusCodes.ResourceCreated).json({
                    UniqueId: done.UniqueId
                });
                return;
            } 
            else 
            {
                res.status(ServerErrors.InternalServerError).json({
                    msg: "Internal Server Error Occurred !"
                });
                return;
            }
        } 
        else
        {
            res.status(ServerErrors.InternalServerError).json({
                msg: "Internal Server Error Occurred !"
            });
            return;
        }
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg: "Internal Server Error Occurred !"
        });
        return;
    }
});
PlanRouter.post("/RefinePlan", Middleware, async function(req: any, res: any) {
    const UserId: any = req.UserId;
    const PlanUniqueId = req.body.PlanUniqueId;
    const RefinePrompt = req.body.RefinePrompt;

    try {
        const result = await PlanModel.findOne({ UniqueId: PlanUniqueId });
        if (result) {
            try {
                const PlanData = await retry(() => refineItinerary(result, RefinePrompt), 3);
                
                const ChangesDone = await PlanModel.findOneAndUpdate(
                    { UniqueId: PlanUniqueId },
                    {
                        $set: {
                            userId: UserId,
                            PlaceName: PlanData.PlaceName,
                            ContinentName: PlanData.ContinentName,
                            PlanDescription: PlanData.PlanDescription,
                            PlaceImage: PlanData.PlaceImage,
                            planName: PlanData.planName,
                            planDate: PlanData.planDate,
                            numberOfPeople: PlanData.numberOfPeople,
                            BudgetCategory: PlanData.BudgetCategory,
                            EstimatedTotalCostINR: PlanData.EstimatedTotalCostINR,
                            hotelList: PlanData.hotelList,
                            events: PlanData.events,
                            WeatherForecast: PlanData.WeatherForecast
                        }
                    },
                    { new: true }
                );

                if (!ChangesDone) {
                    res.status(ServerErrors.InternalServerError).json({
                        msg: "Internal Server Error Occurred During Update!"
                    });
                    return;
                }

                res.status(SuccessStatusCodes.Success).json({
                    Data: ChangesDone
                });
                return;
            } catch (e) {
                res.status(ServerErrors.InternalServerError).json({
                    msg: "Internal Server Error Occurred during itinerary generation"
                });
                return;
            }
        } else {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg: "No such Itinerary Found"
            });
            return;
        }
    } catch (e) {
        res.status(ServerErrors.InternalServerError).json({
            msg: "Internal Server Error Occurred"
        });
        return;
    }
});
PlanRouter.post("/Show/Existing" , Middleware , async function(req:any , res:any)
{
    const UserId = req.UserId;
    const PlanUniqueId = req.body.PlanUniqueId;
    
    try{
        const Data = await PlanModel.findOne({
            userId : UserId , 
            UniqueId : PlanUniqueId
        });
        res.status(SuccessStatusCodes.Success).json({
            Data : Data
        });
        return;
    }
    catch(e)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "Resource Was not found !"
        });
        return;
    }
});
PlanRouter.get("/Existing/Show/All" , Middleware , async function(req:any , res:any)
{
    const UserId = req.UserId;

    try{
        const PlanData = await PlanModel.find({
            userId : UserId
        });
        res.status(SuccessStatusCodes.Success).json({
            Data : PlanData
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
PlanRouter.post("/Delete/Plan" , Middleware , async function(req:any,res:any)
{
    const PlanUniqueId = req.body.PlanUniqueId;
    
    try{
        await PlanModel.deleteOne({
            UniqueId : PlanUniqueId
        });
        res.status(SuccessStatusCodes.Success).json({
            msg : "Plan Deleted Successfully !"
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Encountered !"
        });
        return;
    }
});
PlanRouter.get("/View/Plan" , Middleware , async function(req:any ,res:any)
{
    const PlanUniqueId = req.body.PlanUniqueId;

    try{
        const result = await PlanModel.findOne({
            UniqueId : PlanUniqueId
        });
        if(result)
        {
            res.status(SuccessStatusCodes.Success).json({
                msg : result
            });
            return;
        }
        else
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error !"
            });
            return ;
        }
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Encountered !"
        });
        return;
    }
});
export default PlanRouter;