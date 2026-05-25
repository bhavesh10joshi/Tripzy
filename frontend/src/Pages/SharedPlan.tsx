import { Navbar } from "../Components/Navabar"
import { Date } from "../Ui/Icons/Date"
import { Users } from "../Ui/Icons/Users"
import Hotel1 from "../Images/Hotel1.jpg"
import { Hotels } from "../Components/Hotels"
import { PlanDay } from "../Components/Days"
import { Footer } from "../Components/Footer"
import { Button } from "../Ui/Buttons/Button"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { VITE_BACKEND_URL } from "../BackendUrl/BackendUrl"

export function SharedPlan() {
    const { UniqueId } = useParams();
    const [ErrorState, SetErrorState] = useState(false);
    const [ErrorDetail, SetErrorDetail] = useState("Network Error : Please Try again later");
    const [LoadingState, SetLoadingState] = useState(false);
    const [PlanData, SetPlanData]: any = useState([]);
    const [CanEdit, SetCanEdit] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<any>([]);
    const [statusOverlay, setStatusOverlay] = useState<{ show: boolean; success: boolean; message: string }>({
        show: false,
        success: true,
        message: ""
    });

    const [refineState, setRefineState] = useState(false);
    const [refinePrompt, setRefinePrompt] = useState("");

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
    }, [UniqueId]);

    async function BackendCall() {
        try {
            const result = await axios.get(`${VITE_BACKEND_URL}/Tripzy/Api/plan/Share/${UniqueId}`);
            if (result.data.msg) {
                SetPlanData([result.data.msg]);
                SetCanEdit(result.data.msg.CanEdit || false);
                SetLoadingState(false);
            } else {
                SetErrorDetail("This plan is not shared or does not exist.");
                SetErrorState(true);
                SetLoadingState(false);
            }
        } catch (e: any) {
            SetErrorDetail(e.response?.data?.msg || e.message || "Network Error: Could not connect to the backend.");
            SetErrorState(true);
            SetLoadingState(false);
        }
    }

    const handleStartEditing = () => {
        setEditedData(JSON.parse(JSON.stringify(PlanData)));
        setIsEditing(true);
    };

    const handleDiscardChanges = () => {
        setEditedData([]);
        setIsEditing(false);
    };

    const handleInputChange = (tripIndex: number, field: string, value: any) => {
        const updated = [...editedData];
        updated[tripIndex] = {
            ...updated[tripIndex],
            [field]: value
        };
        setEditedData(updated);
    };

    const handleSaveEdits = async () => {
        const token = localStorage.getItem("token");
        const editedTrip = editedData[0];
        const originalTrip = PlanData[0];
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };

        const fieldsToCheck = ["planName", "planDate", "numberOfPeople", "BudgetCategory", "EstimatedTotalCostINR", "PlanDescription"];
        
        try {
            for (const field of fieldsToCheck) {
                if (editedTrip[field] !== originalTrip[field]) {
                    await axios.post(`${VITE_BACKEND_URL}/Tripzy/Api/plan/Change/Existing/Plan`, {
                        PlanUniqueId: UniqueId,
                        WhatToChange: field,
                        NewData: editedTrip[field]
                    }, config);
                }
            }

            SetPlanData(JSON.parse(JSON.stringify(editedData)));
            setIsEditing(false);
            setStatusOverlay({
                show: true,
                success: true,
                message: "Changes reflected successfully!"
            });
        } catch (e: any) {
            setStatusOverlay({
                show: true,
                success: false,
                message: e.response?.data?.msg || e.message || "Error occurred while saving."
            });
        }
    };

    async function handleRefineSubmit() {
        if (!refinePrompt.trim()) return;
        setRefineState(false);
        SetLoadingState(true);
        const token = localStorage.getItem("token");
        const payload = { 
            PlanUniqueId: UniqueId,
            RefinePrompt: refinePrompt 
        };
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        try {
            const result = await axios.post(`${VITE_BACKEND_URL}/Tripzy/Api/TravelPlan/RefinePlan`, payload, config);
            if (result.data && result.data.Data) {
                SetPlanData([result.data.Data]);
                if (isEditing) {
                    setEditedData([result.data.Data]);
                }
                setRefinePrompt("");
                SetLoadingState(false);
            } else {
                SetErrorDetail("Refinement failed to return updated data wrapper.");
                SetErrorState(true);
                SetLoadingState(false);
            }
        } catch (e: any) {
            SetErrorDetail(e.response?.data?.msg || e.message || "Refinement Network Error.");
            SetErrorState(true);
            SetLoadingState(false);
        }
    }

    const displayData = isEditing ? editedData : PlanData;

    return <>
        <Navbar />

        {ErrorState && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-red-500 animate-bounce">
                    <div className="font-bold text-xl text-slate-800">Error</div>
                    <div className="text-slate-600 mt-2">{ErrorDetail}</div>
                </div>
            </div>
        )}

        {statusOverlay.show && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className={`bg-white p-8 rounded-2xl shadow-2xl border-t-4 ${statusOverlay.success ? 'border-green-500' : 'border-red-500'} max-w-sm w-full text-center`}>
                    <div className="text-4xl mb-2">{statusOverlay.success ? "✅" : "❌"}</div>
                    <div className="font-bold text-xl text-slate-800">{statusOverlay.success ? "Success" : "Error"}</div>
                    <div className="text-slate-600 mt-2">{statusOverlay.message}</div>
                    <button 
                        onClick={() => setStatusOverlay({ show: false, success: true, message: "" })}
                        className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl font-medium text-sm hover:bg-slate-800 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        )}

        {refineState && (
            <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                <div className="bg-white w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 transform transition-all animate-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                            </svg>
                        </div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Refine Itinerary with AI</h2>
                    </div>
                    <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                        Tell the AI what changes you want to apply to this trip setup. You can ask to add attractions, swap hotel tiers, or alter daily timetables completely.
                    </p>
                    <textarea
                        value={refinePrompt}
                        onChange={(e) => setRefinePrompt(e.target.value)}
                        placeholder="e.g., Change the hotel tier to a luxury resort and add more historical sightseeing locations to Day 2 afternoon layout..."
                        className="w-full h-40 p-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-800 placeholder-slate-400 text-sm shadow-inner bg-slate-50/50"
                    />
                    <div className="flex items-center justify-end gap-3 mt-6">
                        <button
                            onClick={() => {
                                setRefineState(false);
                                setRefinePrompt("");
                            }}
                            className="px-5 h-11 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            Discard
                        </button>
                        <button
                            onClick={handleRefineSubmit}
                            disabled={!refinePrompt.trim()}
                            className="px-6 h-11 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:pointer-events-none shadow-md transition-colors"
                        >
                            Refine Itinerary
                        </button>
                    </div>
                </div>
            </div>
        )}

        <div className="w-full flex justify-between items-center px-4 md:px-[2rem] pt-6">
            <div className="text-2xl font-black tracking-tight text-slate-900">
                {isEditing ? "Editing Itinerary" : "Shared Itinerary"}
            </div>
            {CanEdit && !isEditing && !LoadingState && PlanData.length > 0 && (
                <button 
                    onClick={handleStartEditing}
                    className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-md transition-all text-sm"
                >
                    📝 Start Editing
                </button>
            )}
        </div>

        {!LoadingState && displayData.length > 0 ? (
            <>
                {displayData.map((trips: any, index: number) => (
                    <div key={index} className="px-4 md:px-[2rem] pt-4 md:pt-[2rem] animate-in fade-in duration-700">
                        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch relative">
                            <div className="flex justify-start items-center flex-col w-full md:w-1/2 bg-slate-100 p-6 md:p-[2rem] rounded-md hover:shadow-lg transition-shadow">
                                <div className="text-blue-400 font-mono font-bold flex justify-start items-center w-full text-[0.9rem] tracking-widest">
                                    <span className="font-extrabold text-blue-500 italic font-sans mr-[0.5rem]">{trips.UsersName || "Shared"}'s</span> Curated Itinerary
                                </div>
                                <div className="font-extrabold text-[3rem] md:text-[4rem] text-slate-900 w-full mt-[-0.5rem] md:mt-[-1rem]">
                                    {isEditing ? (
                                        <input aria-label="name"
                                            type="text"
                                            value={trips.planName || ""}
                                            onChange={(e) => handleInputChange(index, "planName", e.target.value)}
                                            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 font-extrabold text-[2rem] md:text-[2.5rem] text-slate-990 focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
                                        />
                                    ) : (
                                        trips.planName
                                    )}
                                </div>
                                <div className="flex justify-start items-center gap-4 md:gap-10 w-full md:pl-[1rem] mt-2 md:mt-0">
                                    <div className="flex justify-center items-center w-full">
                                        <Date />
                                        {isEditing ? (
                                            <input aria-label="name"
                                                type="text"
                                                value={trips.planDate || ""}
                                                onChange={(e) => handleInputChange(index, "planDate", e.target.value)}
                                                className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-[0.8rem] font-bold text-slate-700 ml-[0.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            <div className="text-[0.8rem] font-bold text-slate-500 ml-[0.5rem]">{trips.planDate}</div>
                                        )}
                                    </div>
                                    <div className="flex justify-center items-center w-full">
                                        <Users />
                                        {isEditing ? (
                                            <input aria-label="name" 
                                                type="number"
                                                value={trips.numberOfPeople || 0}
                                                onChange={(e) => handleInputChange(index, "numberOfPeople", parseInt(e.target.value) || 0)}
                                                className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-[0.8rem] font-bold text-slate-700 ml-[0.5rem] w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            <div className="text-[0.8rem] font-bold text-slate-500 ml-[0.5rem]">{trips.numberOfPeople} Travelers</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 md:p-[2rem] w-full md:w-1/2 flex flex-col md:flex-row justify-center md:justify-end items-center gap-6 mt-4 md:mt-[-3rem]">
                                <div className="bg-slate-900 rounded-2xl w-full max-w-[22rem] h-auto p-[1.5rem] shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="text-[0.8rem] font-bold text-slate-400 uppercase tracking-wider">Estimated Budget</div>
                                        {isEditing ? (
                                            <select aria-label="name"
                                                value={trips.BudgetCategory || "STANDARD"}
                                                onChange={(e) => handleInputChange(index, "BudgetCategory", e.target.value)}
                                                className="font-mono font-bold px-2 py-1 rounded-md text-[0.7rem] bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="ECONOMIC">ECONOMIC</option>
                                                <option value="STANDARD">STANDARD</option>
                                                <option value="LUXURY">LUXURY</option>
                                            </select>
                                        ) : (
                                            <div className={`font-mono font-bold px-3 py-1 rounded-md text-[0.7rem] border ${
                                                trips.BudgetCategory?.toLowerCase().includes("luxury") 
                                                ? "border-red-600 text-red-500 bg-red-950/30" 
                                                : "border-green-600 text-green-500 bg-green-950/30"
                                            }`}>
                                                {trips.BudgetCategory || "STANDARD"}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-[2rem] md:text-[2.5rem] font-black text-white flex justify-center items-center font-sans tracking-tighter">
                                        {isEditing ? (
                                            <div className="flex items-center gap-1 w-full">
                                                <span className="text-xl text-slate-400">₹</span>
                                                <input aria-label="name"
                                                    type="number"
                                                    value={trips.EstimatedTotalCostINR || 0}
                                                    onChange={(e) => handleInputChange(index, "EstimatedTotalCostINR", parseInt(e.target.value) || 0)}
                                                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1 text-[1.5rem] font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        ) : (
                                            <>₹{trips.EstimatedTotalCostINR?.toLocaleString()}</>
                                        )}
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
                ))}

                {isEditing && (
                    <div className="w-full flex justify-end items-center mt-[2rem] pr-[3rem] mb-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex gap-5">
                            <button 
                                onClick={() => setRefineState(true)}
                                className="flex justify-center items-center gap-2 bg-[#0052cc] hover:bg-[#0043a4] text-white font-bold py-2.5 px-5 rounded-xl shadow-md transition-all text-sm"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                                </svg>
                                Refine with AI
                            </button>
                            <div onClick={handleDiscardChanges}>
                                <Button text="discard Changes" textColor="red" color="grey" size="secondry"/>
                            </div>
                            <div onClick={handleSaveEdits}>
                                <Button text="Submit" textColor="white" color="blue" size="secondry"/>
                            </div>
                        </div>
                    </div>
                )}
            </>
        ) : LoadingState ? (
            <div className="flex flex-col items-center justify-center h-[60vh] opacity-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400"></div>
                <div className="mt-4 font-bold text-slate-500">Loading shared itinerary...</div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] opacity-50">
                <div className="text-4xl mb-4">🏜️</div>
                <div className="mt-4 font-bold text-slate-500">This plan is not shared or does not exist.</div>
            </div>
        )}
        <Footer />
    </>
}