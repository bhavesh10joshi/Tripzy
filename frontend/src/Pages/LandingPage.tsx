import { Button } from "../Ui/Buttons/Button"
import LPPhoto from "../Images/LPPhoto.png"
import { AIMagic } from "../Ui/Icons/AIMagic"
import { Collab } from "../Ui/Icons/Collaboration"
import { WritePlan } from "../Ui/Icons/WritePlan"

export function LandingPage()
{
    return <>
        <div className="pt-[1rem] pb-[2rem]">
            <div className="flex w-full pl-[2rem] pr-[2rem] ">
                <div className="text-blue-300 flex justify-center items-center w-4/8 text-[1.7rem] font-bold">TripzyAI</div>
                <div className="flex justify-end items-center w-full">
                    <Button text="SignIn" textColor="grey" color="white" size="middle"/>
                    <Button text="Start Planning" textColor="white" color="blue" size="middle"/>
                </div>
            </div>
            <div className="bg-slate-100 pl-[2rem] pr-[2rem] mt-[2rem]">
                <div className="flex pt-[5rem]">
                    <div className="w-4/8 pt-[3rem] pr-[3rem]">
                        <div className="pr-[17rem]">
                            <div className="flex text-start font-bold text-[5rem] leading-tight">The Future of Travel </div>
                            <div className="flex text-start font-bold text-[5rem] leading-tight">is<span className="flex text-start font-bold text-[5rem] text-blue-300 italic ml-[1rem] animate-pulse">Personal</span></div>
                        </div>
                        <div className="text-[1.2rem] mt-[2rem] font-light">Experience an Intelligent Concierge that learns your unique taste , curating bespoke journeys that evolve with every step you take.</div>
                        <div className="flex justify-start items-center gap-10 mt-[2rem]">
                            <Button text="Experience the Future" textColor="grey" color="grey" size="secondry"/>
                            <Button text="Get Started" textColor="white" color="blue" size="secondry"/> 
                        </div>
                    </div>
                    <img className="w-[40rem] h-[40rem] md:w-[37rem] md:h-[40rem] rounded-xl shadow-2xl shadow-slate-900/40 
                                   transition-transform duration-700 hover:rotate-0 object-cover"
                        style={{
                            animation: 'float 6s ease-in-out infinite, slowRotate 20s linear infinite'
                        }} src={LPPhoto} alt="Sample Hotel Image" />
                </div>
                <div className="flex justify-center items-center flex-col mt-[7rem]">
                    <div className="text-[3.5rem] ">Plan, Collaborate, Explore.</div>
                    <div className="font-light">Moving Beyond the spreadsheet to an editorial-first travel philosophy.</div>
                </div>
                <div className="mt-[3rem]">
                    <div className="flex justify-center items-center gap-10">
                        <div className="bg-white rounded-md w-4/6 shadow-slate-600/50 p-[2rem]">
                            <div className="w-[3rem] h-[3rem] bg-blue-200 rounded-full flex justify-center items-center">
                                <AIMagic/>
                            </div>
                            <div>
                                <div className="text-[2rem] flex justify-start items-end mt-[1rem]">AI-Powered Discovery</div>
                                <div className="font-light flex justify-start items-end mt-[1rem]">
                                    Tell us your mood your budget , and your curiosities. Our Engine doesn't just find destinations; it architectures experiences tailored to your history.
                                </div>
                            </div>
                        </div>
                        <div className="w-2/6 bg-blue-300 p-[2rem] rounded-md shadow-blue-600/50">
                            <div className="w-[3rem] h-[3rem] bg-blue-500 rounded-full flex justify-center items-center">
                                <Collab/>
                            </div>
                            <div>
                                <div className="text-[2rem] flex justify-start items-end mt-[1rem] text-white">Live Collaboration</div>
                                <div className="font-light flex justify-start items-end mt-[1rem] text-white">
                                    Invite your Inner circle. Watch real-time as your group adjusts flight paths, swaps hotels, and votes on dining hotspots in a shared, fluid canvas. 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-[2rem] bg-white mt-[2rem] flex flex-col justify-center items-center">
                        <div className="flex justify-start items-center w-full">
                            <div className="w-[3rem] h-[3rem] bg-red-200 rounded-full flex justify-center items-center">
                                <WritePlan/>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="text-[2rem] flex justify-start items-end mt-[1rem]">Your Travel Legacy</div>
                            <div className="font-light flex justify-start items-end mt-[1rem] flex">
                                A permanent archive of your journeys. Analyze your travel trends, revisit high-resolution memories, and export professionally designed guides for friends.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-[4rem]">
                    <div className="flex justify-start items-center w-full font-mono text-blue-800">
                        VOICE OF THE TRAVELER 
                    </div>
                    <div>
                        <div>
                            The Intelligent Concierge in Action
                        </div>
                    </div>
                    <div></div>
                </div>
                <div></div>
                <div></div>
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
}