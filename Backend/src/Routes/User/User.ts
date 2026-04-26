import {z} from "zod";
import bcrypt from "bcrypt";
import { UserModel } from "../../DB/db";
import jwt from "jsonwebtoken";
import {Router} from "express";
import { ServerErrors , ClientErrorStatusCodes , SuccessStatusCodes } from "../../StatusCodes/StatusCodes";
import { UserObject } from "../../Validations/ZodValidations";

const UserRouter = Router();

type SignUpInput = z.infer<typeof UserObject>;

// Endpoint for Signing up into the application 
UserRouter.post("/SignUp", async function(req:any , res:any)
{
    const name:any = req.body.name;
    const zodsafeObject:any = UserObject.safeParse(req.body);

    if(!zodsafeObject)
    { 
        res.status(ServerErrors.InternalServerError).json({
            msg : "validations Failed/Wrong !"
        });
        return ;
    }

    const SignUp : SignUpInput = zodsafeObject.data;

    try{
        const HashedPassword = await bcrypt.hash(SignUp.Password,5);
        
        if(HashedPassword)
        {
            try
            {
                await UserModel.create({
                    nameofUser : name , 
                    email : SignUp.email , 
                    password : HashedPassword 
                });

                res.status(SuccessStatusCodes.ResourceCreated).json({
                    msg : "Signed Up Successfully !"
                });
                return;
            }
            catch(e)
            {
                console.log(e);
                res.status(ServerErrors.InternalServerError).json({
                    msg : "Internal Server Error Occured !"
                });
                return;
            }
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
            msg : "Internal Server Error Occured !"
        });
        return;
    }
});

//API endpoint for Signing In into the application 
UserRouter.post("/Login" , async function(req : any , res : any)
{
    const email : string = req.body.email;
    const password : string = req.body.password;

    try{
        const FindUser = await UserModel.findOne({
            email : email
        }); 
        if(FindUser)
        {
            try{
                const Check = await bcrypt.compare(password , FindUser.password);
                if(Check)
                {
                    const token = jwt.sign({
                        id : FindUser._id
                    }, process.env.JWT_SECRET as string);
                    res.status(SuccessStatusCodes.Success).json({
                        token : token
                    });
                    return;
                }
                else
                {
                    res.status(ClientErrorStatusCodes.Unathorized).json({
                        msg : "Incorrect Password !"
                    });
                    return;
                }
            }
            catch(e)
            {
                console.log(e);
                res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                    msg : "Account Dosen't Exists !"
                });
                return ;
            }
        }
        else
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "Account Dosen't Exists !"
            });
            return ;
        }
    }
    catch(e)
    {
        console.log(e);
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "Account Dosen't Exists !"
        });
        return ;
    }
});
export default UserRouter;