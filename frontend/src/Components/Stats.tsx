import Maps from "../Images/Maps.png"

interface Data {
    northAmerica: number, 
    southAmerica: number, 
    europe: number, 
    africa: number, 
    asia: number, 
    australia: number
}

export function GeographicDistribution(props: Data) {
    const continents = [
        { id: "asia", label: "Asia", value: props.asia, pos: "top-[32%] left-[72%]" },
        { id: "europe", label: "Europe", value: props.europe, pos: "top-[22%] left-[48%]" },
        { id: "na", label: "N. America", value: props.northAmerica, pos: "top-[25%] left-[18%]" },
        { id: "sa", label: "S. America", value: props.southAmerica, pos: "top-[60%] left-[22%]" },
        { id: "aus", label: "Australia", value: props.australia, pos: "top-[65%] left-[82%]" },
        { id: "afr", label: "Africa", value: props.africa, pos: "top-[45%] left-[48%]" },
    ];

    return (
        <div className="w-full lg:w-4/6 bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/40 relative overflow-hidden group transition-all duration-500 hover:shadow-blue-100/30 border border-slate-50">
            <div className="relative z-10 mb-8">
                <div className="text-4xl font-black tracking-tight text-slate-900">Geographic Distribution</div>
                <div className="text-slate-500 text-lg font-light mt-2">Your global footprint categorized by continent.</div>
            </div>

            <div className="relative mt-8 w-full group/map overflow-hidden rounded-[2.5rem]">
                <img 
                    src={Maps} 
                    alt="World Map" 
                    className="w-full h-auto opacity-90 transition-transform duration-[2s] group-hover/map:scale-110" 
                />
                
                {continents.map((c) => (
                    <div 
                        key={c.id} 
                        className={`absolute ${c.pos} transition-all duration-500 hover:-translate-y-2 z-20 ${c.value > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                    >
                        <div className="flex justify-center items-center gap-3 rounded-2xl px-4 py-2 font-black bg-white/90 backdrop-blur-xl border border-white shadow-2xl text-[0.6rem] md:text-xs">
                            <span className="text-slate-800 uppercase tracking-widest">{c.label}</span>
                            <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{c.value}%</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full mt-12 grid grid-cols-2 md:grid-cols-3 gap-8">
                {continents.map((c) => (
                    <div key={`bar-${c.id}`} className="group/item">
                        <div className="flex justify-between items-center mb-3">
                            <div className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/item:text-blue-500 transition-colors">{c.label}</div>
                            <div className="text-xs font-black text-slate-900">{c.value}%</div>
                        </div>
                        <div className="flex h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <div 
                                className={`rounded-full transition-all duration-1000 ease-out ${c.value > 0 ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-200'}`}
                                style={{ width: `${c.value}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}