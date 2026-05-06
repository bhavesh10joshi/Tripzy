import { useEffect, useState, useRef } from "react";
import aeroplane from "../Images/aeroplane.png";
import axios from "axios";
import { Backend_Url } from "../BackendUrl/BackendUrl";
import { useNavigate } from "react-router-dom";
import { Validations } from "../Validations/ZodValidations";

export function LogIn() {
    const [ErrorState, SetErrorState] = useState(false);
    const [LoadingState, SetLoadingState] = useState(false);
    const [ErrorDetail, SetErrorDetail] = useState("Network Error");
    const [WelcomeState, SetWelcomeState] = useState(false);
    
    const EmailRef = useRef<HTMLInputElement>(null);
    const PasswordRef = useRef<HTMLInputElement>(null);
    const Navigation = useNavigate();

    useEffect(() => {
        if (WelcomeState) {
            const timeout = setTimeout(() => {
                SetWelcomeState(false);
                Navigation("/Tripzy/User/Dashboard");
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [WelcomeState, Navigation]);

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
            SetErrorDetail(msg);
            SetErrorState(true);
        }
    }

    async function BackendCall() {
        SetLoadingState(true);
        const payload = {
            email: EmailRef.current?.value,
            password: PasswordRef.current?.value
        };

        try {
            const result = await axios.post(`${Backend_Url}/Tripzy/Api/User/Login`, payload);
            if (result.data.token) {
                localStorage.setItem("token", result.data.token);
                console.log(result.data.token);
                SetLoadingState(false);
                SetWelcomeState(true);
            } else {
                SetErrorDetail("Invalid credentials provided.");
                SetErrorState(true);
                SetLoadingState(false);
            }
        } catch (e) {
            SetErrorDetail("Authentication failed. Please check your credentials.");
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

            {/* Error Overlay */}
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
                                <h3 className="text-lg font-bold text-gray-900">Login Failed</h3>
                                <p className="text-gray-600 font-mono text-sm">{typeof ErrorDetail === 'string' ? ErrorDetail : "Check your credentials"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Success/Welcome Overlay */}
            {WelcomeState && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all">
                    <div className="bg-white p-10 rounded-xl shadow-2xl border-t-8 border-blue-400 max-w-md w-full mx-4 text-center transform animate-in fade-in zoom-in duration-300">
                        <div className="text-4xl mb-4">✈️</div>
                        <h2 className="text-2xl font-bold text-blue-400 mb-2">Welcome back to TripzyAI</h2>
                        <p className="text-slate-600 font-mono">Your intelligent concierge is ready to assist you. Redirecting...</p>
                    </div>
                </div>
            )}

            <div className="relative z-20 flex flex-col items-center justify-center w-full min-h-screen px-4">
                <div className="bg-white h-[5rem] w-full max-w-[25rem] flex flex-col justify-center items-center rounded-t-lg shadow-2xl">
                    <div className="text-[1.5rem] text-blue-300 font-bold tracking-tight">TripzyAI</div>
                    <div className="flex justify-center items-center text-slate-600 text-[0.8rem] font-bold">Your Intelligent Concierge Awaits</div>
                </div>

                <div className="bg-white w-full max-w-[25rem] flex flex-col justify-center items-center rounded-b-lg shadow-2xl p-8">
                    <div className="text-black text-[1.3rem] flex justify-start items-center w-full font-bold">Sign In</div>
                    
                    <div className="text-slate-800 text-[0.9rem] font-mono mt-[2rem] w-full text-left">Email Address</div>
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
                        <span className="text-slate-600 text-[0.95rem] font-mono font-bold">New to Tripzy?</span>
                        <button className="ml-2 text-[0.95rem] font-mono text-blue-400 hover:text-black font-bold" onClick={() => Navigation("/Tripzy/User/SignUp")}>SignUp</button>
                    </div>
                </div>
            </div>
        </>
    );
}