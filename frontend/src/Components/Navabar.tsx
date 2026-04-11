import "../index.css"
export function Navbar()
{
    return<>
        <div className="w-full h-full flex gap-8 pl-[3rem] pt-[1rem] pb-[1rem]">
            <div className="flex justify-center items-center text-blue-500 font-bold text-[1.7rem]">
                Tripzy AI
            </div>
            <div className="flex justify-center items-center text-[0.9rem] gap-4 pl-[2rem] font-semibold text-slate-500">
                <div >Explore</div>
                <div>My Trips</div>
                <div>Support</div>
            </div>
            {/* here comes the avatar/username for the user */}
            <div className="flex justify-center items-end">

            </div>
        </div>
    </>   
}