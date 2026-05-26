import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navabar";
import { Footer } from "../Components/Footer";
import { Link } from "../Ui/Icons/Link";
import { ViewEye } from "../Ui/Icons/Eye";
import { IconEdit } from "../Ui/Icons/Edit";
import { Calender } from "../Ui/Icons/Calender";
import { EditPencil } from "../Ui/Icons/EditPencil";
import { Button } from "../Ui/Buttons/Button";
import Russia from "../Images/Russia.jpg";
import axios from "axios";
import { VITE_BACKEND_URL } from "../BackendUrl/BackendUrl";

const BudgetSubHeadings = {
  "Luxury": "Premium Concierge Exclusive", 
  "Cheap": "Budget Friendly Core", 
  "Moderate": "Standard Comfort Tier"
}

export function MyTripShare() {
  const [activeSetting, setActiveSetting] = useState(false);
  const [PlanUniqueId, SetPlanUniqueId] = useState("");
  const [ErrorState, SetErrorState] = useState(false);
  const [ErrorDetail, SetErrorDetail] = useState("Network Error : Please Try again later");
  const [LoadingState, SetLoadingState] = useState(false);
  const [PlanData, SetPlanData] = useState<any>(null);
  const [ChangesMadeState, SetChangesMadeState] = useState(false);

  useEffect(function () {
    if (ErrorState) {
      const timeout = setTimeout(function () {
        SetErrorState(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [ErrorState]);

  useEffect(function () {
    if (ChangesMadeState) {
      const timeout = setTimeout(function () {
        SetChangesMadeState(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [ChangesMadeState]);

  useEffect(function () {
    SetLoadingState(true);
    const TimeOut = setTimeout(function () {
      BackendCall();
    }, 2000);
    return () => clearTimeout(TimeOut);
  }, []);

  async function BackendCall() {
    const token = localStorage.getItem("token");
    const PlanId = localStorage.getItem("UniqueId");
    if (PlanId) SetPlanUniqueId(PlanId);
    
    const payload = { PlanUniqueId: PlanId };
    const config = {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    };
    try {
      const result = await axios.post(`${VITE_BACKEND_URL}/Tripzy/Api/TravelPlan/Show/Existing`, payload, config);
      if (result.data.Data) {
        SetPlanData(result.data.Data);
        if (result.data.Data.IsEditable !== undefined) {
          setActiveSetting(result.data.Data.IsEditable);
        }
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

  async function EditBackendCall(){
    SetLoadingState(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    };
    const payload = {
      PlanUniqueId : PlanUniqueId, 
      Decision : activeSetting
    };
    try {
      const result = await axios.post(`${VITE_BACKEND_URL}/Tripzy/Api/plan/Settings/Edit/Approval`, payload, config);
      if (result.data.Data) {
        SetPlanData(result.data.Data);
        if (result.data.Data.IsEditable !== undefined) {
          setActiveSetting(result.data.Data.IsEditable);
        }
        SetChangesMadeState(true);
        SetLoadingState(false);
      } else {
        SetErrorDetail("Backend returned empty Data layout configuration framework bundle.");
        SetErrorState(true);
        SetLoadingState(false);
      }
    } catch (e: any) {
      SetErrorDetail(e.response?.data?.msg || e.message || "Network Error: Could not connect to the backend.");
      SetErrorState(true);
      SetLoadingState(false);
    }
  }

  function HandleCopyLink() {
    const shareUrl = `${VITE_BACKEND_URL}/Tripzy/Api/plan/Share/${PlanUniqueId}`;
    navigator.clipboard.writeText(shareUrl)
      .catch(() => {
        SetErrorDetail("Failed to copy link structure layout framework.");
        SetErrorState(true);
      });
  }

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 flex flex-col justify-between overflow-x-hidden">
      <div>
        <Navbar />

        {ErrorState && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-red-500 animate-bounce">
              <div className="font-bold text-xl text-slate-800">Error</div>
              <div className="text-slate-600 mt-2">{ErrorDetail}</div>
            </div>
          </div>
        )}

        {ChangesMadeState && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-green-500 text-center max-w-sm mx-4 transform transition-all scale-100 duration-300">
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="font-black text-xl text-slate-800 tracking-tight">Settings Saved</div>
              <div className="text-slate-500 text-sm mt-1.5 leading-relaxed">Your custom itinerary link security configuration rules have updated safely.</div>
            </div>
          </div>
        )}
        
        {!LoadingState && PlanData ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 md:pb-24">
            <header className="mb-10 md:mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
                Sharing & <span className="text-blue-500 italic">Collaboration</span>
              </h1>
              <p className="font-mono text-slate-400 text-xs md:text-sm tracking-wide uppercase mt-4">
                Start sharing your planned trip with your friends, family or relatives
              </p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
              <div className="w-full lg:w-2/5 p-6 md:p-8 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Share Link</h3>
                  
                  <div className="w-full h-14 bg-slate-50 rounded-2xl mt-6 px-4 flex items-center justify-between border border-slate-100 group">
                    <div className="flex items-center gap-3 overflow-hidden mr-2">
                      <div className="text-slate-400 group-hover:text-blue-500 transition-colors flex-shrink-0">
                        <Link />
                      </div>
                      <span className="text-blue-500 font-medium text-sm truncate">
                        {`https://tripzy-gamma.vercel.app/Tripzy/Api/plan/Share/${PlanUniqueId}`}
                      </span>
                    </div>
                    <button onClick={HandleCopyLink} className="text-blue-500 hover:text-blue-600 font-mono text-xs font-bold bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all active:scale-95 flex-shrink-0 cursor-pointer">
                      Copy
                    </button>
                  </div>

                  <div className="w-full mt-10">
                    <span className="text-slate-400 font-black font-mono text-[0.65rem] tracking-[0.3em] uppercase block mb-4">
                      Privacy Settings
                    </span>
                    
                    <div className="space-y-4">
                      <div 
                        onClick={() => setActiveSetting(false)}
                        className={`flex w-full p-4 rounded-2xl transition-all border text-left items-center justify-between group cursor-pointer ${
                          activeSetting === false 
                            ? "bg-blue-50/40 border-blue-200 shadow-sm" 
                            : "bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100"
                        }`}
                      >
                        <div className="flex items-center overflow-hidden">
                          <div className={`w-12 h-12 rounded-xl flex justify-center items-center flex-shrink-0 shadow-sm transition-all duration-300 ${
                            activeSetting === false ? "bg-green-500 text-white scale-105" : "bg-green-50 text-green-600 group-hover:scale-110"
                          }`}> 
                            <ViewEye />
                          </div>
                          <div className="ml-4 overflow-hidden">
                            <div className="font-bold text-slate-800 text-sm">Anyone with Link</div>
                            <div className="text-slate-400 font-light text-xs mt-0.5">Can view the itinerary</div>
                          </div>
                        </div>
                        
                        <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-all duration-300 flex-shrink-0 ${
                          activeSetting === false ? "bg-blue-500 justify-start" : "bg-slate-200 justify-end"
                        }`}>
                          <div className="bg-white w-4 h-4 rounded-full shadow-md transition-all duration-350" />
                        </div>
                      </div>

                      <div 
                        onClick={() => setActiveSetting(true)}
                        className={`flex w-full p-4 rounded-2xl transition-all border text-left items-center justify-between group cursor-pointer ${
                          activeSetting === true
                            ? "bg-blue-50/40 border-blue-200 shadow-sm" 
                            : "bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100"
                        }`}
                      >
                        <div className="flex items-center overflow-hidden">
                          <div className={`w-12 h-12 rounded-xl flex justify-center items-center flex-shrink-0 shadow-sm transition-all duration-300 ${
                            activeSetting === true ? "bg-blue-500 text-white scale-105" : "bg-blue-50 text-blue-600 group-hover:scale-110"
                          }`}> 
                            <IconEdit />
                          </div>
                          <div className="ml-4 overflow-hidden">
                            <div className="font-bold text-slate-800 text-sm">Anyone with Link</div>
                            <div className="text-slate-400 font-light text-xs mt-0.5">Can edit activities</div>
                          </div>
                        </div>
                        
                        <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-all duration-300 flex-shrink-0 ${
                          activeSetting === true ? "bg-blue-500 justify-end" : "bg-slate-200 justify-start"
                        }`}>
                          <div className="bg-white w-4 h-4 rounded-full shadow-md transition-all duration-350" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 w-full pt-4">
                  <Button OnClick={EditBackendCall} text="Save Access Controls" color="blue" textColor="white" size="secondry" />
                </div>
              </div>

              <div className="w-full lg:w-3/5 p-6 md:p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl shadow-slate-900/20 flex flex-col justify-between transition-all duration-500">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-bold tracking-tight">Trip Overview</h3>
                    <span className="inline-flex items-center px-4 py-1 bg-green-500/20 text-green-400 font-mono text-xs font-black rounded-full border border-green-500/30 animate-pulse tracking-widest">
                      ACTIVE
                    </span>
                  </div>
                  
                  <div className="w-full h-px bg-white/10 mt-6" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/5 hover:bg-white/10 transition-colors">
                      <span className="font-mono text-white/40 text-[0.65rem] font-bold uppercase tracking-widest block mb-2">Destination</span>
                      <h4 className="font-bold text-lg text-white">{PlanData.planName}</h4>
                      <span className="text-white/60 font-light text-xs mt-1 block">{PlanData.PlaceName}</span>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/5 hover:bg-white/10 transition-colors group">
                      <span className="font-mono text-white/40 text-[0.65rem] font-bold uppercase tracking-widest block mb-2">Dates</span>
                      <div className="flex items-center gap-2">
                        <div className="text-blue-400 transition-transform group-hover:rotate-12">
                          <Calender />
                        </div>
                        <h4 className="font-bold text-lg text-white">{PlanData.planDate}</h4>
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/5 hover:bg-white/10 transition-colors">
                      <span className="font-mono text-white/40 text-[0.65rem] font-bold uppercase tracking-widest block mb-2">Budget Tier</span>
                      <div className="flex items-center gap-2">
                        <div className="text-blue-400">
                          <EditPencil />
                        </div>
                        <h4 className="font-bold text-lg text-white">{PlanData.BudgetCategory || "STANDARD"}</h4>
                      </div>
                      <span className="text-white/60 font-light text-xs mt-1 block">
                        {BudgetSubHeadings[PlanData.BudgetCategory as keyof typeof BudgetSubHeadings] || "Standard Comfort Tier"}
                      </span>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/5 hover:bg-white/10 transition-colors">
                      <span className="font-mono text-white/40 text-[0.65rem] font-bold uppercase tracking-widest block mb-2">Trip ID</span>
                      <h4 className="font-mono font-bold text-base text-blue-400 mt-1">{PlanUniqueId}</h4>
                    </div>
                  </div>
                </div>

                <div className="relative mt-8 group rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={Russia} 
                    alt="Current Destination Layout" 
                    className="w-full h-52 md:h-64 object-cover transition-transform duration-[1.5s] group-hover:scale-110 filter brightness-[0.65]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-blue-400 font-mono text-[0.65rem] tracking-[0.3em] uppercase font-black">Current Venue</span>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1 transition-transform duration-500 group-hover:translate-x-1">
                      {PlanData.PlaceName}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      </div>
      
      <Footer />
    </div>
  );
}