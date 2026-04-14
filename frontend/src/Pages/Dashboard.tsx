import { Navbar } from "../Components/Navabar";
import { Hero } from "../Components/HeroSection";
import { RecentTrips } from "../Components/RecentTrips";
import { Footer } from "../Components/Footer";

export function Dashbaord()
{
    return<>
        <div className="w-full h-full ">
            <Navbar/>
            <div>
                <Hero/>
            </div>
            <div>
                <RecentTrips/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    </>
}