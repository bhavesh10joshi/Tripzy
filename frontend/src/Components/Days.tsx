import { TimeCard } from "./TimeCard"

interface DayStyle {
    DayNumber?: number,
    NameOfPlanDay?: string,
    Date?: string,
    TimeStampsData?: Timestamps[],
    Type: "Loaded" | "Loading"
}

interface Timestamps {
    Time?: string,
    NameOfEvent?: string,
    TotalTimeConsumption?: string,
    PriceType?: string,
    EventDescription?: string,
}

export function PlanDay(props: DayStyle) {
    return <>
        {props.Type == "Loaded"
            ? <div className="animate-in slide-in-from-left duration-700">
                <div className="flex flex-col md:flex-row justify-start items-start md:items-center">
                    <div className="bg-blue-500 rounded-3xl p-[1.2rem] shadow-lg shadow-blue-100 flex flex-col items-center justify-center min-w-[5rem]">
                        <div className="font-black text-[0.6rem] text-blue-100 uppercase">DAY</div>
                        <div className="text-white font-black text-[2.2rem] leading-none">{props.DayNumber && props.DayNumber < 10 ? `0${props.DayNumber}` : props.DayNumber}</div>
                    </div>
                    <div className="flex flex-col mt-4 md:mt-0 ml-0 md:ml-6">
                        <div className="font-black text-2xl md:text-3xl text-slate-900 uppercase tracking-tighter">{props.NameOfPlanDay}</div>
                        <div className="text-slate-400 font-bold text-sm tracking-widest uppercase">{props.Date}</div>
                    </div>
                </div>
                <div className="ml-6 md:ml-16 border-l-2 border-slate-100 pl-6 md:pl-10 py-8">
                    {props.TimeStampsData?.map((day: any, idx: number) => (
                        <TimeCard 
                            key={idx}
                            PlanName={day.NameOfEvent} 
                            Time={day.Time} 
                            TotalTimeConsumption={day.TotalTimeConsumption} 
                            MoneyType={day.PriceType} 
                            PlanDescription={day.EventDescription} 
                            Type="Loaded" 
                        />
                    ))}
                </div>
            </div>
            : <div className="h-40 w-full bg-slate-50 animate-pulse rounded-3xl mb-10" />
        }
    </>
}