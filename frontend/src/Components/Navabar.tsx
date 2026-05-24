import "../index.css"
import { Button } from "../Ui/Buttons/Button"
import avatar from "../Images/avatar.jpg"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function Navbar() {
    const Navigation = useNavigate();
    const [IsOpen, SetIsOpen] = useState(false);

    return (
        <>
            <nav className="w-full bg-white border-b border-slate-100 relative z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        
                        <div className="flex items-center">
                            <button 
                                onClick={() => Navigation("/Tripzy/User/Dashboard")} 
                                className="focus:outline-none transition-transform active:scale-95 group"
                            >
                                <span className="text-blue-600 font-black text-2xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent group-hover:opacity-90">
                                    Tripzy AI
                                </span>
                            </button>
                        </div>

                        <div className="hidden md:flex items-center space-x-1 lg:space-x-4 text-sm font-semibold text-slate-600">
                            <button 
                                className="transition-colors duration-200 hover:text-blue-600 hover:bg-slate-50 px-4 py-2 rounded-xl relative after:absolute after:bottom-1 after:left-4 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-[calc(100%-32px)]" 
                                onClick={() => Navigation("/Tripzy/User/Plan/NewTrip")}
                            >
                                New Trips
                            </button>
                            <button 
                                className="transition-colors duration-200 hover:text-blue-600 hover:bg-slate-50 px-4 py-2 rounded-xl relative after:absolute after:bottom-1 after:left-4 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-[calc(100%-32px)]" 
                                onClick={() => Navigation("/Tripzy/User/MyTrips/View/All")}
                            >
                                My Trips
                            </button>
                            <button 
                                className="transition-colors duration-200 hover:text-blue-600 hover:bg-slate-50 px-4 py-2 rounded-xl relative after:absolute after:bottom-1 after:left-4 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-[calc(100%-32px)]" 
                                onClick={() => Navigation("/Tripzy/User/Planning/Analytics")}
                            >
                                Analytics
                            </button>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <Button 
                                size="primary" 
                                text="LogOut" 
                                textColor="white" 
                                color="blue" 
                                OnClick={() => {
                                    localStorage.clear();
                                    Navigation("/");
                                }}
                            />
                            <div className="h-9 w-9 rounded-full ring-2 ring-slate-100 p-0.5 overflow-hidden transition-transform hover:scale-105 duration-300 shadow-sm">
                                <img src={avatar} alt="avatarlogo" className="w-full h-full object-cover rounded-full" />
                            </div>
                        </div>

                        <div className="flex md:hidden items-center">
                            <button aria-label="name"
                                onClick={() => SetIsOpen(!IsOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 focus:outline-none transition-colors duration-200"
                            >
                                <div className="w-6 h-6 relative flex flex-col justify-center items-center">
                                    <span className={`bg-current h-0.5 w-5 rounded-full transition-all duration-300 ease-out ${IsOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
                                    <span className={`bg-current h-0.5 w-5 rounded-full transition-all duration-300 ease-out my-0.5 ${IsOpen ? 'opacity-0 h-0 w-0' : 'opacity-100'}`} />
                                    <span className={`bg-current h-0.5 w-5 rounded-full transition-all duration-300 ease-out ${IsOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
                                </div>
                            </button>
                        </div>

                    </div>
                </div>

                <div className={`md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-xl transition-all duration-300 ease-in-out origin-top ${IsOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible h-0'}`}>
                    <div className="px-4 pt-3 pb-6 space-y-1.5 flex flex-col font-medium text-slate-600">
                        <button 
                            className="text-left w-full py-2.5 px-4 rounded-xl transition-colors hover:bg-slate-50 hover:text-blue-600 active:bg-slate-100" 
                            onClick={() => {
                                SetIsOpen(false);
                                Navigation("/Tripzy/User/Plan/NewTrip");
                            }}
                        >
                            New Trips
                        </button>
                        <button 
                            className="text-left w-full py-2.5 px-4 rounded-xl transition-colors hover:bg-slate-50 hover:text-blue-600 active:bg-slate-100" 
                            onClick={() => {
                                SetIsOpen(false);
                                Navigation("/Tripzy/User/MyTrips/View/All");
                            }}
                        >
                            My Trips
                        </button>
                        <button 
                            className="text-left w-full py-2.5 px-4 rounded-xl transition-colors hover:bg-slate-50 hover:text-blue-600 active:bg-slate-100" 
                            onClick={() => {
                                SetIsOpen(false);
                                Navigation("/Tripzy/User/Planning/Analytics");
                            }}
                        >
                            Analytics
                        </button>
                        
                        <div className="h-px w-full bg-slate-100 my-2" />
                        
                        <div className="flex items-center justify-between px-4 pt-2">
                            <div className="flex items-center space-x-3">
                                <div className="h-9 w-9 rounded-full ring-2 ring-slate-100 p-0.5 overflow-hidden shadow-sm">
                                    <img src={avatar} alt="avatarlogo" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">Account Profile</span>
                            </div>
                            <div className="w-28">
                                <Button 
                                    size="primary" 
                                    text="LogOut" 
                                    textColor="white" 
                                    color="blue" 
                                    OnClick={() => {
                                        SetIsOpen(false);
                                        localStorage.clear();
                                        Navigation("/");
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}