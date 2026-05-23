import { Location2 } from "../Ui/Icons/Location2"
import { WeatherCard } from "./DayWeatherCard"
import { LightBulb } from "../Ui/Icons/LightBulb"

interface WeatherDetailsProps {
  PlaceName ?: string;
}

export function WeatherDetails({ PlaceName = "Unknown Location" }: WeatherDetailsProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-12">
      
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Weather Forecast
        </h2>
        <div className="flex items-center gap-1.5 text-slate-700 transition-all duration-200 hover:text-slate-900">
          <Location2/>
          <span className="font-semibold tracking-wide text-sm md:text-base">{PlaceName}</span>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5 items-start">
        
        <div className="lg:col-span-4 overflow-x-auto pb-4 pt-1 px-1 -mx-4 md:mx-0 md:px-0 flex gap-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent snap-x snap-mandatory">
          <div className="flex gap-4 px-4 md:px-0 md:flex-wrap">
            <div className="snap-center"><WeatherCard Day="Sunday" Temperature="22° / 15°" WeatherType="ClearSunny" WeatherInfo="Clear Sunny" /></div>
            <div className="snap-center"><WeatherCard Day="Monday" Temperature="22° / 15°" WeatherType="ClearSunny" WeatherInfo="Clear Sunny" /></div>
            <div className="snap-center"><WeatherCard Day="Tuesday" Temperature="22° / 15°" WeatherType="ClearSunny" WeatherInfo="Clear Sunny" /></div>
            <div className="snap-center"><WeatherCard Day="Wednesday" Temperature="22° / 15°" WeatherType="ClearSunny" WeatherInfo="Clear Sunny" /></div>
            <div className="snap-center"><WeatherCard Day="Thursday" Temperature="22° / 15°" WeatherType="ClearSunny" WeatherInfo="Clear Sunny" /></div>
            <div className="snap-center"><WeatherCard Day="Friday" Temperature="22° / 15°" WeatherType="ClearSunny" WeatherInfo="Clear Sunny" /></div>
            <div className="snap-center"><WeatherCard Day="Saturday" Temperature="22° / 15°" WeatherType="ClearSunny" WeatherInfo="Clear Sunny" /></div>
          </div>
        </div>
        
        <div className="lg:col-span-1 w-full h-full">
          <div className="h-full rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-50/30 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                <LightBulb />
              </div>
              <h3 className="font-bold tracking-wide text-blue-600">
                Packing Tip
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Mornings can be crisp while afternoons stay mild. Light layers, comfortable walking shoes, and a compact umbrella are highly recommended for your trip to Tokyo and Kyoto.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  )
}