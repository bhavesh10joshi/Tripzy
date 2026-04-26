import jwt from "jsonwebtoken";
import { ClientErrorStatusCodes } from "../StatusCodes/StatusCodes";

export function Middleware(req:any,res:any,next:any)
{
    const token:string = req.headers["authorization"];
    const check:any = jwt.verify(token , process.env.JWT_SECRET as string);
    
    if(check)
    {
        req.UserId = check.id;
        next();
    }
    else
    {
        res.status(ClientErrorStatusCodes.Unathorized).json({
            msg : "Incorrect Token Recieved !"
        });
        return ;
    }
}
