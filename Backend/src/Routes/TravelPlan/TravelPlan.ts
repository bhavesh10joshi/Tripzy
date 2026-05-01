import { PlanModel} from "../../DB/db";
import { ServerErrors , ClientErrorStatusCodes , SuccessStatusCodes} from "../../StatusCodes/StatusCodes";
import { Middleware } from "../../Middleware/middleware";
import { generateItinerary } from "../Services/GeminiApi";
import { retry } from "../Services/retry";
import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const PlanRouter = Router();

PlanRouter.post("/New" , Middleware , async function(req:any , res:any)
{
    const UserId:any = req.UserId;
    
    try{
        const PlanData = await retry(()=>generateItinerary(req.body) , 3);
        const done = await PlanModel.create({
            userId : UserId ,
            ...PlanData , 
            UniqueId : uuidv4()
        });
        if(done)
        {
            res.status(SuccessStatusCodes.ResourceCreated).json({
                UniqueId : done.UniqueId
            });
            return;
        }
        else
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Occurred !"
            });
            return;
        }
    }   
    catch(e)
    {
        console.log(e);
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
        return;
    }
});
PlanRouter.get("/Show/Existing" , Middleware , async function(req:any , res:any)
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
})
export default PlanRouter;