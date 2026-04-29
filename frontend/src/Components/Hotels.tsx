import { Star } from "../Ui/Icons/Stars"
import { Maps } from "../Ui/Icons/maps"
import { Location1 } from "../Ui/Icons/Location1"

interface HotelLayout {
    image ?: string , 
    price ?: number , 
    Location ?: string , 
    LinkforLocation ?: string , 
    NameOfHotel ?: string ,
    StarsOutOf5 ?: number , 
    Type : "Loading" | "Loaded" 
}
export function Hotels(props : HotelLayout) 
{
    return<>
    {
    props.Type == "Loaded"
        ?<div className="w-[23rem] min-w-[23rem] flex-shrink-0 h-[17rem] ml-[1rem] mr-[1rem]">
            <div className="flex justify-start items-center">
                <img src={props.image} alt="Hotels Images" className="rounded-t-lg w-[23rem] h-[17rem]" />
                <div className="flex justify-center items-center h-full">
                    <div className="h-full text-bold text-[0.8rem] border border-yellow-700 bg-yellow-200 rounded-md pl-[1rem] pr-[1rem] gap-2 flex order-2 mt-[-15rem] ml-[-5rem]">
                        <Star/>
                        <div className="flex justify-center items-center font-bold text-red-500">{props.StarsOutOf5}</div>
                    </div>
                </div>
            </div>
            <div className="flex mt-[1rem] pl-[1rem] pr-[1rem]">
                <div className="flex flex-col justify-center items-start">
                    <div className="font-semibold text-[1.3rem] flex justify-center items-center">{props.NameOfHotel}</div>
                    <div className="flex justify-center items-center mt-[0.3rem]">
                        <div className="flex justify-start items-center"><Location1/></div>
                        <div className="text-[0.8rem] font-semibold ml-[0.3rem]">{props.Location}</div>
                    </div>
                </div>
                <div className="flex-1 justify-center items-center flex-col">
                    <div className="text-[1.5rem] text-blue-300 font-bold flex justify-end items-center">${props.price}</div>
                    <div className=" text-[0.8rem] font-bold flex justify-end items-center">PER NIGHT</div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-[2rem]">
                <button className="flex justify-center items-center bg-slate-200 pl-[1.3rem] pr-[1.3rem] pt-[0.6rem] pb-[0.6rem] rounded-md">
                    <div><Maps/></div>
                    <div className="ml-[1rem] font-bold pl-[2rem] pr-[2rem]">View On Maps</div>
                </button>
            </div>
        </div>
    :   <div className="w-[23rem] min-w-[23rem] flex-shrink-0 h-[17rem] ml-[1rem] mr-[1rem] bg-slate-200">
            <div className="flex justify-start items-center w-[23rem] h-[17rem] animate-pulse bg-slate-400 rounded-md">
            </div>
            <div className="flex mt-[1rem] pl-[1rem] pr-[1rem]">
                <div className="flex flex-col justify-center items-start">
                    <div className="font-semibold text-[1.3rem] flex justify-center items-center animate-pulse w-[12rem] h-[3rem] bg-slate-400 rounded-md"></div>
                    <div className="flex justify-center items-center mt-[0.3rem]">
                        <div className="flex justify-start items-center"><Location1/></div>
                        <div className="text-[0.8rem] font-semibold ml-[0.3rem] animate-pulse w-[12rem] h-[2rem] bg-slate-400 rounded-md"></div>
                    </div>
                </div>
                <div className="flex-1 justify-center items-center flex-col">
                    <div className="text-[1.5rem] text-blue-300 font-bold flex justify-end items-center  animate-pulse w-[9rem] h-[3rem] bg-slate-400 rounded-md"></div>
                    <div className=" text-[0.8rem] font-bold flex justify-end items-center">PER NIGHT</div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-[2rem]">
                <button className="flex justify-center items-center bg-slate-200 pl-[1.3rem] pr-[1.3rem] pt-[0.6rem] pb-[0.6rem] rounded-md" aria-label="name">
                    <div><Maps/></div>
                    <div className="ml-[1rem] font-bold pl-[2rem] pr-[2rem]  animate-pulse w-[12rem] h-[3rem] bg-slate-400 rounded-md"></div>
                </button>
            </div>
        </div>
    }
    </>
}