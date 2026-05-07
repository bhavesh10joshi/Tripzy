import { Plane } from "../Ui/Icons/Plane"
import aeroplane from "../Images/aeroplane.png"
import { GeminiAi } from "./GeminiAi"

export function Planning() {
    return <>
        <div className="fixed inset-0 overflow-hidden">
            <img 
                src={aeroplane} 
                alt="bgimage" 
                className="absolute inset-0 w-full h-full object-cover scale-110 animate-pulse duration-[4000ms]" 
            />
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 animate-in fade-in duration-1000">
            <div className="bg-white/95 backdrop-blur-md w-full max-w-2xl py-16 px-10 rounded-[3.5rem] shadow-2xl text-center border border-white">
                <div className="relative mx-auto w-24 h-24 mb-10">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                    <div className="relative bg-blue-500 w-full h-full rounded-[2rem] flex items-center justify-center shadow-xl shadow-blue-200 transform rotate-12">
                        <Plane />
                    </div>
                </div>

                <h2 className="text-slate-900 text-4xl md:text-5xl font-black leading-tight mb-6">
                    <span className="text-blue-500 italic">Tripzy</span> is crafting<br />Your perfect gateway
                </h2>
                
                <p className="text-slate-500 font-bold text-lg mb-12 italic leading-relaxed max-w-lg mx-auto">
                    "Analyzing thousands of routes, hidden gems, and local secrets to curate a journey just for you."
                </p>
                
                <div className="relative w-64 h-3 bg-slate-100 rounded-full mx-auto overflow-hidden mb-8">
                    <div className="absolute top-0 left-0 h-full bg-blue-500 w-1/2 animate-[loading_2s_infinite_ease-in-out] rounded-full"></div>
                </div>
                
                <div className="flex justify-center items-center gap-4 bg-slate-50 w-fit mx-auto px-6 py-3 rounded-2xl border border-slate-100">
                    <span className="text-blue-500 font-black text-xs uppercase tracking-widest animate-pulse">AI Engine Active</span>
                    <GeminiAi />
                </div>
            </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
            @keyframes loading {
                0% { left: -100%; width: 50%; }
                50% { width: 70%; }
                100% { left: 100%; width: 50%; }
            }
        `}} />
    </>
}