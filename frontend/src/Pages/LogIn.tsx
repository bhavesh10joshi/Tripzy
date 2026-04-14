import aeroplane from "../Images/aeroplane.png"

export function LogIn() {
    return (
        <>
            <img 
                src={aeroplane} 
                alt="bgimage" 
                className="absolute inset-0 w-full h-screen object-cover z-0" 
            />

            <div className="absolute inset-0 bg-black/20 z-10"></div>

            <div className="relative z-20 flex flex-col items-center justify-center w-full h-screen px-4">
                
                <div className="bg-white h-[5rem] w-[20rem] flex flex-col justify-center items-center rounded-lg shadow-2xl">
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
                        <button className="bg-blue-300 text-white w-full h-[3rem] rounded-md font-bold mt-[1rem] hover:animate-[bounce_1.5s_ease-in-out_infinite]">Submit</button>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="text-slate-600 text-[0.95rem] font-mono font-bold">
                            New to Tripzy? 
                        </div>
                        <div>
                            <button className="ml-[1rem] text-[0.95rem] font-mono text-blue-300 hover:text-black font-bold">SignUp</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}