import { Button } from "../Ui/Buttons/Button"
import { Calender } from "../Ui/Icons/Calender"
import { Bin } from "../Ui/Icons/Bin"

interface DataStye
{
    NameofItienary : string , 
    Date : string , 
    ImageOfthePlan : string ,
    PlanDescription : string 
}

export function PastPlannedTrips(props:DataStye)
{
    return<>
    <button className="w-full">
        <div className="bg-slate-100 p-[2rem] flex rounded-md mt-[2rem] w-full">
            <img src={props.ImageOfthePlan} alt={props.NameofItienary} className=" h-[30rem] rounded-md "/>
            <div className="ml-[2rem]">
                <div className="w-full flex justify-end items-center ">
                    <div className="bg-white rounded-md w-[4rem] h-[3rem] flex justify-center items-center">
                       <button aria-label="name">
                            <Bin/>
                       </button>
                    </div>
                </div>
                <div className="text-[3rem] mt-[1rem] font-bold flex justify-start items-center">
                    {props.NameofItienary}
                </div>
                <div className="flex justify-start items-center">
                    <Calender/>
                    <div className="text-blue-300 font-bold flex justify-start items-center ml-[0.5rem]">
                        {props.Date}
                    </div>
                </div>
                <div className="flex justify-start items-center text-slate-600 font-bold mt-[2rem] w-full">
                    <div className="w-[40rem] text-start">
                        {props.PlanDescription}
                    </div>
                </div>
                <div className="flex justify-start items-center mt-[5rem]">
                    <Button size="secondry" text="View Full Plan" color="blue" textColor="white"/>
                </div>
            </div>
        </div>
    </button>

    </>
}