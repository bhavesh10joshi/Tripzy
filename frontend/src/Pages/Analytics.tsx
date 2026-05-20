import { Navbar } from "../Components/Navabar"
import { Footer } from "../Components/Footer"
import { GeographicDistribution } from "../Components/Stats"
import { TravelTrends } from "../Components/TravelTrends"
import { useState } from "react"

export function Analytics() {
  const [ErrorState, SetErrorState] = useState(false);
  const [ErrorDetail, SetErrorDetail] = useState("Network Error : Please Try again later");
  const [LoadingState, SetLoadingState] = useState(false);

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

          <button className="group relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-blue-200 active:scale-95 flex items-center gap-3">
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
                { label: "TOTAL TRIPS PLANNED", val: "42", unit: "expeditions", color: "text-blue-600" },
                { label: "MOST VISITED", val: "Kyoto, JP", unit: "8 Visits Total", color: "text-slate-900" },
                { label: "ESTIMATED TOTAL SPEND", val: "₹ 180K", unit: "Premium Tier", color: "text-slate-900" }
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
                northAmerica={100} 
                southAmerica={40} 
                europe={0} 
                africa={10} 
                asia={85} 
                australia={30}
              />
              <TravelTrends 
                January={10} February={20} March={30} April={5} 
                May={15} June={0} July={2} August={8} 
                September={9} October={23} November={22} December={21}
              />
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}