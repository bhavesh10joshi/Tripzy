import { Navbar } from "../Components/Navabar";
import { Hero } from "../Components/HeroSection";

export function Dashbaord()
{
    return<>
        <div className="w-full h-full ">
            <Navbar/>
            <div className="h-[0.5rem] w-full pl-[1rem] pr-[1rem]">
                <div className="h-[0.1rem] w-full bg-slate-300"></div>
            </div>
            <div>
                <Hero/>
            </div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </>
}