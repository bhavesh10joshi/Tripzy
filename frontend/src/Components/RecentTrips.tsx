import { Button } from "../Ui/Buttons/Button"
import { Arrow } from "../Ui/Icons/Arrow"
import baali from "../Images/baali.jpg"
import jodhpur from "../Images/jodhpur.jpg"
import { Calender } from "../Ui/Icons/Calender"
import Russia from "../Images/Russia.jpg"

export function RecentTrips()
{
    return<>
        <div className="mt-[8rem] pl-[7rem] pr-[7rem] w-full">
            <div className="flex w-full">
                <div>
                    <div className="text-black font-semibold text-[1.7rem]">Recent Trips</div>
                    <div className="text-slate-700 font-[0.9rem] ">Continue Planning your upcoming trips</div>
                </div>
                <div className="flex-1 ">
                    <div className="w-full flex justify-end items-center">
                        <Button text="View all Activity" color="white" textColor="blue" size="secondry" BackIcon={<Arrow/>}/>
                    </div>
                </div>
            </div>
            <div className="flex  mt-[3rem] pb-[2rem]">
                <button aria-label="name" className="hover:animate-[bounce_1.5s_ease-in-out_infinite]">
                    <div className=" shadow-lg shadow-slate-900/50">
                        <div>
                            <img src={baali} alt="baalibeachesimage" className="rounded-t-lg"/>
                        </div>
                        <div className=" pt-[2rem] pr-[2rem] pl-[2rem] pb-[2rem]">
                            <div className="flex">
                                <div>
                                    <Calender/>
                                </div>
                                <div className="font-mono font-bold text-slate-600 ml-[1rem]">
                                    oct 12 - oct 24 , 2024
                                </div>
                            </div>
                            <div className="mt-[1rem] text-[1.4rem] font-semibold text-slate-800 flex justify-start">
                                Baali Beaches
                            </div>
                        </div>
                    </div>
                </button>
                <div className="pl-[2rem] pt-[2rem] flex-1 flex-col">
                    <button aria-label="name" className="flex hover:animate-bounce">
                        <div>
                            <img src={jodhpur} alt="Jodhpurimage" className="w-[7rem] h-[7rem] rounded-md"/>
                        </div>
                        <div className="ml-[2rem] flex justify-center items-center flex-col">
                            <div className="text-[1rem] text-slate-500 font-mono">
                                Nov 28 - Nov 30
                            </div>
                            <div className="text-[1.3rem] font-semibold text-slate-700">
                                Jodhpur , India
                            </div>
                        </div>
                    </button>
                    <button aria-label="name" className="flex mt-[2rem] hover:animate-bounce">
                        <div>
                            <img src={Russia} alt="Jodhpurimage" className="w-[7rem] h-[7rem] rounded-md"/>
                        </div>
                        <div className="ml-[2rem] flex justify-center items-center flex-col">
                            <div className="text-[1rem] text-slate-500 font-mono">
                                Nov 28 - Nov 30
                            </div>
                            <div className="text-[1.3rem] font-semibold text-slate-700">
                                Moscow , Russia
                            </div>
                        </div>
                    </button>
                    <button aria-label="name" className="mt-[3rem] rounded-md bg-blue-200 border border-blue-300 h-[2rem] w-full hover:animate-bounce">
                        <div className="flex justify-center items-center text-[1rem] font-mono font-semibold text-blue-300 h-full w-full">
                            See All
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </>
}