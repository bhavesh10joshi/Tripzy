import { Star } from "../Ui/Icons/Stars"
import { Maps } from "../Ui/Icons/maps"
import { Location1 } from "../Ui/Icons/Location1"

interface HotelLayout {
    image?: string,
    price?: number,
    Location?: string,
    LinkforLocation?: string,
    NameOfHotel?: string,
    StarsOutOf5?: number,
    Type: "Loading" | "Loaded"
}

export function Hotels(props: HotelLayout) {
    return <>
        {props.Type == "Loaded"
            ? <div className="w-[23rem] min-w-[23rem] flex-shrink-0 h-auto bg-slate-100 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 overflow-hidden">
                <div className="relative">
                    <img src={props.image} alt="Hotel" className="w-full h-[17rem] object-cover" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <Star />
                        <div className="font-black text-red-500 text-sm">{props.StarsOutOf5}</div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="font-bold text-[1.4rem] text-slate-900 truncate">{props.NameOfHotel}</div>
                    <div className="flex items-center mt-2 text-slate-500">
                        <Location1 />
                        <div className="text-[0.85rem] font-medium ml-1">{props.Location}</div>
                    </div>
                    <div className="flex justify-between items-end mt-6 pt-4 border-t border-slate-50">
                        <div>
                            <div className="text-[1.8rem] text-blue-500 font-black">₹{props.price?.toLocaleString()}</div>
                            <div className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Per Night</div>
                        </div>
                        <a 
                            href={props.LinkforLocation} 
                            target="_blank" 
                            rel="noreferrer"
                            className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all active:scale-90 shadow-lg"
                        >
                            <Maps />
                        </a>
                    </div>
                </div>
            </div>
            : <div className="w-[23rem] min-w-[23rem] h-[25rem] bg-slate-100 animate-pulse rounded-3xl" />
        }
    </>
}