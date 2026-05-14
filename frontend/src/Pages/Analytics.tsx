import { Navbar } from "../Components/Navabar"
import { Footer } from "../Components/Footer"
import { Button } from "../Ui/Buttons/Button"
import Maps from "../Images/Maps.png"
import { AddNew } from "../Ui/Icons/AddNew"

export function Analytics()
{
    return<>
        <Navbar/>
        <div className=" pl-[3rem] pr-[3rem] mt-[5rem]">
            <div className="flex">
                <div className="w-full">
                    <div className="flex">
                        <div>
                            <div className="bg-blue-200 text-blue-300 font-mono w-[13rem] flex justify-center items-center rounded-lg">Insight Dashboard</div>
                            <div className="mt-[0.5rem] text-[3rem] font-semibold">
                                Travel Analytics
                            </div>
                            <div className="w-[40rem] font-light">
                                Reflecting on your journey through the world. Every mile tracked, every destination curated, and every milestone reached in your global pursuit of excellence.
                            </div>
                        </div>
                        <div className="w-full">
                            <button aria-label="name" className="pt-[1rem] pb-[1rem] pl-[3rem] pr-[3rem] bg-blue-300 w-full ml-[2rem] h-full rounded-md">
                                {/* Here comes a plus sign */}
                                <div className="text-white text-[2rem] fonr-semibold">Plan New Trip</div>
                            </button>
                        </div>
                    </div>
                    <div className="flex mt-[6rem] gap-10">
                        <div className="w-[2/6] bg-slate-100 rounded-md p-[2rem] w-full">
                            <div className="font-mono text-[1.5rem] font-semibold text-slate-500">TOTAL TRIPS PLANNED</div>
                            <div className="flex">
                                <div className="text-blue-700 font-semibold text-[4rem]">42</div>
                                <div className="mt-[3.5rem] font-mono ml-[0.5rem] text-slate-500">expeditions</div>
                            </div>
                        </div>
                        <div className="w-[2/6] bg-slate-100 rounded-md p-[2rem] w-full">
                            <div className="font-mono text-[1.5rem] font-semibold text-slate-500">
                                MOST VISITED
                            </div>
                            <div className="text-[2.5rem] font-semibold">
                                Kyoto,JP
                            </div>
                            <div className="text-blue-300 font-bold font-mono">
                                8 Visits Total
                            </div>
                        </div>
                        <div className="w-[2/6] bg-slate-100 rounded-md p-[2rem] w-full">
                            <div className="font-mono text-[1.5rem] font-semibold text-slate-500">
                                Estimated Total Spend
                            </div>
                            <div className="text-[4rem] font-bold ">
                                ₹ 180K
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[5rem] flex flex-col lg:flex-row gap-10">
    <div className="w-full lg:w-4/6 bg-slate-100 rounded-[2rem] p-[2rem] shadow-xl shadow-slate-200/50 relative overflow-hidden group">
        <div className="relative z-10">
            <div className="text-[2.2rem] font-bold tracking-tight text-slate-800">Geographic Distribution</div>
            <div className="text-slate-600 text-[1rem] font-light">Your footprint across the continents.</div>
        </div>

        <div className="relative mt-[2rem] w-full h-full">
            <img 
                src={Maps} 
                alt="World Map" 
                className="w-full h-auto rounded-[2rem] transition-transform duration-1000 group-hover:scale-[1.02]"
            />
            <div className="absolute top-[25%] left-[18%] opacity-40 hover:opacity-100 transition-opacity duration-500">
                <div className="flex justify-center items-center gap-2 rounded-xl px-3 py-1.5 font-mono bg-white/60 backdrop-blur-sm border border-white/50 text-xs">
                    <span className="text-slate-800">North America</span>
                    <span className="font-bold text-blue-300">100%</span>
                </div>
            </div>
            <div className="absolute top-[60%] left-[18%] opacity-40 hover:opacity-100 transition-opacity duration-500">
                <div className="flex justify-center items-center gap-2 rounded-xl px-3 py-1.5 font-mono bg-white/60 backdrop-blur-sm border border-white/50 text-xs">
                    <span className="text-slate-800">South America</span>
                    <span className="font-bold text-blue-300">100%</span>
                </div>
            </div>
            <div className="absolute top-[22%] left-[48%] opacity-40 hover:opacity-100 transition-opacity duration-500">
                <div className="flex justify-center items-center gap-2 rounded-xl px-3 py-1.5 font-mono bg-white/60 backdrop-blur-sm border border-white/50 text-xs">
                    <span className="text-slate-800">Europe</span>
                    <span className="font-bold text-blue-300">0%</span>
                </div>
            </div>
            <div className="absolute top-[42%] left-[48%] opacity-40 hover:opacity-100 transition-opacity duration-500">
                <div className="flex justify-center items-center gap-2 rounded-xl px-3 py-1.5 font-mono bg-white/60 backdrop-blur-sm border border-white/50 text-xs">
                    <span className="text-slate-800">Africa</span>
                    <span className="font-bold text-blue-300">0%</span>
                </div>
            </div>
            <div className="absolute top-[35%] left-[72%] opacity-40 hover:opacity-100 transition-opacity duration-500">
                <div className="flex justify-center items-center gap-2 rounded-xl px-3 py-1.5 font-mono bg-white/60 backdrop-blur-sm border border-white/50 text-xs">
                    <span className="text-slate-800">Asia</span>
                    <span className="font-bold text-blue-300">100%</span>
                </div>
            </div>
            <div className="absolute top-[60%] left-[80%] opacity-40 hover:opacity-100 transition-opacity duration-500">
                <div className="flex justify-center items-center gap-2 rounded-xl px-3 py-1.5 font-mono bg-white/60 backdrop-blur-sm border border-white/50 text-xs">
                    <span className="text-slate-800">Australia</span>
                    <span className="font-bold text-blue-300">100%</span>
                </div>
            </div>
        </div>
        <div className="w-full">
            <div className="flex">
                <div className="w-2/6">
                    <div className="flex">
                        <div className=""></div>
                        <div></div>
                    </div>
                    <div>Asia</div>
                </div>
                <div className="w-2/6">
                    <div className="flex">
                        <div></div>
                        <div></div>
                    </div>
                    <div>Europe</div>
                </div>
                <div className="w-2/6">
                    <div className="flex">
                        <div></div>
                        <div></div>
                    </div>
                    <div>N. America</div>
                </div>
            </div>
            <div>
                <div className="w-2/6">
                    <div className="flex">
                        <div></div>
                        <div></div>
                    </div>
                    <div>S. America</div>
                </div>
                <div className="w-2/6">
                    <div className="flex">
                        <div></div>
                        <div></div>
                    </div>
                    <div>Australia</div>
                </div>
                <div className="w-2/6">
                    <div className="flex">
                        <div></div>
                        <div></div>
                    </div>
                    <div>Africa</div>
                </div>
            </div>
        </div>
    </div>

    <div className="w-full lg:w-2/6 bg-slate-100 rounded-md">
        <div>Travel Trends</div>
        <div></div>
    </div>

    <style>{`
        @keyframes float-slow {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-10px) translateX(5px); }
        }
        .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
        }
    `}</style>
</div>
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <Footer/>
    </>
}