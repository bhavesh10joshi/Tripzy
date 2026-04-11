import Globe from "../Images/Globe.png"
import { Button } from "../Ui/Buttons/Button"
import { Rocket } from "../Ui/Icons/Rocket"

export function Hero()
{
    return<>
        <div className="gap-12 h-full flex justify-center items-center mt-[2rem] pl-[5rem] pr-[5rem] bg-slate-100 pt-[3rem] pb-[3rem] ml-[2rem] mr-[2rem] rounded-md">
            <div>
                <div className="text-green-700 bg-green-300 w-[20rem] rounded-xl flex justify-center items-center text-[0.7rem] font-bold pt-[0.2rem] pb-[0.2rem]">
                    AI POWERED TRAVEL INTELLIGENCE
                </div>
                <div>
                    <div className="text-black font-bold text-[5rem]">The World is </div>
                    <div className="mt-[-2rem]">
                        <span className="italic text-blue-800 font-bold text-[5rem]">Breathing</span>
                        <span className=" text-black font-bold text-[5rem]">. Explore</span>
                    </div>
                    <div className=" text-black font-bold text-[5rem] mt-[-2rem]">it.</div>
                </div>
                <div className="text-slate-500 font-bold w-[25rem]">
                    Move beyond itineraries. Experience bespoke journeys curated by artificial intelligence and refined by your personal taste.
                </div>
                <div className="flex justify-start items-center mt-[3rem] gap-10">
                    <div>
                        <Button color="blue" size="secondry" textColor="white" text="Plan Your Next Trip" BackIcon={<Rocket/>}/>
                    </div>
                    <div>
                        <Button color="grey" size="secondry" textColor="black" text="View Showcase" />
                    </div>
                </div>
            </div>
            <div>
                <img src={Globe} alt="GlobeImage" className="w-[30rem] h-[30rem] rounded-xl rotate-[3deg] shadow-lg shadow-slate-900/50"/>
            </div>
        </div>
    </>   
}