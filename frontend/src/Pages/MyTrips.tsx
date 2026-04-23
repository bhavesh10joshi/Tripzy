import { Navbar } from "../Components/Navabar"
import { Footer } from "../Components/Footer"
import { PastPlannedTrips } from "../Components/PlannedTrip"
import tower from "../Images/tower.jpg"
import { AddNew } from "../Ui/Icons/AddNew"

export function MyTrips()
{
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
                <PastPlannedTrips NameofItienary="Parisian Spring Escape" Date="April 12 - April 19 , 2024" PlanDescription="Experience the magic of the Marais , evening boat tours on the Seine , and Sunrise at Montemarte with your AI-optimized Itinerary." ImageOfthePlan={tower}/>
            </div>
            <button className="w-full">
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