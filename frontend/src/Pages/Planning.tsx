import { Plane } from "../Ui/Icons/Plane"
import aeroplane from "../Images/aeroplane.png"
import { GeminiAi } from "./GeminiAi"

export function Planning()
{
    return<>
        <img 
            src={aeroplane} 
            alt="bgimage" 
            className="absolute inset-0 w-full h-screen object-cover z-0" 
        />
        <div className="absolute inset-0 bg-black/20 z-10"></div>

        <div className="relative z-20 flex flex-col items-center justify-center w-full h-screen px-4">
            
            <div className="bg-white h-[37rem] w-[40rem] flex flex-col justify-center items-center rounded-lg shadow-2xl p-[2rem]">
                <div className="p-[1rem] border border-slate-200 rounded-full flex justify-center items-center bg-slate-200 animate-ping">
                    <Plane/>
                </div>
                <div className="text-slate-800 text-[2.2rem] mt-[6rem] font-bold text-center">
                    <span className="italic text-blue-300">Tripzy</span> is crafting Your perfect gateway ...
                </div>
                <div className="text-slate-500 font-bold text-center mt-[1rem] text-[0.9rem] ml-[2rem] mr-[2rem] italic">Analyzing thousands of routes , hidden gems , and local secrets to curate a journey just for you.</div>
                <div className="bg-blue-300 h-[0.5rem] w-[15rem] flex justify-center items-center rounded-full mt-[2rem]"></div>
                <div className="flex justify-center items-center gap-2 mt-[1rem]">
                    <div className="flex justify-center items-center italic text-blue-300 font-bold text-[0.8rem] ">AI Engine Active</div>
                    <GeminiAi/>
                </div>
            </div>
        </div>
    </>
}