import { useState, useMemo } from "react";

interface Data {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}

export function TravelTrends(props: Data) {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullMonthNames: (keyof Data)[] = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  const values = useMemo(() => fullMonthNames.map(month => Number(props[month]) || 0), [props]);
  const maxValue = Math.max(...values, 1);
  const peakIndex = values.indexOf(Math.max(...values));

  return (
    <div className="w-full lg:w-2/6 bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl shadow-slate-200/40 border border-slate-50 flex flex-col justify-between transition-all duration-500 hover:shadow-blue-100/40">
      <div className="mb-10">
        <div className="text-4xl font-black tracking-tight text-slate-900">Activity Trends</div>
        <p className="text-slate-500 text-lg font-light mt-2">Trips recorded over 12 months.</p>
      </div>

      <div className="flex items-end justify-between h-56 px-1 gap-2 relative">
        {months.map((month, index) => {
          const rawValue = values[index];
          const heightPercentage = (rawValue / maxValue) * 100;
          const isHovered = hoveredMonth === index;

          return (
            <div
              key={month}
              className="flex-1 flex flex-col items-center cursor-pointer h-full group"
              onMouseEnter={() => setHoveredMonth(index)}
              onMouseLeave={() => setHoveredMonth(null)}
            >
              <div className="relative w-full flex items-end justify-center h-48">
                <div
                  style={{ height: `${heightPercentage}%` }}
                  className={`w-full max-w-[18px] md:max-w-[24px] rounded-full transition-all duration-500 ease-out relative ${
                    isHovered 
                    ? "bg-blue-600 shadow-[0_15px_30px_-5px_rgba(37,99,235,0.5)] scale-x-125" 
                    : "bg-blue-50 group-hover:bg-blue-100"
                  }`}
                />
                {isHovered && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-xl font-black whitespace-nowrap animate-in fade-in zoom-in slide-in-from-bottom-2 duration-300 z-30">
                    {rawValue} Trips
                  </div>
                )}
              </div>
              <span className={`mt-5 text-[0.65rem] font-black uppercase tracking-widest transition-all duration-300 ${
                isHovered ? "text-blue-600 scale-110" : "text-slate-300"
              }`}>
                {month[0]}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] flex justify-between items-center transition-transform hover:scale-[1.02] duration-500 shadow-2xl shadow-slate-900/20">
        <div className="text-white">
          <div className="text-[0.6rem] font-black text-blue-400 uppercase tracking-[0.3em] mb-1">Peak Period</div>
          <div className="text-2xl font-black tracking-tight">
            {fullMonthNames[peakIndex]} <span className="text-blue-400 font-light">({values[peakIndex]})</span>
          </div>
        </div>
        <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-500/40 text-white transition-transform hover:rotate-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}