import { Cash } from "../Ui/Icons/Cash"
import { Clock } from "../Ui/Icons/Clock"

interface TimeCardStyle {
    Time?: string,
    TotalTimeConsumption?: string,
    MoneyType?: string,
    PlanName?: string,
    PlanDescription?: string,
    Type: "Loading" | "Loaded"
}

export function TimeCard(props: TimeCardStyle) {
    return <>
        {props.Type == "Loaded"
            ? <div className="flex group mb-8 last:mb-0 transition-transform duration-300 hover:translate-x-2">
                <div className="bg-slate-200 hover:bg-white border border-transparent hover:border-blue-100 p-8 rounded-[2rem] w-full shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex flex-col w-full md:w-1/4 gap-3">
                        <div className="text-blue-500 font-black text-2xl tracking-tighter">
                            {props.Time}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg flex items-center gap-2 font-bold text-[0.7rem] uppercase">
                                <Clock /> {props.TotalTimeConsumption} Hrs
                            </div>
                            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg flex items-center gap-2 font-bold text-[0.7rem] uppercase">
                                <Cash /> {props.MoneyType}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-3/4">
                        <div className="text-slate-900 font-black text-[1.6rem] leading-tight mb-3">
                            {props.PlanName}
                        </div>
                        <div className="text-slate-500 font-medium text-[1rem] leading-relaxed italic">
                            {props.PlanDescription}
                        </div>
                    </div>
                </div>
            </div>
            : <div className="h-32 w-full bg-slate-50 animate-pulse rounded-3xl mb-6" />
        }
    </>
}