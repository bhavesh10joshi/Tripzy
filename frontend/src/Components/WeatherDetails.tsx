import { Location2 } from "../Ui/Icons/Location2"

interface Data{
    PlaceName ?: String
}

export function WeatherDetails(props : Data)
{
    return<>
        <div className="pl-[2rem] pr-[2rem] pt-[3rem] pb-[3rem] w-full">
            <div className="flex">
                <div className="w-3/4 w-full flex justify-start items-center text-black font-bold text-[2rem]">Weather Forecast</div>
                <div className="w-1/4 w-full flex justify-end items-center">
                    <div><Location2/></div>
                    <div className="ml-[0.5rem] font-semibold italic">{props.PlaceName}</div>
                </div>
            </div>
            <div>
                <div></div>
                <div></div>
            </div>
        </div>
    </>
}