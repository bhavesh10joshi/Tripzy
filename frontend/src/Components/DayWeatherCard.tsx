import { ClearSunny } from "../Ui/Icons/WeatherIcons/ClearSunny"
import { Clouds } from "../Ui/Icons/WeatherIcons/Clouds"
import { Drizzle } from "../Ui/Icons/WeatherIcons/Drizzle"
import { Fog } from "../Ui/Icons/WeatherIcons/Fog"
import { Rain } from "../Ui/Icons/WeatherIcons/Rain"
import { Snow } from "../Ui/Icons/WeatherIcons/Snow"
import { ThunderStorms } from "../Ui/Icons/WeatherIcons/ThunderStorm"

interface WeatherCardProps {
  Day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  Temperature: string;
  WeatherType: "ClearSunny" | "Clouds" | "Drizzle" | "Rain" | "ThunderStorm" | "Snow" | "Fog";
  WeatherInfo: string;
  onClick?: () => void;
}

const DayMapping: Record<string, string> = {
  "Sunday": "Sun", 
  "Monday": "Mon", 
  "Tuesday": "Tue", 
  "Wednesday": "Wed", 
  "Thursday": "Thu",
  "Friday": "Fri",
  "Saturday": "Sat"
}

const IconsMapping = {
  "ClearSunny": <ClearSunny />,
  "Clouds": <Clouds />, 
  "Drizzle": <Drizzle />, 
  "Rain": <Rain />, 
  "ThunderStorm": <ThunderStorms />,
  "Snow": <Snow />,
  "Fog": <Fog />
}

export function WeatherCard({ Day, Temperature, WeatherType, WeatherInfo, onClick }: WeatherCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex h-52 w-36 flex-shrink-0 flex-col items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-md active:scale-95 active:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="text-sm font-bold tracking-wide text-slate-500 transition-colors group-hover:text-slate-700">
        {DayMapping[Day]}
      </div>
      
      <div className="flex transform items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {IconsMapping[WeatherType]}
      </div>
      
      <div className="w-full text-center space-y-0.5">
        <div className="text-xl font-bold tracking-tight text-slate-800">
          {Temperature}
        </div>
        <div className="text-xs font-medium text-slate-400 group-hover:text-slate-500 truncate px-1">
          {WeatherInfo}
        </div>
      </div>
    </button>
  )
}