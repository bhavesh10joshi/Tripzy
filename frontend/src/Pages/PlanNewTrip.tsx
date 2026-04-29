import { Navbar } from "../Components/Navabar"
import { Footer } from "../Components/Footer"
import { Location } from "../Ui/Icons/location"
import { King } from "../Ui/Icons/King"
import { RichDollar } from "../Ui/Icons/RichDollar"
import { Balance } from "../Ui/Icons/Balance"
import { Magic } from "../Ui/Icons/Magic"
import { useNavigate } from "react-router-dom"
import { Backend_Url } from "../BackendUrl/BackendUrl"
import { useEffect, useState } from "react"
import { useRef } from "react"
import axios from "axios"
import { Planning } from "./Planning"

export function PlanNewTrip() {
    const [InProgress, SetInProgressState] = useState(false);
    const [ErrorState, SetErrorState] = useState(true);
    const [NoofPeople, SetNoofPeople] = useState(0);
    const [NoofDays, SetNoofDays] = useState(0);
    const [BudgetType, SetbudgetType] = useState("");
    const Navigation = useNavigate();
    const LocationRef: any = useRef(null);

    useEffect(function () {
        const timer = setTimeout(function () {
            SetErrorState(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, [ErrorState]);

    async function BackendCall() {
        const token = localStorage.getItem("token");
        const payload = {
            destination: LocationRef.current.value,
            numberOfPeople: NoofPeople,
            budgetType: BudgetType,
            numberOfDays : NoofDays
        }
        const config = {
            headers: {
                'Authorization': token ,
                'Content-Type': 'application/json'
            }
        };
        try {
            SetInProgressState(true);
            const result: any = await axios.post(`${Backend_Url}`, payload, config);
            if (result) {
                localStorage.setItem("UniqueId", result.data.UniqueId);
                SetInProgressState(false);
                Navigation("/Tripzy/User/View/NewPlan");
                return;
            } else {
                SetInProgressState(false);
                SetErrorState(true);
                return;
            }
        } catch (e) {
            SetInProgressState(false);
            SetErrorState(true);
            return;
        }
    }

    return <>
        {ErrorState && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-red-500 flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <div className="text-red-500 text-4xl mb-2">✕</div>
                    <div className="text-black font-bold text-xl">Request Failed</div>
                    <div className="text-slate-500 text-center mt-2">
                        Please check your inputs and try again.
                    </div>
                </div>
            </div>
        )}

        {!InProgress
            ?
            <div className="relative">
                <Navbar />
                <div className="mt-[3rem] ml-[15rem] mr-[15rem] mb-[7rem]">
                    <div className="pl-[3rem] pr-[3rem] pt-[2rem] pb-[2rem]">
                        <div className="text-blue-300 font-mono font-bold">The Intelligent Concierge</div>
                        <div className="mt-[1rem] text-black font-bold text-[3rem]">
                            Design Your Perfect
                        </div>
                        <div className="mt-[-1rem] text-black font-bold text-[3rem]">
                            Escape
                        </div>
                        <div className=" text-slate-500 font-mono font-bold mt-[0.5rem]">
                            Tell us your preferences and let our AI architect a bespoke
                        </div>
                        <div className=" text-slate-500 font-mono font-bold">
                            itinerary tailored precisely to your style.
                        </div>
                    </div>

                    <div className="border-slate-200 border-[1rem] rounded-md bg-slate-100 mt-[1rem] pl-[5rem] pr-[5rem] pt-[3rem] pb-[2rem] w-full ">
                        <div className="flex justify-center items-center w-full gap-52 ">
                            <div className="flex justify-center items-center flex-col">
                                <button className="bg-slate-300 text-slate-600 h-[2rem] w-[2rem] rounded-full shadow-lg shadow-slate-600/50 text-[1.2rem] font-bold">1</button>
                                <div className="flex justify-center items-center text-slate-600 font-mono font-bold mt-[0.5rem]">Destination</div>
                            </div>
                            <div className="flex justify-center items-center flex-col">
                                <button className="bg-slate-300 text-slate-600 h-[2rem] w-[2rem] rounded-full shadow-lg shadow-slate-600/50 text-[1.2rem] font-bold">2</button>
                                <div className="flex justify-center items-center text-slate-600 font-mono font-bold mt-[0.5rem]">Details</div>
                            </div>
                            <div className="flex justify-center items-center flex-col">
                                <button className="bg-slate-300 text-slate-600 h-[2rem] w-[2rem] rounded-full shadow-lg shadow-slate-600/50 text-[1.2rem] font-bold">3</button>
                                <div className="flex justify-center items-center text-slate-600 font-mono font-bold mt-[0.5rem]">Budget</div>
                            </div>
                        </div>

                        <div className="text-black text-[1.8rem] font-bold mt-[4rem]">Where are we going ?</div>
                        <div className="w-full flex justify-center items-center mt-[2rem] ">
                            <div className=" relative flex justify-center items-center">
                                <Location />
                            </div>
                            <input ref={LocationRef} type="text" aria-label="name" placeholder="Bhimtal , Uttarakhand" className="bg-white border border-slate-600 w-full h-[3rem] rounded-full ml-[-2rem] pl-[3rem]" />
                        </div>

                        <div className="w-full flex gap-60">
                            <div className="text-[1.2rem] font-mono font-bold mt-[3rem] text-slate-600 flex justify-start items-center flex-col">
                                <div>No. of people</div>
                                <div className="mt-[1rem] bg-white flex justify-center items-center p-[1rem] rounded-md border border-black ">
                                    <div className="bg-slate-200 text-slate-600 font-mono font-bold text-[1.8rem] pl-[1rem] pr-[1rem] flex justify-center items-center rounded-full shadow-lg shadow-slate-600/50">
                                        <button onClick={() => SetNoofPeople(prev => prev > 0 ? prev - 1 : 0)}>-</button>
                                    </div>
                                    <div className="text-mono font-bold text-[1.5rem] ml-[2rem] mr-[2rem]">{NoofPeople}</div>
                                    <div className="bg-slate-100 text-slate-600 font-mono font-bold text-[1.8rem] pl-[1rem] pr-[1rem] flex justify-center items-center rounded-full shadow-lg shadow-slate-600/50">
                                        <button onClick={() => SetNoofPeople(prev => prev + 1)}>+</button>
                                    </div>
                                </div>
                            </div>

                            <div className="text-[1.2rem] font-mono font-bold mt-[3rem] text-slate-600 flex justify-start items-center flex-col">
                                <div>Trip Duration</div>
                                <div className="mt-[1rem] bg-white flex justify-center items-center p-[1rem] rounded-md border border-black ">
                                    <div className="bg-slate-200 text-slate-600 font-mono font-bold text-[1.8rem] pl-[1rem] pr-[1rem] flex justify-center items-center rounded-full shadow-lg shadow-slate-600/50">
                                        <button onClick={() => SetNoofDays(prev => prev > 0 ? prev - 1 : 0)}>-</button>
                                    </div>
                                    <div className="text-mono font-bold text-[1.5rem] ml-[2rem] mr-[2rem]">{NoofDays}</div>
                                    <div className="bg-slate-100 text-slate-600 font-mono font-bold text-[1.8rem] pl-[1rem] pr-[1rem] flex justify-center items-center rounded-full shadow-lg shadow-slate-600/50">
                                        <button onClick={() => SetNoofDays(prev => prev + 1)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="font-mono text-[1.2rem] text-slate-600 flex justify-start items-center font-bold mt-[4rem]">Financial Condition</div>
                        <div className="w-full flex mt-[2rem] gap-5">
                            <div onClick={() => SetbudgetType("Cheap")} className={`w-2/6 p-[1rem] border rounded-md bg-white cursor-pointer ${BudgetType === 'Cheap' ? 'border-green-600 border-2' : 'border-slate-200'}`}>
                                <RichDollar />
                                <div className="text-black font-mono font-bold text-[1.6rem] mt-[1rem]">Cheap</div>
                                <div className="text-green-800 text-[0.9rem] font-mono font-bold">Budget-friendly experiences</div>
                            </div>
                            <div onClick={() => SetbudgetType("Moderate")} className={`w-2/6 p-[1rem] border rounded-md bg-white cursor-pointer ${BudgetType === 'Moderate' ? 'border-blue-300 border-2' : 'border-slate-200'}`}>
                                <Balance />
                                <div className="text-black font-mono font-bold text-[1.6rem] mt-[1rem]">Moderate</div>
                                <div className="text-blue-300 text-[0.9rem] font-mono font-bold">Comfort meets Value</div>
                            </div>
                            <div onClick={() => SetbudgetType("Luxury")} className={`w-2/6 p-[1rem] border rounded-md bg-white cursor-pointer ${BudgetType === 'Luxury' ? 'border-red-600 border-2' : 'border-slate-200'}`}>
                                <King />
                                <div className="text-black font-mono font-bold text-[1.6rem] mt-[1rem]">Luxury</div>
                                <div className="text-red-600 text-[0.9rem] font-mono font-bold">Premium , no-limits trip.</div>
                            </div>
                        </div>

                        <div className="w-full flex justify-center items-center">
                            <button onClick={BackendCall} className="w-full flex justify-center items-center h-[3rem] bg-blue-300 rounded-md text-white font-bold mt-[4rem] shadow-lg shadow-blue-300/50 active:scale-[0.98] transition-transform">
                                Generate Itinerary<Magic />
                            </button>
                        </div>
                        <div className="w-full flex justify-center items-center italic text-[0.8rem] font-bold mt-[0.5rem] text-slate-600 mb-[2rem]">
                            Our AI concierge will craft your trip in seconds.
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            : <Planning />
        }
    </>
}