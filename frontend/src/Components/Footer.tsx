export function Footer()
{
    return<>
        <div className="mt-[8rem] bg-slate-200 h-[10rem] w-full pl-[2rem] pr-[2rem] pt-[3rem] pb-[2rem] flex">
            <div className="flex flex-col justify-start">
                <div className="text-blue-300 font-semibold text-[1.7rem]">
                    TripzyAI
                </div>
                <div className="text-slate-500 text-[0.8rem] font-semibold">
                    © 2026 TRIPZY AI . THE INTELLIGENT CONCIERGE
                </div>
            </div>
            <div className="w-full flex flex-row justify-end items-center">
                <button className="flex justify-center items-center text-slate-700 font-semibold hover:text-blue-300">New Trip</button>
                <button className=" ml-[3rem] flex justify-center items-center text-slate-700 font-semibold hover:text-blue-300">My Trips</button>
                <button className=" ml-[3rem] flex justify-center items-center text-slate-700 font-semibold hover:text-blue-300">LogOut</button>
            </div>
        </div>
    </>
}