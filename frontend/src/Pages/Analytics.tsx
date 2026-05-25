import { Navbar } from "../Components/Navabar"
import { Footer } from "../Components/Footer"
import { GeographicDistribution } from "../Components/Stats"
import { TravelTrends } from "../Components/TravelTrends"
import { useState, useEffect } from "react"
import { VITE_BACKEND_URL } from "../BackendUrl/BackendUrl"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Analytics() {
  const [ErrorState, SetErrorState] = useState(false);
  const [ErrorDetail, SetErrorDetail] = useState("Network Error : Please Try again later");
  const [LoadingState, SetLoadingState] = useState(true);
  const [AnalyticsData, SetAnalyticsData]: any = useState(null);
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
    BackendHit();
  }, []);

  async function BackendHit() {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    };
    try {
      const result = await axios.get(`${VITE_BACKEND_URL}/Tripzy/Api/Plan/Analytics/Show`, config);
      if (result.data.Data) {
        SetAnalyticsData(result.data.Data);
        SetLoadingState(false);
      } else {
        SetAnalyticsData({
          TotaltripsPlanned: 0,
          MostVisitedPlace: [],
          ContinentVists: [{}],
          MonthlyVisits: {}
        });
        SetLoadingState(false);
      }
    } catch (e: any) {
      SetErrorDetail(e.response?.data?.msg || e.message || "Network Error");
      SetErrorState(true);
      SetLoadingState(false);
    }
  }

  const continentData = AnalyticsData?.ContinentVists?.[0] || {};
  const totalTrips = AnalyticsData?.TotaltripsPlanned || 0;
  const mostVisited = AnalyticsData?.MostVisitedPlace || [];
  const topPlace = mostVisited.length > 0 ? mostVisited.sort((a: any, b: any) => b.PlaceVisits - a.PlaceVisits)[0] : null;

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 relative">
      <Navbar />

      {ErrorState && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-red-500 animate-bounce">
            <div className="font-bold text-xl text-slate-800">Error</div>
            <div className="text-slate-600 mt-2">{ErrorDetail}</div>
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-24 pb-20">

        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-600 font-mono text-xs font-bold rounded-full border border-blue-100 mb-6">
              Insight Dashboard
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
              Travel <span className="text-blue-500 italic">Analytics</span>
            </h1>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              Reflecting on your journey through the world. Every mile tracked, every destination curated, and every milestone reached in your global pursuit of excellence.
            </p>
          </div>

          <button onClick={() => Navigation("/Tripzy/User/Plan/NewTrip")} className="group relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-blue-200 active:scale-95 flex items-center gap-3">
            <span>Plan New Trip</span>
            <svg className="w-6 h-6 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </header>

        {LoadingState ? (
          <>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] h-[142px] flex flex-col justify-between">
                  <div className="w-1/2 h-3 bg-slate-200 rounded-md"></div>
                  <div className="flex items-baseline gap-2 mt-4">
                    <div className="w-1/3 h-10 bg-slate-200 rounded-xl"></div>
                    <div className="w-1/4 h-3 bg-slate-200 rounded-md"></div>
                  </div>
                </div>
              ))}
            </section>

            <section className="mt-10 flex flex-col lg:flex-row gap-8 animate-pulse">
              <div className="w-full lg:w-1/2 bg-slate-50 border border-slate-100 h-[450px] rounded-[2rem]"></div>
              <div className="w-full lg:w-1/2 bg-slate-50 border border-slate-100 h-[450px] rounded-[2rem]"></div>
            </section>
          </>
        ) : (
          <>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              {[
                { label: "TOTAL TRIPS PLANNED", val: String(totalTrips), unit: "expeditions", color: "text-blue-600" },
                { label: "MOST VISITED", val: topPlace ? topPlace.PlaceName : "—", unit: topPlace ? `${topPlace.PlaceVisits} Visits Total` : "No data yet", color: "text-slate-900" },
                { label: "TOTAL DESTINATIONS", val: String(mostVisited.length), unit: "places explored", color: "text-slate-900" }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-100 group">
                  <div className="text-[0.7rem] font-black tracking-[0.2em] text-slate-400 mb-4">{item.label}</div>
                  <div className="flex items-baseline gap-2">
                    <div className={`text-4xl md:text-5xl font-black tracking-tighter ${item.color}`}>{item.val}</div>
                    <div className="text-xs font-mono text-slate-400 group-hover:text-blue-400 transition-colors">{item.unit}</div>
                  </div>
                </div>
              ))}
            </section>

            <section className="mt-10 flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
              <GeographicDistribution
                northAmerica={continentData.NorthAmerica || 0}
                southAmerica={continentData.SouthAmerica || 0}
                europe={continentData.Europe || 0}
                africa={continentData.Africa || 0}
                asia={continentData.Asia || 0}
                australia={continentData.Australia || 0}
              />
              <TravelTrends
                January={AnalyticsData?.MonthlyVisits?.January || 0}
                February={AnalyticsData?.MonthlyVisits?.February || 0}
                March={AnalyticsData?.MonthlyVisits?.March || 0}
                April={AnalyticsData?.MonthlyVisits?.April || 0}
                May={AnalyticsData?.MonthlyVisits?.May || 0}
                June={AnalyticsData?.MonthlyVisits?.June || 0}
                July={AnalyticsData?.MonthlyVisits?.July || 0}
                August={AnalyticsData?.MonthlyVisits?.August || 0}
                September={AnalyticsData?.MonthlyVisits?.September || 0}
                October={AnalyticsData?.MonthlyVisits?.October || 0}
                November={AnalyticsData?.MonthlyVisits?.November || 0}
                December={AnalyticsData?.MonthlyVisits?.December || 0}
              />
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}