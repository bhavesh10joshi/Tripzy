import { Navbar } from "../Components/Navabar";
import { Button } from "../Ui/Buttons/Button";
import { DoubleCheck } from "../Ui/Icons/DoubleCheck";
import { useState } from "react";
export function Notifictions()
{
    const [EmptyState] = useState(true); 
    return <>
        <Navbar/>
        <div className="pl-[12rem] pr-[12rem] rounded-md">
            <div className="bg-slate-100 p-[2rem]">
                <div className={!EmptyState ?`flex` :``}>
                    <div className="flex justify-start items-center flex-col w-2/4">
                        <div className="flex justify-start items-center w-full font-bold text-[3rem]">Notifications</div>
                        <div className="flex justify-start items-center w-full font-light">Stay updated on your collaborative journey</div>
                    </div>
                    {
                        !EmptyState
                        ?<div className="flex justify-end items-center w-2/4">
                            <Button text="Mark all as Read" color="white" textColor="blue" size="secondry" FrontIcon={<DoubleCheck/>}/>
                        </div>
                        :<div className="flex justify-center items-center text-[10rem] text-slate-300 font-extrabold w-full h-[30rem]">
                            Empty 
                        </div>
                    }
                </div>
                <div></div>
            </div>
        </div>
    </>
}