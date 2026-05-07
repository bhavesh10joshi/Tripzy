import { Button } from "../Ui/Buttons/Button"
import { Arrow } from "../Ui/Icons/Arrow"
import baali from "../Images/baali.jpg"
import jodhpur from "../Images/jodhpur.jpg"
import { Calender } from "../Ui/Icons/Calender"
import { useNavigate } from "react-router-dom"
import { Backend_Url } from "../BackendUrl/BackendUrl"
import axios from "axios"
import { useEffect, useState } from "react"
import { AddNew } from "../Ui/Icons/AddNew"

export function RecentTrips() {
    const [LoadingState, SetLoadingState] = useState(false);
    const [ErrorState, SetErrorState] = useState(false);
    const [ErrorDetail, SetErrorDetail] = useState("Network Error : Please Check Your Connection !");
    const [TripsData, SetTripsData] = useState([]);
    const [FirstTrip, ...OtherTrips]: any = TripsData;
    const Navigation = useNavigate();

    useEffect(function () {
        if (ErrorState) {
            const timeout = setTimeout(function () {
                SetErrorState(false);
            }, 4000);
            return () => clearTimeout(timeout);
        }
    }, [ErrorState]);

    function SetBackend(UniqueId: string) {
        localStorage.setItem("UniqueId", UniqueId);
        Navigation("/Tripzy/User/View/Plan");
    }

    useEffect(function () {
        SetLoadingState(true);
        const settimeout = setTimeout(() => BackendCall(), 2000);
        return () => clearTimeout(settimeout);
    }, []);

    async function BackendCall() {
        const token = localStorage.getItem("token");
        const config: any = {
            headers: {
                Authorization: token
            }
        };
        try {
            const result: any = await axios.get(`${Backend_Url}/Tripzy/Api/TravelPlan/Existing/Show/All`, config);
            if (result && result.data) {
                SetTripsData(result.data.Data);
                SetLoadingState(false);
            } else {
                SetLoadingState(false);
                SetErrorState(true);
                SetErrorDetail("Failed to fetch data");
            }
        } catch (e: any) {
            SetLoadingState(false);
            SetErrorState(true);
            SetErrorDetail(e.message || "An unexpected error occurred");
        }
    }

    const buttonStyle = "transition-all duration-300 transform hover:scale-[1.02] active:scale-95 hover:shadow-xl group";

    return (
        <>
            {ErrorState && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/30 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl border border-red-100 flex flex-col items-center max-w-sm text-center">
                        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4 text-2xl">✕</div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h2>
                        <p className="text-slate-600 mb-6">{ErrorDetail}</p>
                        <button 
                            onClick={() => SetErrorState(false)}
                            className="px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}

            {!LoadingState && !ErrorState ? (
                TripsData.length >= 1 ? (
                    <div className="mt-[8rem] pl-[7rem] pr-[7rem] w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex w-full mb-8">
                            <div>
                                <div className="text-black font-semibold text-[1.7rem]">Recent Trips</div>
                                <div className="text-slate-700">Continue Planning your upcoming trips</div>
                            </div>
                            <div className="flex-1 flex justify-end items-center">
                                <Button text="View all Activity" color="white" textColor="blue" size="secondry" BackIcon={<Arrow />}  OnClick={() => Navigation("/Tripzy/User/MyTrips/View/All")}/>
                            </div>
                        </div>

                        <div className="flex gap-8 pb-[2rem]">
                            {FirstTrip && (
                                <button className={`${buttonStyle} text-left flex-shrink-0`} onClick={() => SetBackend(FirstTrip.UniqueId)}>
                                    <div className="shadow-lg shadow-slate-900/20 rounded-2xl overflow-hidden bg-white">
                                        <div className="relative overflow-hidden">
                                            <img src={baali} alt="trip" className="rounded-t-lg transition-transform duration-500 group-hover:scale-110 w-full" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="p-8">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Calender />
                                                <span className="font-mono font-bold text-slate-500">{FirstTrip.planDate}</span>
                                            </div>
                                            <div className="text-[1.5rem] font-bold text-slate-800 uppercase tracking-tight">
                                                {FirstTrip.planName}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            )}

                            <div className="flex-1 flex flex-col gap-6">
                                {OtherTrips.slice(0, 2).map((trips: any) => (
                                    <button key={trips.UniqueId} className={`${buttonStyle} flex items-center bg-white p-4 rounded-2xl shadow-md`} onClick={() => SetBackend(trips.UniqueId)}>
                                        <img src={jodhpur} alt="trip" className="w-[6rem] h-[6rem] rounded-xl object-cover" />
                                        <div className="ml-6">
                                            <div className="text-sm font-mono text-blue-500 font-bold mb-1">{trips.planDate}</div>
                                            <div className="text-lg font-bold text-slate-700">{trips.planName}</div>
                                        </div>
                                    </button>
                                ))}
                                
                                <button 
                                    className="mt-4 w-full py-4 rounded-xl bg-blue-50 border-2 border-dashed border-blue-200 text-blue-600 font-bold hover:bg-blue-600 hover:text-white hover:border-transparent transition-all duration-300"
                                    onClick={() => Navigation("/Tripzy/User/MyTrips/View/All")}
                                >
                                    See All Activity
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-[8rem] pl-[7rem] pr-[7rem] w-full animate-in zoom-in-95 duration-500">
                        <div className="mb-8">
                            <div className="text-black font-semibold text-[1.7rem]">No Recent Trips</div>
                            <div className="text-slate-700">Start your journey by planning your first trip</div>
                        </div>
                        <button 
                            className="w-full group"
                            onClick={() => Navigation("/Tripzy/User/Plan/NewTrip")}
                        >
                            <div className="bg-blue-50 rounded-2xl border-2 border-dashed border-blue-300 w-full h-[12rem] flex flex-col justify-center items-center transition-all duration-300 group-hover:bg-blue-100 group-hover:border-blue-400">
                                <div className="p-4 bg-white rounded-full shadow-md mb-4 group-hover:scale-110 transition-transform">
                                    <AddNew />
                                </div>
                                <span className="text-blue-600 font-bold text-lg">Plan New Trip</span>
                            </div>
                        </button>
                    </div>
                )
            ) : (
                <div className="mt-[8rem] pl-[4rem] pr-[4rem] w-full">
                    <div className="w-full bg-slate-50 p-12 rounded-3xl animate-pulse">
                        <div className="flex justify-between mb-12">
                            <div>
                                <div className="h-8 w-48 bg-slate-200 rounded-lg mb-4" />
                                <div className="h-4 w-64 bg-slate-200 rounded-lg" />
                            </div>
                            <div className="h-12 w-32 bg-slate-200 rounded-full" />
                        </div>
                        <div className="flex gap-8">
                            <div className="h-[20rem] w-[25rem] bg-slate-200 rounded-2xl" />
                            <div className="flex-1 flex flex-col gap-4">
                                <div className="h-24 bg-slate-200 rounded-2xl" />
                                <div className="h-24 bg-slate-200 rounded-2xl" />
                                <div className="h-12 bg-slate-200 rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}