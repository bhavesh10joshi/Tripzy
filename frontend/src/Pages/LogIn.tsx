import { useState } from "react";
import aeroplane from "../Images/aeroplane.png"
import { useRef } from "react";
import axios from "axios";
import { Backend_Url } from "../BackendUrl/BackendUrl";
import { useNavigate } from "react-router-dom";

export function LogIn() {
    const [ErrorState , SetErrorState] = useState(false);
    const [LoadingState , SetLoadingState] = useState(false);
    const [ErrorDetail , SetErrorDetail] = useState("");
    const EmailRef:any = useRef(null);
    const PasswordRef:any = useRef(null);
    const Navigation = useNavigate();

    async function BackendCall()
    {
        SetLoadingState(true);
        const payload:any = {
            email : EmailRef.current.value , 
            password : PasswordRef.current.value
        }
        try{
            const result = await axios.post(`${Backend_Url}` , payload);
            if(result)
            {
                SetLoadingState(false);
                localStorage.setItem("token", result.data.token);
                Navigation("/Tripzy/User/Dashbaord");
            } 
            else
            {
                SetErrorState(true);
                setTimeout(function()
                {
                    Navigation("/Tripzy/User/Login");
                },2000);
                return;
            }
        }
        catch(e)
        {
            SetErrorState(true);
            setTimeout(function()
            {
                Navigation("/Tripzy/User/Login");
            },2000);
            return;
        }
    }

    return (
        <>
            <img 
                src={aeroplane} 
                alt="bgimage" 
                className="absolute inset-0 w-full h-screen object-cover z-0" 
            />
            <div className="absolute inset-0 bg-black/20 z-10"></div>

            <div className="relative z-20 flex flex-col items-center justify-center w-full h-screen px-4">
                {
                !ErrorState
                ?<div>
                <div className="bg-white h-[5rem] w-[25rem] flex flex-col justify-center items-center rounded-lg shadow-2xl">
                    <div className="text-[1.5rem] text-blue-300 font-bold tracking-tight">
                        TripzyAI
                    </div>
                    <div className="flex justify-center items-center text-slate-600 text-[0.8rem] font-bold">
                        Your Intelligent Concierge Awaits
                    </div>
                </div>
                <div className="bg-white h-[25rem] w-[25rem] flex flex-col justify-center items-center rounded-lg shadow-2xl mt-[2rem] pt-[2rem] pb-[2rem] pl-[2rem] pr-[2rem]">
                    <div className="text-black text-[1.3rem] flex justify-start items-center w-full font-bold">
                        Sign In
                    </div>
                    <div className="text-slate-800 text-[0.9rem] font-mono mt-[2rem] w-full flex justify-start items-center">
                        Email Address
                    </div>
                    <div className="w-full flex justify-start items-center mt-[0.5rem]">
                        <input type="email" aria-label="name" className="rounded-md w-full h-[2rem] border border-slate-700 pl-[1rem] pr-[1rem] font-mono text-blue-300"/>
                    </div>
                    <div className="text-slate-800 text-[0.9rem] font-mono mt-[1rem] w-full flex justify-start items-center">
                        Password
                    </div>
                    <div className="w-full flex justify-start items-center mt-[0.5rem]">
                        <input type="password" aria-label="name" className="rounded-md w-full h-[2rem] border border-slate-700 pl-[1rem] pr-[1rem] font-mono text-blue-300"/>
                    </div>
                    <div className="mt-[1rem] w-full h-full">
                            <button className={`bg-blue-300 text-white w-full h-[3rem] rounded-md font-bold mt-[1rem] hover:animate-[bounce_1.5s_ease-in-out_infinite]`} onClick={() => BackendCall()}>
                                {
                                    !LoadingState
                                    ?"Submit"
                                    : 
                                        <div className="w-full h-full flex justify-center items-center">
                                            <svg aria-hidden="true" className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                        </div>
                                }
                            </button>                    </div>
                    <div className="flex justify-center items-center">
                        <div className="text-slate-600 text-[0.95rem] font-mono font-bold">
                            New to Tripzy? 
                        </div>
                        <div>
                            <button className="ml-[1rem] text-[0.95rem] font-mono text-blue-300 hover:text-black font-bold" onClick={function(){Navigation("/Tripzy/User/SignUp");}}>SignUp</button>
                        </div>
                    </div>
                </div></div>
                :<div className="bg-white h-[10rem] w-[30rem] flex flex-col justify-center items-center rounded-lg shadow-2xl font-bold">
                    {ErrorDetail}
                </div>    
            }
            </div>
        </>
    );
}