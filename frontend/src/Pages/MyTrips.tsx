import { Navbar } from "../Components/Navabar"
import { Footer } from "../Components/Footer"
import { PastPlannedTrips } from "../Components/PlannedTrip"
import tower from "../Images/tower.jpg"
import { AddNew } from "../Ui/Icons/AddNew"
import axios from "axios"
import { Backend_Url } from "../BackendUrl/BackendUrl"
import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"

export function MyTrips() {
    const Navigation = useNavigate();
    const [MyTripsData, SetMyTripsData] = useState([]);
    const [LoadingState, SetLoadingState] = useState(false);
    const [ErrorState, SetErrorState] = useState(false);
    const [ErrorDetail, SetErrorDetail] = useState("Network Error : Please try again later !");

    const BackendCall = useCallback(async () => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        try {
            const result = await axios.get(`${Backend_Url}/Tripzy/Api/TravelPlan/Existing/Show/All`, config);
            if (result && result.data) {
                SetMyTripsData(result.data.Data);
            } else {
                SetErrorState(true);
            }
        } catch (e) {
            SetErrorState(true);
        } finally {
            SetLoadingState(false);
        }
    }, []);

    useEffect(() => {
        SetLoadingState(true);
        BackendCall();
    }, [BackendCall]);

    useEffect(() => {
        if (ErrorState) {
            const timeout = setTimeout(() => SetErrorState(false), 4000);
            return () => clearTimeout(timeout);
        }
    }, [ErrorState]);

    function Move(UniqueId: any) {
        localStorage.setItem("UniqueId", UniqueId);
        Navigation("/Tripzy/User/View/Plan");
    }

    return (
        <>
            {ErrorState && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white p-10 rounded-3xl shadow-2xl border border-red-50 flex flex-col items-center max-w-md text-center transform animate-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 text-3xl font-bold animate-bounce">!</div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Request Failed</h2>
                        <p className="text-slate-500 mb-8 leading-relaxed">{ErrorDetail}</p>
                        <button 
                            onClick={() => SetErrorState(false)}
                            className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-200"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}

            <Navbar />
            
            <div className="pb-[5rem] pt-[8rem] px-[5rem] max-w-[1400px] mx-auto min-h-screen">
                <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="font-black text-[3.5rem] text-slate-900 leading-tight">My Planned Trips</h1>
                    <p className="text-slate-500 text-lg max-w-2xl mt-4 font-medium">Manage itineraries, adjust dates, or explore AI-powered suggestions.</p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {!LoadingState ? (
                        <>
                            {MyTripsData.length >= 1 ? (
                                <div className="space-y-6">
                                    {MyTripsData.map((trips: any, index: number) => (
                                        <div key={index} className="transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] animate-in fade-in slide-in-from-bottom-2">
                                            <PastPlannedTrips 
                                                OnClick={() => Move(trips.UniqueId)} 
                                                NameofItienary={trips.planName} 
                                                Date={trips.planDate} 
                                                PlanDescription={trips.PlanDescription} 
                                                ImageOfthePlan={tower} 
                                                UniqueId={trips.UniqueId}
                                                Type="Loaded"
                                                SetLoadingfunction={SetLoadingState}
                                                SetErrorStateFunction={SetErrorState}
                                                RefreshData={BackendCall}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-1000">
                                    <div className="text-slate-200 text-9xl mb-6 font-black opacity-40">EMPTY</div>
                                    <p className="text-slate-400 text-xl font-medium italic">No adventures found yet.</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="space-y-6">
                            <PastPlannedTrips Type="Loading" />
                            <PastPlannedTrips Type="Loading" />
                        </div>
                    )}
                </div>

                <button className="w-full group mt-12" onClick={() => Navigation("/Tripzy/User/Plan/NewTrip")}>
                    <div className="w-full h-[18rem] bg-blue-50/50 rounded-[2.5rem] border-2 border-dashed border-blue-200 flex flex-col justify-center items-center transition-all duration-500 group-hover:bg-blue-600 group-hover:border-transparent group-hover:shadow-2xl group-hover:shadow-blue-200">
                        <div className="mb-6 transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                            <AddNew />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 group-hover:text-white transition-colors duration-300">Plan a New Journey</h3>
                    </div>
                </button>
            </div>
            <Footer />
        </>
    );
}