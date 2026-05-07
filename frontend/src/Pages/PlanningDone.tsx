import { Navbar } from "../Components/Navabar"
import { Date } from "../Ui/Icons/Date"
import { Users } from "../Ui/Icons/Users"
import Hotel1 from "../Images/Hotel1.jpg"
import { Hotels } from "../Components/Hotels"
import { PlanDay } from "../Components/Days"
import { Footer } from "../Components/Footer"
import axios from "axios"
import { useEffect, useState } from "react"
import { VITE_BACKEND_URL } from "../BackendUrl/BackendUrl"
import { useLocation } from "react-router-dom"

export function DonePlanning() {
    const [ErrorState, SetErrorState] = useState(false);
    const [ErrorDetail] = useState("Network Error : Please Try again later");
    const [LoadingState, SetLoadingState] = useState(false);
    const [PlanData, SetPlanData]: any = useState([]);
    const Location = useLocation();

    useEffect(function()
    {
        localStorage.removeItem("UniqueId");
    },[Location]);

    useEffect(function () {
        if (ErrorState) {
            const timeout = setTimeout(function () {
                SetErrorState(false);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [ErrorState]);

    useEffect(function () {
        SetLoadingState(true);
        const TimeOut = setTimeout(function () {
            BackendCall();
        }, 2000);
        return () => clearTimeout(TimeOut);
    }, []);

    async function BackendCall() {
        const token = localStorage.getItem("token");
        const PlanUniqueId = localStorage.getItem("UniqueId");
        const payload = { PlanUniqueId: PlanUniqueId };
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        try {
            const result = await axios.post(`${VITE_BACKEND_URL}/Tripzy/Api/TravelPlan/Show/Existing`, payload, config);
            if (result.data.Data) {
                SetPlanData([result.data.Data]);
                SetLoadingState(false);
            } else {
                SetErrorState(true);
                SetLoadingState(false);
            }
        } catch (e) {
            SetErrorState(true);
            SetLoadingState(false);
        }
    }

    return <>
        <Navbar />

        {/* Error Overlay */}
        {ErrorState && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-red-500 animate-bounce">
                    <div className="font-bold text-xl text-slate-800">Error</div>
                    <div className="text-slate-600 mt-2">{ErrorDetail}</div>
                </div>
            </div>
        )}

        {!LoadingState && PlanData.length > 0
            ? PlanData.map((trips: any, index: number) => (
                <div key={index} className="px-4 md:px-[2rem] pt-4 md:pt-[2rem] animate-in fade-in duration-700">
                    <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch">
                        <div className="flex justify-start items-center flex-col w-full md:w-1/2 bg-slate-100 p-6 md:p-[2rem] rounded-md hover:shadow-lg transition-shadow">
                            <div className="text-blue-400 font-mono font-bold flex justify-start items-center w-full text-[0.9rem] tracking-widest">
                                CURATED ITINERARY
                            </div>
                            <div className="font-extrabold text-[3rem] md:text-[4rem] text-slate-900 w-full mt-[-0.5rem] md:mt-[-1rem]">
                                {trips.planName}
                            </div>
                            <div className="flex justify-start items-center gap-4 md:gap-10 w-full md:pl-[1rem] mt-2 md:mt-0">
                                <div className="flex justify-center items-center">
                                    <Date />
                                    <div className="text-[0.8rem] font-bold text-slate-500 ml-[0.5rem]">{trips.planDate}</div>
                                </div>
                                <div className="flex justify-center items-center">
                                    <Users />
                                    <div className="text-[0.8rem] font-bold text-slate-500 ml-[0.5rem]">{trips.numberOfPeople} Travelers</div>
                                </div>
                            </div>
                        </div>

                        {/* Top Price Related info bar */}
                        <div className="p-4 md:p-[2rem] w-full md:w-1/2 flex justify-center md:justify-end items-center mt-4 md:mt-[-3rem]">
                            <div className="bg-slate-900 rounded-2xl w-full max-w-[30rem] h-auto p-[1.5rem] shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-[0.8rem] font-bold text-slate-400 uppercase tracking-wider">Estimated Budget</div>
                                    <div className={`font-mono font-bold px-3 py-1 rounded-md text-[0.7rem] border ${
                                        trips.BudgetCategory?.toLowerCase().includes("luxury") 
                                        ? "border-red-600 text-red-500 bg-red-950/30" 
                                        : "border-green-600 text-green-500 bg-green-950/30"
                                    }`}>
                                        {trips.BudgetCategory || "STANDARD"}
                                    </div>
                                </div>
                                <div className="text-[2rem] md:text-[2.8rem] font-black text-white flex justify-center items-center font-sans tracking-tighter">
                                    ₹{trips.EstimatedTotalCostINR?.toLocaleString()}
                                </div>
                                <div className="flex justify-center items-center w-full mt-[1rem]">
                                    <div className="w-full h-[0.4rem] rounded-full bg-blue-400"></div>
                                    <div className="w-full h-[0.4rem] rounded-full bg-green-500 ml-[-0.2rem]"></div>
                                    <div className="w-full h-[0.4rem] rounded-full bg-red-500 ml-[-0.2rem]"></div>
                                </div>
                                <div className="flex justify-between px-2 mt-1 text-[10px] font-bold uppercase tracking-tighter text-slate-500">
                                    <span>Flights</span>
                                    <span>Stays</span>
                                    <span>Activity</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-[3rem] flex flex-col md:flex-row justify-center items-center">
                        <div className="w-full md:w-1/2 text-slate-900 text-[1.5rem] md:text-[1.8rem] font-bold text-center md:text-left">
                            Recommended Stays
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end items-end gap-4 md:pr-[2rem] text-slate-400 font-bold italic text-sm mt-2 md:mt-0">
                            Scroll to explore →
                        </div>
                    </div>

                    <div className="mt-[2rem] mb-[3rem] flex flex-row h-[500px] overflow-x-auto items-start gap-8 custom-scrollbar">
                        {trips.hotelList?.map((hotels: any, i: number) => (
                            <Hotels 
                                key={i}
                                image={Hotel1} 
                                price={hotels.PricePerNight} 
                                Location={hotels.LocationOfHotel} 
                                NameOfHotel={hotels.NameOfHotel} 
                                StarsOutOf5={hotels.HotelStars} 
                                LinkforLocation={hotels.GoogleMapsLocationLink} 
                                Type="Loaded" 
                            />
                        ))}
                    </div>

                    <div className="space-y-12 mb-10">
                        {trips.events?.map((event: any, i: number) => (
                            <PlanDay 
                                key={i}
                                DayNumber={event.Day} 
                                NameOfPlanDay={event.Nameoftheday} 
                                Date={event.DayDate} 
                                Type="Loaded" 
                                TimeStampsData={event.Events} 
                            />
                        ))}
                    </div>
                </div>
            ))
            : <div className="flex flex-col items-center justify-center h-[60vh] opacity-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400"></div>
                <div className="mt-4 font-bold text-slate-500">Loading your masterpiece...</div>
            </div>
        }
        <Footer />
    </>
}