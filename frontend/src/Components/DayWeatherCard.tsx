import { ClearSunny } from "../Ui/Icons/WeatherIcons/ClearSunny"
import { Clouds } from "../Ui/Icons/WeatherIcons/Clouds"
import { Drizzle } from "../Ui/Icons/WeatherIcons/Drizzle"
import { Fog } from "../Ui/Icons/WeatherIcons/Fog"
import { Rain } from "../Ui/Icons/WeatherIcons/Rain"
import { Snow } from "../Ui/Icons/WeatherIcons/Snow"
import { ThunderStorms } from "../Ui/Icons/WeatherIcons/ThunderStorm"

interface Data{
    Day : "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" , 
    Temperature : String , 
    WeatherType : "ClearSunny" | "Clouds" | "Drizzle" | "Rain" | "ThunderStorm" | "Snow" | "Fog"
}

const Day = {
    "Sunday" : "Sun" , 
    "Monday" : "Mon" , 
    "Tuesday" : "Tue" , 
    "Wednesday" : "Wed" , 
    "Thursday" : "Thur" ,
    "Friday" : "Fri" ,
}

const IconsMapping = {
    "ClearSunny" : <ClearSunny/> ,
    "Clouds" : <Clouds/> , 
    "Drizzle" : <Drizzle/> , 
    "Rain" : <Rain/> , 
    "ThunderStorm" : ,
    "Snow" : "" ,
    "Fog" : ""
}

export function WeatherCard()
{
    return<>

    </>
}