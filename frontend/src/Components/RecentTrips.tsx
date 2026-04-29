import { Button } from "../Ui/Buttons/Button"
import { Arrow } from "../Ui/Icons/Arrow"
import baali from "../Images/baali.jpg"
import jodhpur from "../Images/jodhpur.jpg"
import { Calender } from "../Ui/Icons/Calender"
import Russia from "../Images/Russia.jpg"
import { useNavigate } from "react-router-dom"
import { Backend_Url } from "../BackendUrl/BackendUrl"
import axios from "axios"
import { useEffect, useState } from "react"

export function RecentTrips()
{
    const[LoadingState ,  SetLoadingState] = useState(false);
    const[ErrorState , SetErrorState] = useState(false);
    const[ErrorDetail , SetErrorDetail] = useState("");
    const[TripsData , SetTripsData] = useState({});
    // useEffect(function(){
    //     BackendCall();
    // });
    function BackendCall()
    {
        const token = localStorage.getItem("token");
        const payload:any = {
            token : token
        } 
        try{
            SetLoadingState(true);
            const result:any = axios.get(`${Backend_Url}/Tripzy/Api/TravelPlan/Existing/Show/All` , payload); 
            if(result)
            {
                SetTripsData(result.data);
            }
            else
            {
                SetLoadingState(false);
                SetErrorState(true);
                SetErrorDetail(result.error);
                return;
            }
        }
        catch(e)
        {
            const error:any = e;
            SetLoadingState(false);
            SetErrorState(true);
            SetErrorDetail(error);
            return;
        }
    }
    const Navigation = useNavigate();
    return<>
        {
        !LoadingState
        ?<div className="mt-[8rem] pl-[7rem] pr-[7rem] w-full">
            <div className="flex w-full">
                <div>
                    <div className="text-black font-semibold text-[1.7rem]">Recent Trips</div>
                    <div className="text-slate-700 font-[0.9rem] ">Continue Planning your upcoming trips</div>
                </div>
                <div className="flex-1 ">
                    <div className="w-full flex justify-end items-center">
                        <Button text="View all Activity" color="white" textColor="blue" size="secondry" BackIcon={<Arrow/>}/>
                    </div>
                </div>
            </div>
            <div className="flex  mt-[3rem] pb-[2rem]">
                <button aria-label="name" className="hover:animate-[bounce_1.5s_ease-in-out_infinite]">
                    <div className=" shadow-lg shadow-slate-900/50">
                        <div>
                            <img src={baali} alt="baalibeachesimage" className="rounded-t-lg"/>
                        </div>
                        <div className=" pt-[2rem] pr-[2rem] pl-[2rem] pb-[2rem]">
                            <div className="flex">
                                <div>
                                    <Calender/>
                                </div>
                                <div className="font-mono font-bold text-slate-600 ml-[1rem]">
                                    oct 12 - oct 24 , 2024
                                </div>
                            </div>
                            <div className="mt-[1rem] text-[1.4rem] font-semibold text-slate-800 flex justify-start">
                                Baali Beaches
                            </div>
                        </div>
                    </div>
                </button>
                <div className="pl-[2rem] pt-[2rem] flex-1 flex-col">
                    <button aria-label="name" className="flex hover:animate-bounce">
                        <div>
                            <img src={jodhpur} alt="Jodhpurimage" className="w-[7rem] h-[7rem] rounded-md"/>
                        </div>
                        <div className="ml-[2rem] flex justify-center items-center flex-col">
                            <div className="text-[1rem] text-slate-500 font-mono">
                                Nov 28 - Nov 30
                            </div>
                            <div className="text-[1.3rem] font-semibold text-slate-700">
                                Jodhpur , India
                            </div>
                        </div>
                    </button>
                    <button aria-label="name" className="flex mt-[2rem] hover:animate-bounce">
                        <div>
                            <img src={Russia} alt="Jodhpurimage" className="w-[7rem] h-[7rem] rounded-md"/>
                        </div>
                        <div className="ml-[2rem] flex justify-center items-center flex-col">
                            <div className="text-[1rem] text-slate-500 font-mono">
                                Nov 28 - Nov 30
                            </div>
                            <div className="text-[1.3rem] font-semibold text-slate-700">
                                Moscow , Russia
                            </div>
                        </div>
                    </button>
                    <button aria-label="name" className="mt-[3rem] rounded-md bg-blue-200 border border-blue-300 h-[2rem] w-full hover:animate-bounce" onClick={() => function(){Navigation("/Tripzy/User/MyTrips/View/All");}}>
                        <div className="flex justify-center items-center text-[1rem] font-mono font-semibold text-blue-300 h-full w-full">
                            See All
                        </div>
                    </button>
                </div>
            </div>
        </div>
        :<div className="mt-[8rem] pl-[4rem] pr-[4rem] w-full rounded-md">
            <div className="w-full bg-slate-300 pl-[4rem] pr-[4rem] pt-[2rem] pb-[2rem] rounded-md">
            <div className="flex w-full">
                <div className="animate-pulse">
                    <div className="text-black font-semibold text-[1.7rem] bg-slate-200 w-[15rem] h-[6rem]"></div>
                    <div className="text-slate-700 font-[0.9rem] w-[25rem] h-[2rem] bg-slate-200 mt-[1rem] rounded-md"></div>
                </div>
                <div className="flex-1 ">
                    <div className="w-full flex justify-end items-center animate-pulse">
                        <button aria-label="name" className="w-[10rem] h-[4rem] bg-slate-200 rounded-md"></button>
                    </div>
                </div>
            </div>
            <div className="flex  mt-[3rem] pb-[2rem] bg-slate-200 animate-pulse">
                <button aria-label="name" className=" pl-[2rem] pt-[2rem] rounded-md">
                    <div className="shadow-lg bg-slate-500">
                        <div className="w-[12rem] h-[10rem] ">
                        </div>
                        <div className=" pt-[2rem] pr-[2rem] pl-[2rem] pb-[2rem]">
                            <div className="flex">
                                <div>
                                </div>
                                <div className="font-mono font-bold text-slate-600 ml-[1rem]">
                                </div>
                            </div>
                            <div className="mt-[1rem] text-[1.4rem] font-semibold text-slate-800 flex justify-start">
                            </div>
                        </div>
                    </div>
                </button>
                <div className="pl-[2rem] pt-[2rem] flex-1 flex-col pr-[2rem]">
                    <button aria-label="name" className="flex hover:animate-bounce">
                        <div>
                        </div>
                        <div className="ml-[2rem] flex justify-center items-center flex-col">
                            <div className="text-[1rem] text-slate-500 font-mono">
                            </div>
                            <div className="text-[1.3rem] font-semibold text-slate-700">
                            </div>
                        </div>
                    </button>
                    <button aria-label="name" className="flex mt-[2rem] hover:animate-bounce">
                        <div className="ml-[2rem] flex justify-center items-center flex-col">
                            <div className="text-[1rem] text-slate-500 font-mono">
                            </div>
                            <div className="text-[1.3rem] font-semibold text-slate-700">
                            </div>
                        </div>
                    </button>
                    <button aria-label="name" className="mt-[3rem] rounded-md bg-slate-400 animate-pulse border  h-[2rem] w-full" onClick={() => function(){Navigation("/Tripzy/User/MyTrips/View/All");}}>
                    </button>
                </div>
            </div>
            </div>
        </div>
        }
    </>
}