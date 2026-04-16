import { TimeCard } from "./TimeCard"

interface DayStyle{
    DayNumber : number , 
    NameOfPlanDay : string , 
    Date : string , 
    TimeStampsData ?: [Timestamps] 
}

interface Timestamps {
    Time : string , 
    PlanName : string , 
    ConsumptionTotalTime : string , 
    MoneyType : string  ,
    DescriptionName : string
}

export function PlanDay(props : DayStyle)
{
    return<>
    <div>
        <div className="flex justify-start items-center">
            <div className="bg-blue-300 rounded-full p-[1rem]">
                <div className="font-bold text-[0.7rem] text-white flex justify-center items-center">DAY</div>
                <div className="text-white font-bold text-[2rem] flex justify-center items-center">0{props.DayNumber}</div>
            </div>
            <div className="flex justify-start items-center flex-col ml-[2rem]">
                <div className="font-semibold text-[2rem]">{props.NameOfPlanDay}</div>
                <div className="w-full flex justify-start items-center">{props.Date}</div>
            </div>
        </div>
        <div className="ml-[6rem] mb-[4rem]">
            <TimeCard PlanName="Arrive at Narita Airport" Time="9:00 AM" TotalTimeConsumption="1.5" MoneyType="Free" PlanDescription="Meet your private chauffeur at the arrivals hall. Your concierge will handle your luggage and coordinate the express transfer to the hotel via the scenic TokyoBay route. "/>
        </div>
    </div>
    </>
}