import Globe from "../Images/Globe.png"
import { Button } from "../Ui/Buttons/Button"
import { Rocket } from "../Ui/Icons/Rocket"
import { useNavigate } from "react-router-dom"

export function Hero() {
    const Navigation = useNavigate();

    return (
        <>
            <div className="gap-12 h-full flex flex-col md:flex-row justify-center items-center mt-[2rem] pl-4 pr-4 md:pl-[5rem] md:pr-[5rem] bg-slate-100 pt-[3rem] pb-[3rem] ml-4 mr-4 md:ml-[2rem] md:mr-[2rem] rounded-md overflow-hidden">
                <div className="animate-in fade-in slide-in-from-left-8 duration-1000 ease-out flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="text-green-700 bg-green-300 w-full max-w-[20rem] rounded-xl flex justify-center items-center text-[0.7rem] font-bold pt-[0.2rem] pb-[0.2rem] animate-pulse">
                        AI POWERED TRAVEL INTELLIGENCE
                    </div>
                    
                    <div className="relative mt-4">
                        <div className="text-black font-bold text-[3rem] md:text-[5rem] leading-tight">The World is </div>
                        <div className="mt-[-0.5rem] md:mt-[-1rem] leading-tight">
                            <span className="italic text-blue-800 font-bold text-[3rem] md:text-[5rem] animate-pulse">Breathing</span>
                            <span className=" text-black font-bold text-[3rem] md:text-[5rem]">. Explore</span>
                        </div>
                        <div className=" text-black font-bold text-[3rem] md:text-[5rem] mt-[-0.5rem] md:mt-[-1rem] leading-tight">it.</div>
                    </div>

                    <div className="text-slate-500 font-bold w-full max-w-[25rem] mt-4">
                        Move beyond itineraries. Experience bespoke journeys curated by artificial intelligence and refined by your personal taste.
                    </div>

                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center mt-[3rem] gap-6 md:gap-10 w-full">
                        <div className="transition-all duration-300 transform hover:scale-110 active:scale-95 w-full md:w-auto">
                            <Button 
                                color="blue" 
                                size="secondry" 
                                textColor="white" 
                                text="Plan Your Next Trip" 
                                BackIcon={<Rocket/>} 
                                OnClick={() => Navigation("/Tripzy/User/Plan/NewTrip")}
                            />
                        </div>
                        <div className="transition-all duration-300 transform hover:scale-110 active:scale-95 w-full md:w-auto">
                            <Button 
                                color="grey" 
                                size="secondry" 
                                textColor="black" 
                                text="View Showcase" 
                                OnClick={() => Navigation("/Tripzy/User/MyTrips/View/All")}
                            />
                        </div>
                    </div>
                </div>

                <div className="relative mt-8 md:mt-0 w-full flex justify-center md:w-auto">
                    <img 
                        src={Globe} 
                        alt="GlobeImage" 
                        className="w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem] rounded-xl shadow-2xl shadow-slate-900/40 
                                   transition-transform duration-700 hover:rotate-0 object-cover"
                        style={{
                            animation: 'float 6s ease-in-out infinite, slowRotate 20s linear infinite'
                        }}
                    />
                    <div className="absolute inset-0 bg-blue-400/10 blur-[100px] rounded-full -z-10 animate-pulse"></div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(3deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes slowRotate {
                    from { filter: hue-rotate(0deg) brightness(1); }
                    to { filter: hue-rotate(10deg) brightness(1.1); }
                }
            `}</style>
        </>
    );
}