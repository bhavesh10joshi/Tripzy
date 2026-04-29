import { Navbar } from "../Components/Navabar"
import { Date } from "../Ui/Icons/Date"
import { Users } from "../Ui/Icons/Users"
import { Left } from "../Ui/Icons/Left"
import { Right } from "../Ui/Icons/Right"
import Hotel1 from "../Images/Hotel1.jpg"
import { Hotels } from "../Components/Hotels"
import { PlanDay } from "../Components/Days"
import { Footer } from "../Components/Footer"
import axios from "axios"
import { useEffect, useState } from "react"
import { Backend_Url } from "../BackendUrl/BackendUrl"

export function DonePlanning()
{  
    const [LoadingState , SetLoadingState] = useState(false);
    const [PlanData , SetPlanData] = useState({});
    useEffect(
        function()
        {
            const TimeOut = setTimeout(function()
            {
                BackendCall();
            },1000);
            return clearTimeout(TimeOut);
        }
    )
    async function BackendCall()
    {
        const token = localStorage.getItem("token");
        const PlanUniqueId = localStorage.getItem("UniqueId");
        const config = {
            headers: {
                'Authorization': token ,
                'Content-Type': 'application/json'
            },
            params : {
                PlanUniqueId : PlanUniqueId
            }
        };
        try{
            SetLoadingState(true);
            const result = await axios.get(`${Backend_Url}` , config);
            if(result)
            {
                SetPlanData(result.data);
                SetLoadingState(false)
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
    {
    !LoadingState 
        ?<div className="pl-[2rem] pr-[2rem] pt-[2rem]">
            <div className="flex justify-center items-center">
                <div className="flex justify-start items-center flex-col w-2/4 bg-slate-100 p-[2rem] rounded-md">
                    <div className="text-blue-300 font-mono font-bold flex justify-start items-center w-full text-[0.9rem]">
                        CURATED ITINERARY
                    </div>
                    <div className="font-bold text-[4rem] w-full mt-[-1rem]">
                        Tokyo & Kyoto
                    </div>
                    <div className="flex justify-start items-center gap-10 w-full pl-[1rem]">
                        <div className="flex justify-center items-center">
                            <div>
                                <Date/>
                            </div>
                            <div className="text-[0.8rem] font-bold text-slate-600 flex justify-center items-center ml-[0.5rem]">
                                Oct 14 - Oct 22 , 2024
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div>
                                <Users/>
                            </div>
                            <div className="text-[0.8rem] font-bold text-slate-600 flex justify-center items-center ml-[0.5rem]">
                                2 Travelers
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-[2rem] w-2/4 flex justify-end items-center mt-[-3rem]">
                    <div className="bg-slate-100 rounded-md w-[30rem] h-[10rem] p-[1rem]">
                        <div className="flex justify-center items-center gap-5">
                            <div className=" text-[0.9rem] font-bold text-slate-500">Estimated Budget</div>
                            <div className="border-red-600 text-red-600 bg-red-100 border font-mono font-bold pl-[1rem] pr-[1rem] rounded-md text-[0.7rem]">
                                LUXURY TRIP
                            </div>
                        </div>
                        <div className="text-[2.6rem] font-bold flex justify-center items-center font-sans">
                            $4850.00
                        </div>
                        <div className="flex justify-center items-center w-full mt-[1rem]">
                            <div className="w-full h-[0.5rem] rounded-full bg-blue-300"></div>
                            <div className="w-full h-[0.5rem] rounded-full bg-green-600 ml-[-0.5rem]"></div>
                            <div className="w-full h-[0.5rem] rounded-full bg-red-600 ml-[-0.5rem]"></div>
                        </div>
                        <div className="flex justify-center items-center gap-20">
                            <div className="font-semibold text-blue-300">
                                Flights
                            </div>
                            <div className="font-semibold text-green-600">
                                Stays
                            </div>
                            <div className="font-semibold text-red-600">
                                Fun
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[3rem] flex justify-center items-center">
                <div className="w-2/4 text-slate-800 text-[1.5rem] font-semibold">
                    Recommended Stays
                </div>
                <div className="w-2/4 flex justify-end items-end gap-2 pr-[2rem]">
                    <button aria-label="name" className=" bg-slate-200 p-[0.7rem] rounded-full flex justify-center items-center"><Left/></button>
                    <button aria-label="name" className=" bg-slate-200 p-[0.7rem] rounded-full flex justify-center items-center"><Right/></button>
                </div>
            </div>
            <div className="mt-[2rem] mb-[3rem] flex flex-row h-[500px] overflow-x-auto items-start gap-4 custom-scrollbar">
                <Hotels image={Hotel1} price={123} Location={"Haldwani"} NameOfHotel={"Taj Hotel"} StarsOutOf5={3.5} Type="Loaded"/>
                <Hotels image={Hotel1} price={123} Location={"Haldwani"} NameOfHotel={"Taj Hotel"} StarsOutOf5={3.5} Type="Loaded"/>
                <Hotels image={Hotel1} price={123} Location={"Haldwani"} NameOfHotel={"Taj Hotel"} StarsOutOf5={3.5} Type="Loaded"/>
                <Hotels image={Hotel1} price={123} Location={"Haldwani"} NameOfHotel={"Taj Hotel"} StarsOutOf5={3.5} Type="Loaded"/>
                <Hotels image={Hotel1} price={123} Location={"Haldwani"} NameOfHotel={"Taj Hotel"} StarsOutOf5={3.5} Type="Loaded"/>
            </div>
            <div>
                <PlanDay DayNumber={1} NameOfPlanDay="Arrival & Electric Evenings" Date="Monday , October 14" Type="Loaded"/> 
            </div>
        </div>
        :<div className="pl-[2rem] pr-[2rem] pt-[2rem]">
            <div className="flex justify-center items-center">
                <div className="flex justify-start items-center flex-col w-2/4 bg-slate-100 p-[2rem] rounded-md">
                    <div className="text-blue-300 font-mono font-bold flex justify-start items-center w-full text-[0.9rem]">
                        CURATED ITINERARY
                    </div>
                    <div className="w-full mt-[2rem] mb-[2rem]">
                        <div className="mt-[-1rem] animate-pulse bg-slate-500 w-[20rem] h-[7rem] rounded-md">
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-10 w-full pl-[1rem]">
                        <div className="flex justify-center items-center">
                            <div>
                                <Date/>
                            </div>
                            <div className="animate-pulse bg-slate-500 w-[10rem] h-[2rem] rounded-md flex justify-center items-center ml-[0.5rem]">
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div>
                                <Users/>
                            </div>
                            <div className="animate-pulse bg-slate-500 w-[10rem] h-[2rem] rounded-md flex justify-center items-center ml-[0.5rem]">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-[2rem] w-2/4 flex justify-end items-center mt-[-3rem]">
                    <div className="bg-slate-100 rounded-md w-[30rem] h-[10rem] p-[1rem]">
                        <div className="flex justify-center items-center gap-5">
                            <div className=" text-[0.9rem] font-bold text-slate-500">Estimated Budget</div>
                            <div className="animate-pulse bg-slate-500 w-[10rem] h-[2rem] border font-mono font-bold pl-[1rem] pr-[1rem] rounded-md text-[0.7rem]">
                            </div>
                        </div>
                        <div className="animate-pulse bg-slate-500 w-[10rem] h-[2rem] rounded-md flex justify-center items-center">
                        </div>
                        <div className="flex justify-center items-center w-full mt-[1rem]">
                            <div className="w-full h-[0.5rem] rounded-full bg-blue-300"></div>
                            <div className="w-full h-[0.5rem] rounded-full bg-green-600 ml-[-0.5rem]"></div>
                            <div className="w-full h-[0.5rem] rounded-full bg-red-600 ml-[-0.5rem]"></div>
                        </div>
                        <div className="flex justify-center items-center gap-20">
                            <div className="font-semibold text-blue-300">
                                Flights
                            </div>
                            <div className="font-semibold text-green-600">
                                Stays
                            </div>
                            <div className="font-semibold text-red-600">
                                Fun
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[3rem] flex justify-center items-center">
                <div className="w-2/4 text-slate-800 text-[1.5rem] font-semibold">
                    Recommended Stays
                </div>
                <div className="w-2/4 flex justify-end items-end gap-2 pr-[2rem]">
                    <button aria-label="name" className=" bg-slate-200 p-[0.7rem] rounded-full flex justify-center items-center"><Left/></button>
                    <button aria-label="name" className=" bg-slate-200 p-[0.7rem] rounded-full flex justify-center items-center"><Right/></button>
                </div>
            </div>
            <div className="mt-[2rem] mb-[3rem] flex flex-row h-[500px] overflow-x-auto items-start gap-4 custom-scrollbar">
                <Hotels Type="Loading"/>
                <Hotels Type="Loading"/>
                <Hotels Type="Loading"/>
                <Hotels Type="Loading"/>
                <Hotels Type="Loading"/>
                <Hotels Type="Loading"/>
                <Hotels Type="Loading"/>
            </div>
            <div>
                <PlanDay Type="Loading"/> 
                <PlanDay Type="Loading"/> 
                <PlanDay Type="Loading"/> 
                <PlanDay Type="Loading"/> 
                <PlanDay Type="Loading"/> 
            </div>
        </div>
        }
        <Footer/>
    </>
}