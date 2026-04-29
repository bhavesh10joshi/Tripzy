import { TimeCard } from "./TimeCard"

interface DayStyle{
    DayNumber ?: number , 
    NameOfPlanDay ?: string , 
    Date ?: string , 
    TimeStampsData ?: [Timestamps] , 
    Type : "Loaded" | "Loading" 
}

interface Timestamps {
    Time ?: string , 
    PlanName ?: string , 
    ConsumptionTotalTime ?: string , 
    MoneyType ?: string  ,
    DescriptionName ?: string , 
}

export function PlanDay(props : DayStyle)
{
    return<>
    {
        props.Type == "Loaded"
        ?<div>
        <div className="flex justify-start items-center">
            <div className="bg-blue-300 rounded-full p-[1rem]">
                <div className="font-bold text-[0.7rem] text-white flex justify-center items-center">DAY</div>
                <div className="text-white font-bold text-[2rem] flex justify-center items-center ">0{props.DayNumber}</div>
            </div>
            <div className="flex justify-start items-center flex-col ml-[2rem]">
                <div className="font-semibold text-[2rem]">{props.NameOfPlanDay}</div>
                <div className="w-full flex justify-start items-center">{props.Date}</div>
            </div>
        </div>
        <div className="ml-[4rem] mb-[4rem]">
            <TimeCard PlanName="Arrive at Narita Airport" Time="9:00 AM" TotalTimeConsumption="1.5" MoneyType="Free" PlanDescription="Meet your private chauffeur at the arrivals hall. Your concierge will handle your luggage and coordinate the express transfer to the hotel via the scenic TokyoBay route. " Type="Loaded"/>
        </div>
        </div>
        :<div>
        <div className="flex justify-start items-center">
            <div className="bg-blue-300 rounded-full p-[1rem] animate-pulse w-[5rem] h-[7rem]">
            </div>
            <div className="flex justify-start items-center flex-col ml-[2rem]">
                <div className="font-semibold text-[2rem] bg-slate-400 animate-pulse rounded-md w-[17rem] h-[5rem]"></div>
                <div className="w-full">
                    <div className="flex justify-start items-center bg-slate-400 animate-pulse rounded-md w-[12rem] h-[2rem] mt-[1rem]"></div>
                </div>
            </div>
        </div>
        <div className="ml-[4rem] mb-[4rem]">
            <TimeCard Type="Loading"/>
        </div>
        </div>
    }
    </>
}