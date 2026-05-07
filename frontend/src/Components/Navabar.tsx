import "../index.css"
import { Button } from "../Ui/Buttons/Button"
import avatar from "../Images/avatar.jpg"
import { useNavigate } from "react-router-dom"
export function Navbar()
{
    const Navigation = useNavigate();
    return<>
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8 px-4 md:pl-[3rem] md:pr-[3rem] py-4 md:pt-[2rem] md:pb-[2rem]">
            <div className="flex justify-between items-center w-full md:w-auto">
                <button onClick={() => Navigation("/Tripzy/User/Dashboard")} className="hover:cursor-pointer">
                    <div className="flex justify-center items-center text-blue-500 font-bold text-[1.7rem] ">
                        Tripzy AI
                    </div>
                </button>
                {/* On mobile, we can keep the profile/logout here or keep it at the end. For simplicity, we stack them all. */}
            </div>

            <div className="flex justify-center items-center text-[0.9rem] gap-4 pl-0 md:pl-[2rem] font-semibold text-slate-500">
                <button className="hover:text-blue-300" onClick={() => Navigation("/Tripzy/User/Plan/NewTrip")}>New Trips</button>
                <button className="hover:text-blue-300" onClick={() => Navigation("/Tripzy/User/MyTrips/View/All")}>My Trips</button>
            </div>
            {/* here comes the avatar/username for the user */}
            <div className="flex-1 flex justify-center md:justify-end items-center mt-2 md:mt-0">
                <div className="flex justify-end items-center">
                    <Button size="primary" text="LogOut" textColor="white" color="blue" OnClick={() => {
                        localStorage.clear();
                        Navigation("/");
                    }}/>
                    <div className="flex justify-center items-center ml-[1rem] md:ml-[2rem] rounded-full border border-slate-600 p-[0.5rem]">
                        <img src={avatar} alt="avatarlogo" className="flex justify-center items-center w-[2rem] h-[2rem]" />
                    </div>
                </div>
            </div>
        </div>
        <div className="h-[0.5rem] w-full px-4 md:pl-[1rem] md:pr-[1rem]">
                <div className="h-[0.1rem] w-full bg-slate-300"></div>
        </div>
    </>   
}