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
        <div className="bg-blue-100 rounded-md p-[2rem] w-[60rem] h-[12rem] gap-12 mt-[2rem]">
            <div className="flex justify-start items-center flex-col w-1/4">
                <div className="w-full text-blue-300 font-semibold text-[1.2rem] flex justify-start items-center">
                    {props.Time}
                </div>
                <div className="w-full flex justify-start items-center mt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className="p-[0.5rem] gap-3 bg-[#5eead4] rounded-md w-full">
                        <Clock/>
                        <div>
                            {props.TotalTimeConsumption} Hours
                        </div>
                    </div>
                </div>
                <div>
                    <Cash/>
                    <div>
                        {props.MoneyType}
                    </div>
                </div>
            </div>
            <div className="w-3/4">
                <div></div>
                <div></div>
            </div>
        </div>
    </>
}