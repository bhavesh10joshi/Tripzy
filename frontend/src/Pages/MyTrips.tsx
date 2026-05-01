import { Navbar } from "../Components/Navabar"
import { Footer } from "../Components/Footer"
import { PastPlannedTrips } from "../Components/PlannedTrip"
import tower from "../Images/tower.jpg"
import { AddNew } from "../Ui/Icons/AddNew"
import axios from "axios"
import { Backend_Url } from "../BackendUrl/BackendUrl"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function MyTrips()
{
    const Navigation = useNavigate();
    const [MyTripsData , SetMyTripsData] = useState({});
    const [LoadingState , SetLoadingState] = useState(false);
    const [PlanUniueId , SetPlanUniqueId] = useState("");
    // useEffect(function()
    // {
    //         const TimeOut = setTimeout(()=>BackendCall() , 2000);
    //         return clearTimeout(TimeOut);
    // })
    // This function has to be made to put inside the PastPlannedTrips Components
    function Move(UniqueId:any)
    {
        localStorage.setItem("PlanUniqueId" , PlanUniueId);
        Navigation("");
        return;
    }
    async function BackendCall()
    {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': token ,
                'Content-Type': 'application/json'
            }
        };
        try
        {
            SetLoadingState(true);
            const result = await axios.get(`${Backend_Url}` , config);
            if(result)
            {
                SetMyTripsData(result.data);
                SetLoadingState(false);
                return;
            }
            else
            {
                SetLoadingState(false);
                return;
            }
        }   
        catch(e)
        {
            SetLoadingState(false);
            return;
        }
    }

    return<>
        <Navbar/>
        <div className="pb-[2rem] pt-[5rem] pl-[3rem] pr-[3rem]">
            <div className="font-bold text-[3rem]">
                My Planned Trips
            </div>
            <div className="font-light w-[52rem]">
                Your curated collection of future adventures . Manage itineraries , adjust dates , or explore AI-powered suggestions for the next destination. 
            </div>
            <div className="pt-[2rem] pb-[2rem]">
                {
                !LoadingState
                    ?<div>
                        <PastPlannedTrips NameofItienary="Parisian Spring Escape" Date="April 12 - April 19 , 2024" PlanDescription="Experience the magic of the Marais , evening boat tours on the Seine , and Sunrise at Montemarte with your AI-optimized Itinerary." ImageOfthePlan={tower} Type="Loaded"/>
                    </div>
                    :<div>
                        <PastPlannedTrips Type="Loading"/>
                    </div>
                }   
            </div>
            <button className="w-full" onClick={() => Navigation("/Tripzy/User/Plan/NewTrip")}>
                <div className="w-full h-[15rem] bg-blue-200  rounded-md border-[0.2rem] border-dotted border-blue-300 mt-[4rem] flex justify-center items-center flex-col">
                    <div className="flex justify-center items-center">
                        <AddNew/>
                    </div>
                    <div className=" text-[1.7rem] flex justify-center items-center text-slate-800 font-bold">Plan a New Jouney</div>
                    <div className="text-slate-700 flex justify-center items-center text-center w-[30rem]">
                        Let Our Inteligent Concierge craft your next perfect travel experiences in seconds. 
                    </div>
                </div>
            </button>
        </div>
        <Footer/>
    </>
}