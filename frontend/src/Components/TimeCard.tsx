import { Cash } from "../Ui/Icons/Cash"
import { Clock } from "../Ui/Icons/Clock"

interface TimeCardStyle
{
    Time : string ,
    TotalTimeConsumption : string ,
    MoneyType : string , 
    PlanName : string , 
    PlanDescription : string
}

export function TimeCard(props : TimeCardStyle)
{
    return<>
    <div className="flex ml-[2rem]">
        <div className="w-[0.5rem] h-[18rem] bg-blue-300 mt-[2rem]"></div>
        <div className="bg-slate-200 rounded-md p-[2rem] w-[70rem] h-[18rem] gap-12 mt-[2rem] flex justify-center items-center">
            <div className="flex justify-start items-start flex-col w-1/4">
                <div className="w-full text-blue-300 font-bold text-[1.5rem] flex justify-start items-center">
                    {props.Time}
                </div>
                <div className="w-full flex justify-start items-center mt-[1rem]">
                    <div className=" gap-3 bg-[#5eead4] rounded-md w-[7rem] h-[2rem] flex justify-center items-center ">
                        <Clock/>
                        <div className="text-slate-800 font-bold text-[0.7rem]">
                            {props.TotalTimeConsumption} Hours
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-start items-center mt-[1rem]">
                   <div className="gap-3 bg-white rounded-md w-[5rem] h-[2rem] flex justify-center items-center ">
                         <Cash/>
                        <div className="text-blue-300 font-bold text-[0.8rem]">
                            {props.MoneyType}
                        </div>
                   </div>
                </div>
            </div>
            <div className="w-3/4 flex justify-center items-start flex-col">
                <div className="text-black font-bold text-[1.7rem]">
                    {props.PlanName}
                </div>
                <div className="text-black font-light text-[1.2rem] mt-[2rem]">
                    {props.PlanDescription}
                </div>
            </div>
        </div>
    </div>
    </>
}