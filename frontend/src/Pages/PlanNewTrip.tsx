import { Navbar } from "../Components/Navabar"
import { Footer } from "../Components/Footer"
import { Location } from "../Ui/Icons/location"
import { King } from "../Ui/Icons/King"
import { RichDollar } from "../Ui/Icons/RichDollar"
import { Balance } from "../Ui/Icons/Balance"
import { Magic } from "../Ui/Icons/Magic"
import { useNavigate } from "react-router-dom"
import { Backend_Url } from "../BackendUrl/BackendUrl"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { Planning } from "./Planning"

export function PlanNewTrip() {
    const [InProgress, SetInProgressState] = useState(false);
    const [ErrorState, SetErrorState] = useState(false);
    const [NoofPeople, SetNoofPeople] = useState(0);
    const [NoofDays, SetNoofDays] = useState(0);
    const [BudgetType, SetbudgetType] = useState("");

    // this was added so that the person can get a buffer of  days so he can travel from his current place to the adventure place
    const today = new Date();
    today.setDate(today.getDate() + 5); 
    const bufferDate = today.toISOString().split('T')[0];
    
    const Navigation = useNavigate();
    const LocationRef: any = useRef(null);
    const step1Ref:any = useRef<HTMLDivElement>(null);
    const step2Ref:any = useRef<HTMLDivElement>(null);
    const step3Ref:any = useRef<HTMLDivElement>(null);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    useEffect(function () {
        if (InProgress) {
            const timeout = setTimeout(function () {
                SetInProgressState(false);
                Navigation("/Tripzy/User/View/Plan");
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [InProgress, Navigation]);

    useEffect(function () {
        if (ErrorState) {
            const timer = setTimeout(function () {
                SetErrorState(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [ErrorState]);

    async function BackendCall() {
        if (!LocationRef.current.value || NoofPeople === 0 || NoofDays === 0 || !BudgetType) {
            SetErrorState(true);
            return;
        }

        SetInProgressState(true);
        const token = localStorage.getItem("token");
        const payload = {
            destination: LocationRef.current.value,
            numberOfPeople: NoofPeople,
            budgetType: BudgetType,
            numberOfDays: NoofDays,
            startDate : bufferDate
        };
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        try {
            const result: any = await axios.post(`${Backend_Url}/Tripzy/Api/TravelPlan/New`, payload, config);
            if (result) {
                console.log(result.data.UniqueId);
                localStorage.setItem("UniqueId", result.data.UniqueId);
            } else {
                SetErrorState(true);
                SetInProgressState(false);
            }
        } catch (e) {
            SetErrorState(true);
            SetInProgressState(false);
        }
    }

    return <>
        {ErrorState && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md transition-all duration-500">
                <div className="bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-rose-500 flex flex-col items-center animate-in zoom-in duration-300">
                    <div className="bg-rose-100 p-4 rounded-full mb-4">
                        <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className="text-slate-900 font-black text-xl">Incomplete Details</div>
                    <div className="text-slate-500 text-center mt-2 font-medium">
                        Please fill all sections to architect your escape.
                    </div>
                </div>
            </div>
        )}

        {!InProgress ? (
            <div className="bg-white min-h-screen">
                <Navbar />
                <div className="max-w-5xl mx-auto px-6 py-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <div className="text-center mb-16">
                        <div className="text-blue-500 font-black tracking-widest text-xs uppercase mb-4">The Intelligent Concierge</div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">
                            Design Your Perfect<br /><span className="text-blue-400">Escape</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-lg mt-6 max-w-2xl mx-auto">
                            Tell us your preferences and let our AI architect a bespoke itinerary tailored precisely to your style.
                        </p>
                    </div>

                    <div className="bg-slate-200 rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center max-w-2xl mx-auto mb-20 relative">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-0"></div>
                            <div className="flex flex-col items-center z-10">
                                <button 
                                    onClick={() => scrollToSection(step1Ref)}
                                    className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black transition-all duration-300 shadow-lg ${LocationRef.current?.value ? 'bg-blue-500 text-white' : 'bg-white text-slate-400 hover:scale-110 shadow-slate-200'}`}
                                >1</button>
                                <span className="text-[10px] font-black uppercase tracking-widest mt-3 text-slate-400">Destination</span>
                            </div>
                            <div className="flex flex-col items-center z-10">
                                <button 
                                    onClick={() => scrollToSection(step2Ref)}
                                    className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black transition-all duration-300 shadow-lg ${(NoofPeople > 0 && NoofDays > 0) ? 'bg-blue-500 text-white' : 'bg-white text-slate-400 hover:scale-110 shadow-slate-200'}`}
                                >2</button>
                                <span className="text-[10px] font-black uppercase tracking-widest mt-3 text-slate-400">Details</span>
                            </div>
                            <div className="flex flex-col items-center z-10">
                                <button 
                                    onClick={() => scrollToSection(step3Ref)}
                                    className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black transition-all duration-300 shadow-lg ${BudgetType ? 'bg-blue-500 text-white' : 'bg-white text-slate-400 hover:scale-110 shadow-slate-200'}`}
                                >3</button>
                                <span className="text-[10px] font-black uppercase tracking-widest mt-3 text-slate-400">Budget</span>
                            </div>
                        </div>

                        <div ref={step1Ref} className="mb-20 group">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">01</span>
                                Where are we going?
                            </h2>
                            <div className="relative flex items-center group">
                                <div className="absolute left-6 z-10 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                    <Location />
                                </div>
                                <input 
                                    ref={LocationRef} 
                                    type="text" 
                                    placeholder="e.g. Bhimtal, Uttarakhand" 
                                    className="w-full h-16 bg-white border-2 border-slate-100 rounded-3xl pl-16 pr-8 font-bold text-slate-700 focus:border-blue-300 outline-none transition-all shadow-sm focus:shadow-xl focus:shadow-blue-50" 
                                />
                            </div>
                        </div>

                        <div ref={step2Ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                            <div className="space-y-8">
                                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">02</span>
                                    No. of people
                                </h2>
                                <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 flex items-center justify-between shadow-sm">
                                    <button 
                                        onClick={() => SetNoofPeople(prev => prev > 0 ? prev - 1 : 0)}
                                        className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 font-black text-2xl hover:bg-rose-100 hover:text-rose-600 transition-colors active:scale-90"
                                    >-</button>
                                    <span className="text-4xl font-black text-slate-900">{NoofPeople}</span>
                                    <button 
                                        onClick={() => SetNoofPeople(prev => prev + 1)}
                                        className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 font-black text-2xl hover:bg-emerald-100 hover:text-emerald-600 transition-colors active:scale-90"
                                    >+</button>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">03</span>
                                    Trip Duration
                                </h2>
                                <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 flex items-center justify-between shadow-sm">
                                    <button 
                                        onClick={() => SetNoofDays(prev => prev > 0 ? prev - 1 : 0)}
                                        className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 font-black text-2xl hover:bg-rose-100 hover:text-rose-600 transition-colors active:scale-90"
                                    >-</button>
                                    <div className="text-center">
                                        <span className="text-4xl font-black text-slate-900 block leading-none">{NoofDays}</span>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Days</span>
                                    </div>
                                    <button 
                                        onClick={() => SetNoofDays(prev => prev + 1)}
                                        className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-900 font-black text-2xl hover:bg-emerald-100 hover:text-emerald-600 transition-colors active:scale-90"
                                    >+</button>
                                </div>
                            </div>
                        </div>

                        <div ref={step3Ref} className="mb-16">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">04</span>
                                Financial Style
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div 
                                    onClick={() => SetbudgetType("Cheap")} 
                                    className={`group p-8 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer flex flex-col items-center text-center ${BudgetType === 'Cheap' ? 'bg-emerald-50 border-emerald-500 scale-105 shadow-xl shadow-emerald-100' : 'bg-white border-slate-100 hover:border-emerald-200'}`}
                                >
                                    <div className={`p-4 rounded-2xl mb-4 transition-colors ${BudgetType === 'Cheap' ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-emerald-500 group-hover:bg-emerald-100'}`}>
                                        <RichDollar />
                                    </div>
                                    <div className="text-slate-900 font-black text-xl mb-2">Economy</div>
                                    <div className="text-slate-500 text-xs font-bold leading-relaxed italic">Smart savings & local discoveries.</div>
                                </div>

                                <div 
                                    onClick={() => SetbudgetType("Moderate")} 
                                    className={`group p-8 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer flex flex-col items-center text-center ${BudgetType === 'Moderate' ? 'bg-blue-50 border-blue-500 scale-105 shadow-xl shadow-blue-100' : 'bg-white border-slate-100 hover:border-blue-200'}`}
                                >
                                    <div className={`p-4 rounded-2xl mb-4 transition-colors ${BudgetType === 'Moderate' ? 'bg-blue-500 text-white' : 'bg-slate-50 text-blue-500 group-hover:bg-blue-100'}`}>
                                        <Balance />
                                    </div>
                                    <div className="text-slate-900 font-black text-xl mb-2">Mid-Range</div>
                                    <div className="text-slate-500 text-xs font-bold leading-relaxed italic">The perfect balance of comfort & value.</div>
                                </div>

                                <div 
                                    onClick={() => SetbudgetType("Luxury")} 
                                    className={`group p-8 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer flex flex-col items-center text-center ${BudgetType === 'Luxury' ? 'bg-rose-50 border-rose-500 scale-105 shadow-xl shadow-rose-100' : 'bg-white border-slate-100 hover:border-rose-200'}`}
                                >
                                    <div className={`p-4 rounded-2xl mb-4 transition-colors ${BudgetType === 'Luxury' ? 'bg-rose-500 text-white' : 'bg-slate-50 text-rose-500 group-hover:bg-rose-100'}`}>
                                        <King />
                                    </div>
                                    <div className="text-slate-900 font-black text-xl mb-2">Luxury</div>
                                    <div className="text-slate-500 text-xs font-bold leading-relaxed italic">Premium stays & zero compromises.</div>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={BackendCall} 
                            className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-slate-200 flex items-center justify-center gap-4 hover:bg-blue-500 transition-all active:scale-95 group"
                        >
                            Architect My Trip 
                            <span className="group-hover:rotate-12 transition-transform"><Magic /></span>
                        </button>
                        <p className="text-center text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-6">
                            AI-Engine will craft your journey in real-time
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        ) : <Planning />}
    </>
}