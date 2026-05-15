import { Navbar } from "../Components/Navabar";
import { Footer } from "../Components/Footer";
import { Link } from "../Ui/Icons/Link";
import { ViewEye } from "../Ui/Icons/Eye";
import { IconEdit } from "../Ui/Icons/Edit";

export function MyTripShare()
{
    
    return<>
        <Navbar/>
        <div className="bg-slate-100 pl-[2rem] pr-[2rem] mt-[-0.5rem]">
            <div className="w-full flex">
                <div className="w-2/4 w-full">
                    <div className="text-[3rem] text-black flex justify-start items-center font-bold mt-[3rem]">
                        Sharing & Collaboration
                    </div>
                    <div className="font-mono text-slate-500 text-[0.9rem] flex justify-start items-center">
                        Start sharing your Planned trip with your friends, family or relatives
                    </div>
                </div>
            </div>
            <div className="flex gap-10 w-full mt-[3rem]">
                <div className="w-2/6 w-full p-[2rem] bg-white rounded-[2rem]">
                    <div className="text-[1.5rem] w-full flex justify-start items-center font-semibold">
                        Share Link
                    </div>
                    <div className="w-full h-[4rem] bg-slate-200 rounded-lg mt-[2rem] flex">
                        <div className="w-1/8 flex justify-center items-center w-full ml-[-4rem]"><Link/></div>
                        <div className="w-5/8 w-full ml-[-4rem] text-blue flex justify-start items-center ">Https://www.TripzyAI</div>
                        <div className="w-2/8 text-blue-300 font-mono font-semibold flex justify-center items-center w-full mr-[-3rem]"><button>Copy</button></div>
                    </div>
                    <div className="w-full mt-[2rem]">
                        <div className="text-slate-500 font-semibold font-mono flex justify-start items-center">PRIVACY SETTINGS</div>
                        <button aria-label="Link Setting Button" className="mt-[2rem] flex w-full">
                            <div className="w-1/8 w-full flex">
                                <div className="bg-green-100 w-[3rem] h-[3rem] rounded-full flex justify-center items-center"> 
                                    <ViewEye/>
                                </div>
                            </div>
                            <div className="w-7/8 place-items-start ml-[1rem] w-full ml-[-17rem]">
                                <div className="font-semibold flex justify-start w-full items-center">
                                    Anyone with Link
                                </div>
                                <div className="text-slate-700 font-light text-[0.8rem] flex justify-start items-center w-full">
                                    Can view the Itinerary
                                </div>
                            </div>
                        </button>
                        <button aria-label="Link Setting Button" className="mt-[2rem] flex w-full">
                            <div className="w-1/8 w-full flex">
                                <div className="bg-blue-100 w-[3rem] h-[3rem] rounded-full flex justify-center items-center"> 
                                    <IconEdit/>
                                </div>
                            </div>
                            <div className="w-7/8 place-items-start ml-[1rem] w-full ml-[-17rem]">
                                <div className="font-semibold flex justify-start w-full items-center">
                                    Anyone with Link
                                </div>
                                <div className="text-slate-700 font-light text-[0.8rem] flex justify-start items-center w-full">
                                    Can edit activities
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="w-4/6 w-full p-[2rem] bg-slate-200 rounded-[2rem]">
                    <div className="flex">
                        <div className="text-[1.5rem] text-black font-semibold w-3/6 w-full flex justify-start items-center">Trip Overview</div>
                        <div className="w-3/6 w-full flex justify-end items-end">
                            <div className="flex justify-center items-center bg-green-200 text-green-800 font-bold pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] rounded-full">
                                ACTIVE
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[0.01rem] bg-slate-500 mt-[2rem] rounded-full"></div>
                    <div>
                        <div>
                            <div></div>
                            <div></div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>
}