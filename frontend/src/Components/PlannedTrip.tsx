import { Button } from "../Ui/Buttons/Button"
import { Calender } from "../Ui/Icons/Calender"
import { Bin } from "../Ui/Icons/Bin"
import { Backend_Url } from "../BackendUrl/BackendUrl"
import axios from "axios"
import { useNavigate } from "react-router-dom"

interface DataStye {
    NameofItienary?: string,
    Date?: string,
    ImageOfthePlan?: string,
    PlanDescription?: string,
    Type: "Loaded" | "Loading",
    UniqueId?: string,
    OnClick?: () => void,
    SetLoadingfunction?: (a: any) => void,
    SetErrorStateFunction?: (a: any) => void,
    RefreshData?: () => void
}

export function PastPlannedTrips(props: DataStye) {
    async function DeleteBackendCall() {
        props.SetLoadingfunction?.(true);
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const payload = { PlanUniqueId: props.UniqueId };
        
        try {
            await axios.post(`${Backend_Url}/Tripzy/Api/TravelPlan/Delete/Plan`, payload, config);
            props.RefreshData?.();
        } catch (e) {
            props.SetErrorStateFunction?.(true);
            props.SetLoadingfunction?.(false);
        }
    }

    return (
        <>
            {props.Type == "Loaded" ? (
                <div className="w-full group/card relative">
                    <div className="bg-white p-6 md:p-[2rem] flex flex-col md:flex-row rounded-[2rem] mt-[2rem] w-full shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
                        <div className="relative overflow-hidden rounded-2xl h-[15rem] w-full md:w-[20rem] flex-shrink-0">
                            <img src={props.ImageOfthePlan} alt={props.NameofItienary} className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                        </div>
                        
                        <div className="mt-6 md:mt-0 md:ml-[2rem] flex-1">
                            <div className="w-full flex justify-end items-center">
                                <button 
                                    aria-label="delete" 
                                    onClick={(e) => { e.stopPropagation(); DeleteBackendCall(); }}
                                    className="bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 p-3 rounded-xl transition-all duration-300 hover:rotate-12 active:scale-75 border border-transparent hover:border-red-100 group/bin"
                                >
                                    <div className="group-hover/bin:animate-pulse">
                                        <Bin />
                                    </div>
                                </button>
                            </div>

                            <div className="text-[1.9rem] mt-[0.5rem] font-black text-slate-800 leading-tight">
                                {props.NameofItienary}
                            </div>
                            
                            <div className="flex items-center mt-2 text-blue-500">
                                <Calender />
                                <span className="font-bold ml-2 text-sm">{props.Date}</span>
                            </div>

                            <p className="text-slate-500 font-medium mt-4 line-clamp-2 max-w-[40rem]">
                                {props.PlanDescription}
                            </p>

                            <div className="mt-6">
                                <Button size="middle" text="View Full Plan" color="blue" textColor="white" OnClick={() => props.OnClick?.()} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full animate-pulse">
                    <div className="bg-slate-50 p-[2rem] flex rounded-[2rem] mt-[2rem] w-full border border-slate-100">
                        <div className="h-[15rem] w-[20rem] bg-slate-200 rounded-2xl flex-shrink-0" />
                        <div className="ml-[2rem] flex-1 space-y-4">
                            <div className="h-4 w-24 bg-slate-200 rounded self-end" />
                            <div className="h-10 w-3/4 bg-slate-200 rounded-lg" />
                            <div className="h-4 w-1/2 bg-slate-200 rounded" />
                            <div className="h-12 w-40 bg-slate-200 rounded-xl mt-6" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}