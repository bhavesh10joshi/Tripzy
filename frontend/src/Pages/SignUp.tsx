import aeroplane from "../Images/aeroplane.png";
import { useRef, useState, useEffect } from "react";
import { Backend_Url } from "../BackendUrl/BackendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Validations } from "../Validations/ZodValidations";

export function SignUp() {
    const [ErrorState, SetErrorState] = useState(false);
    const [LoadingState, SetLoadingState] = useState(false);
    const [ErrorDetail, SetErrorDetail] = useState("Network Error");
    const [ConfirmPasswordSame, SetConfirmPassword] = useState(false);
    const [Password, SetPassword] = useState("");
    const [ConfirmPassword, SetconfirmPassword] = useState("");
    const [SuccessState, SetSuccessState] = useState(false);

    const PasswordRef = useRef<HTMLInputElement>(null);
    const ConfirmPasswordRef = useRef<HTMLInputElement>(null);
    const EmailRef = useRef<HTMLInputElement>(null);
    const Nameref = useRef<HTMLInputElement>(null);
    const Navigation = useNavigate();

    useEffect(() => {
        if (SuccessState) {
            const timeout = setTimeout(() => {
                SetSuccessState(false);
                Navigation("/Tripzy/User/Login");
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [SuccessState, Navigation]);

    useEffect(() => {
        if (Password === ConfirmPassword && Password !== "") {
            SetConfirmPassword(true);
        } else {
            SetConfirmPassword(false);
        }
    }, [Password, ConfirmPassword]);

    useEffect(() => {
        if (ErrorState) {
            const timer = setTimeout(() => {
                SetErrorState(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [ErrorState]);

    async function Validate() {
        const CurrentPara = {
            email: EmailRef.current?.value,
            Password: PasswordRef.current?.value
        };
        const Check: any = Validations.safeParse(CurrentPara);
        if (Check.success) {
            BackendCall();
        } else {
            const msg = Check.error.issues[0]?.message || "Validation Error";
            console.log(msg);
            SetErrorDetail(msg);
            SetErrorState(true);
        }
    }

    async function BackendCall() {
        SetLoadingState(true);
        const payload = {
            email: EmailRef.current?.value,
            Password: PasswordRef.current?.value , 
            name : Nameref.current?.value
        };
        try {
            const result = await axios.post(`${Backend_Url}/Tripzy/Api/User/SignUp`, payload);
            if (result) {
                SetLoadingState(false);
                SetSuccessState(true);
            } else {
                SetErrorDetail("Network Error: Could not connect to server");
                SetErrorState(true);
                SetLoadingState(false);
            }
        } catch (e) {
            SetErrorDetail("Network Error: Could not connect to server");
            SetErrorState(true);
            SetLoadingState(false);
        }
    }

    return (
        <>
            <img 
                src={aeroplane} 
                alt="Aeroplane background" 
                className="fixed inset-0 w-full h-screen object-cover z-0" 
            />

            <div className="fixed inset-0 bg-black/20 z-10"></div>

            {ErrorState && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all">
                    <div className="bg-white p-8 rounded-xl shadow-2xl border-l-8 border-red-500 max-w-md w-full mx-4 transform animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center gap-4">
                            <div className="bg-red-100 p-3 rounded-full">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Something went wrong</h3>
                                <p className="text-gray-600 font-mono text-sm">{typeof ErrorDetail === 'string' ? ErrorDetail : "Check your inputs"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {SuccessState && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all">
                    <div className="bg-white p-8 rounded-xl shadow-2xl border-l-8 border-green-500 max-w-md w-full mx-4 transform animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Success!</h3>
                                <p className="text-gray-600 font-mono text-sm">Account created successfully. Redirecting...</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="relative z-20 flex flex-col items-center justify-center w-full min-h-screen px-4 py-10">
                <div className="bg-white h-[5rem] w-full max-w-[25rem] flex flex-col justify-center items-center rounded-lg shadow-2xl">
                    <div className="text-[1.5rem] text-blue-300 font-bold tracking-tight">TripzyAI</div>
                    <div className="flex justify-center items-center text-slate-600 text-[0.8rem] font-bold">Your Intelligent Concierge Awaits</div>
                </div>

                <div className="bg-white w-full max-w-[25rem] flex flex-col justify-center items-center rounded-lg shadow-2xl mt-[2rem] p-8">
                    <div className="text-black text-[1.3rem] flex justify-start items-center w-full font-bold">Create an Account</div>
                    <div className="w-full flex justify-start items-center font-mono text-slate-800 text-[0.8rem]">Join the Community of Million Explorers</div>
                    
                    <div className="text-slate-800 text-[0.9rem] font-mono mt-[2rem] w-full text-left">Name</div>
                    <input 
                        type="name" 
                        aria-label="name"
                        placeholder="John Doe"
                        className="rounded-md w-full h-[2.5rem] border border-slate-300 mt-2 px-4 font-mono text-blue-400 focus:outline-none focus:border-blue-300" 
                        ref={Nameref}
                    />

                    <div className="text-slate-800 text-[0.9rem] font-mono mt-[1rem] w-full text-left">Email Address</div>
                    <input 
                        type="email" 
                        aria-label="Email Address"
                        placeholder="email@example.com"
                        className="rounded-md w-full h-[2.5rem] border border-slate-300 mt-2 px-4 font-mono text-blue-400 focus:outline-none focus:border-blue-300" 
                        ref={EmailRef}
                    />
                    
                    <div className="text-slate-800 text-[0.9rem] font-mono mt-[1rem] w-full text-left">Password</div>
                    <input 
                        type="password" 
                        aria-label="Password"
                        placeholder="••••••••"
                        className="rounded-md w-full h-[2.5rem] border border-slate-300 mt-2 px-4 font-mono text-blue-400 focus:outline-none focus:border-blue-300" 
                        ref={PasswordRef} 
                        onChange={(e) => SetPassword(e.target.value)}
                    />
                    
                    <div className="font-mono text-[0.9rem] mt-[1rem] w-full flex justify-between items-center">
                        <span className="text-slate-800">Confirm Password</span>
                        {!ConfirmPasswordSame && Password !== "" && <span className="text-red-500 font-bold text-[0.7rem]">Not matching!</span>}
                    </div>
                    <input 
                        type="password" 
                        aria-label="Confirm Password"
                        placeholder="••••••••"
                        className="rounded-md w-full h-[2.5rem] border border-slate-300 mt-2 px-4 font-mono text-blue-400 focus:outline-none focus:border-blue-300" 
                        ref={ConfirmPasswordRef} 
                        onChange={(e) => SetconfirmPassword(e.target.value)}
                    />

                    <button 
                        disabled={LoadingState}
                        className="bg-blue-300 text-white w-full h-[3rem] rounded-md font-bold mt-8 hover:bg-blue-400 transition-colors flex justify-center items-center disabled:opacity-50" 
                        onClick={Validate}
                    >
                        {!LoadingState ? "Submit" : (
                            <svg className="w-6 h-6 animate-spin text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                    </button>
                    
                    <div className="flex justify-center items-center mt-6">
                        <span className="text-slate-600 text-[0.9rem] font-mono">Already have Account?</span>
                        <button className="ml-2 text-[0.9rem] font-mono text-blue-400 hover:text-blue-600 font-bold" onClick={() => Navigation("/Tripzy/User/Login")}>SignIn</button>
                    </div>
                </div>
            </div>
        </>
    );
}