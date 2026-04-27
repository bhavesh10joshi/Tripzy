import "../index.css"
import { Button } from "../Ui/Buttons/Button"
import avatar from "../Images/avatar.jpg"
import { useNavigate } from "react-router-dom"
export function Navbar()
{
    const Navigation = useNavigate();
    return<>
        <div className="w-full h-full flex gap-8 pl-[3rem] pt-[2rem] pb-[2rem] pr-[3rem]">
            <div className="flex justify-center items-center text-blue-500 font-bold text-[1.7rem] ">
                Tripzy AI
            </div>
            <div className="flex justify-center items-center text-[0.9rem] gap-4 pl-[2rem] font-semibold text-slate-500">
                <button className="hover:text-blue-300" onClick={()=>function(){Navigation("/Tripzy/User/Plan/NewTrip")}}>New Trips</button>
                <button className="hover:text-blue-300" onClick={()=>function(){Navigation("/Tripzy/User/MyTrips/View/All");}}>My Trips</button>
            </div>
            {/* here comes the avatar/username for the user */}
            <div className="flex-1 justify-center items-end">
                <div className="flex justify-end items-center">
                    <Button size="primary" text="LogOut" textColor="white" color="blue" OnClick={()=>function(){
                        localStorage.removeItem("token");
                        Navigation("/Tripzy/User/Login");
                    }}/>
                    <div className="flex justify-center items-center ml-[2rem] rounded-full border border-slate-600 p-[0.5rem]">
                        <img src={avatar} alt="avatarlogo" className="flex justify-center items-center w-[2rem] h-[2rem]" />
                    </div>
                </div>
            </div>
        </div>
        <div className="h-[0.5rem] w-full pl-[1rem] pr-[1rem]">
                <div className="h-[0.1rem] w-full bg-slate-300"></div>
        </div>
    </>   
}