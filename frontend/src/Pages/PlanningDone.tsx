import { Navbar } from "../Components/Navabar"
import { Date } from "../Ui/Icons/Date"
import { Users } from "../Ui/Icons/Users"
import Hotel1 from "../Images/Hotel1.jpg"
import { Hotels } from "../Components/Hotels"
import { PlanDay } from "../Components/Days"
import { Footer } from "../Components/Footer"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect,useState } from "react"
import { VITE_BACKEND_URL } from "../BackendUrl/BackendUrl"
import { WeatherDetails } from "../Components/WeatherDetails"

export function DonePlanning() {
    const [RefineState , SetRefineState] = useState(false);
    const [RefinePrompt, SetRefinePrompt] = useState("");
    const [ErrorState, SetErrorState] = useState(false);
    const [ErrorDetail, SetErrorDetail] = useState("Network Error : Please Try again later");
    const [LoadingState, SetLoadingState] = useState(false);
    const [PlanData, SetPlanData]: any = useState([]);
    const Navigation = useNavigate();

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
    async function HandleExportPDF() {
        const PlanUniqueId = localStorage.getItem("UniqueId");
        const token = localStorage.getItem("token");
        
        try {
            const response = await axios.get(
                `${VITE_BACKEND_URL}/Tripzy/Export/Plan/Pdf/${PlanUniqueId}`, 
                {
                    headers: { 'Authorization': token },
                    responseType: 'blob' // Essential wrapper parameters for file downloading streams
                }
            );
            
            const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
            const linkElement = document.createElement('a');
            linkElement.href = blobUrl;
            
            linkElement.setAttribute('download', `${PlanData[0]?.planName || "Itinerary"}.pdf`);
            document.body.appendChild(linkElement);
            linkElement.click();
            
            linkElement.parentNode?.removeChild(linkElement);
            window.URL.revokeObjectURL(blobUrl);
        } catch (e) {
            SetErrorDetail("Failed to compile or stream pdf object payload.");
            SetErrorState(true);
        }
    }
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
                SetErrorDetail("Backend returned empty Data. Itinerary may have been deleted or not found.");
                SetErrorState(true);
                SetLoadingState(false);
            }
        } catch (e: any) {
            SetErrorDetail(e.response?.data?.msg || e.message || "Network Error: Could not connect to the backend.");
            SetErrorState(true);
            SetLoadingState(false);
        }
    }

    async function HandleRefineSubmit() {
        if (!RefinePrompt.trim()) return;
        SetRefineState(false);
        SetLoadingState(true);
        const token = localStorage.getItem("token");
        const PlanUniqueId = localStorage.getItem("UniqueId");
        const payload = { 
            PlanUniqueId: PlanUniqueId,
            RefinePrompt : RefinePrompt 
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
                SetRefinePrompt("");
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

        {RefineState && (
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
                        value={RefinePrompt}
                        onChange={(e) => SetRefinePrompt(e.target.value)}
                        placeholder="e.g., Change the hotel tier to a luxury resort and add more historical sightseeing locations to Day 2 afternoon layout..."
                        className="w-full h-40 p-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-800 placeholder-slate-400 text-sm shadow-inner bg-slate-50/50"
                    />
                    <div className="flex items-center justify-end gap-3 mt-6">
                        <button
                            onClick={() => {
                                SetRefineState(false);
                                SetRefinePrompt("");
                            }}
                            className="px-5 h-11 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            Discard
                        </button>
                        <button
                            onClick={HandleRefineSubmit}
                            disabled={!RefinePrompt.trim()}
                            className="px-6 h-11 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:pointer-events-none shadow-md transition-colors"
                        >
                            Refine Itinerary
                        </button>
                    </div>
                </div>
            </div>
        )}

        {!LoadingState && PlanData.length > 0 ? (
            PlanData.map((trips: any, index: number) => (
                <div key={index} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-12 animate-in fade-in duration-700">
                    <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch relative">
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

                        <div className="p-4 md:p-[2rem] w-full md:w-1/2 flex flex-col md:flex-row justify-center md:justify-end items-center gap-6 mt-4 md:mt-[-3rem]">
                            <div className="bg-slate-900 rounded-2xl w-full max-w-[22rem] h-auto p-[1.5rem] shadow-2xl transform hover:scale-105 transition-transform duration-500">
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
                                <div className="text-[2rem] md:text-[2.5rem] font-black text-white flex justify-center items-center font-sans tracking-tighter">
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

                            <div className="flex flex-col gap-3 w-full max-w-[14rem] md:self-start md:mt-[3rem]">
                                <button onClick={()=>{
                                    SetRefineState(true);
                                }} className="flex items-center justify-center gap-2 bg-[#0052cc] hover:bg-[#0043a4] text-white font-bold text-sm py-3 px-5 rounded-full shadow-md transition-colors w-full">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19(4.47) 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                                    </svg>
                                    Refine with AI
                                </button>
                                <button onClick={() => HandleExportPDF()} className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-3 px-5 rounded-full border border-slate-200 transition-colors w-full">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm12 4V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1v-1zm-2 1V9h1v2h-1z"/>
                                    </svg>
                                    Export to PDF
                                </button>
                                <button onClick={() => Navigation("/Tripzy/User/Start/Sharing/Plan")} className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-3 px-5 rounded-full border border-slate-200 transition-colors w-full">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/>
                                    </svg>
                                    Share Itinerary
                                </button>
                            </div>
                        </div>
                    </div>
                    <WeatherDetails PlaceName={trips.PlaceName} WeatherInfo={trips.WeatherForecast} />
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
        ) : LoadingState ? (
            <div className="flex flex-col items-center justify-center h-[60vh] opacity-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400"></div>
                <div className="mt-4 font-bold text-slate-500">Loading your masterpiece...</div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] opacity-50">
                <div className="text-4xl mb-4">🏜️</div>
                <div className="mt-4 font-bold text-slate-500">Could not find itinerary data.</div>
            </div>
        )}
        <Footer />
    </>
}