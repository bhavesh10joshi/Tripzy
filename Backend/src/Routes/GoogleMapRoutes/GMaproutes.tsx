import axios from "axios";
import { Router } from "express";
import { Middleware } from "../../Middleware/middleware";
import { SuccessStatusCodes } from "../../StatusCodes/StatusCodes";

const GMapRouter = Router();

GMapRouter.get("" , Middleware , async function(req:any , res:any)
{
    const locations = req.body.locations;

    if (!locations || locations.length < 2) {
        return res.status(400).json({ msg: "At least two locations are required" });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const origins = locations.slice(0, -1).join("|");
    const destinations = locations.slice(1).join("|");

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origins)}&destinations=${encodeURIComponent(destinations)}&mode=driving&key=${apiKey}`;

    try
    {
        const response = await axios.get(url);
        if(!response)
        {
            res.status(500).json({ msg: "No Response Recieved from Google Map !" });
            return;
        }
        res.status(SuccessStatusCodes.Success).json({ data: response.data });
        return;
    }
    catch (error: any) 
    {
        return res.status(500).json({ msg: error.message });
    }

});
export default GMapRouter;