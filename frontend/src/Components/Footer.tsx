import { useNavigate } from "react-router-dom"

export function Footer()
{
    const Navigation = useNavigate();
    return<>
        <div className="mt-[8rem] bg-slate-200 h-auto md:h-[10rem] w-full pl-[2rem] pr-[2rem] pt-[3rem] pb-[2rem] flex flex-col md:flex-row gap-4 md:gap-0">
            <div className="flex flex-col justify-start">
                <div className="text-blue-300 font-semibold text-[1.7rem]">
                    TripzyAI
                </div>
                <div className="text-slate-500 text-[0.8rem] font-semibold">
                    © 2026 TRIPZY AI . THE INTELLIGENT CONCIERGE
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-end items-center mt-6 md:mt-0 gap-4 md:gap-0">
                <button onClick={() => Navigation("/Tripzy/User/Plan/NewTrip")} className="flex justify-center items-center text-slate-700 font-semibold hover:text-blue-300">New Trip</button>
                <button onClick={() => Navigation("/Tripzy/User/MyTrips/View/All")} className=" ml-0 md:ml-[3rem] flex justify-center items-center text-slate-700 font-semibold hover:text-blue-300">My Trips</button>
                <button onClick={() => { localStorage.clear(); Navigation("/"); }} className=" ml-0 md:ml-[3rem] flex justify-center items-center text-slate-700 font-semibold hover:text-blue-300">LogOut</button>
            </div>
        </div>
    </>
}