import type { ReactElement } from "react"

interface ButtonStyles{
    size : "primary" | "secondry" | "tertiary" , 
    text : string , 
    FrontIcon ?: ReactElement ,
    BackIcon ?: ReactElement , 
    color : "blue" | "grey" | "white" ,
    textColor : "black" | "grey" | "blue" | "white"   
    OnClick ?: () => void  
}

const ColorAndShadowStyles = {
    "blue" : "bg-blue-300 shadow-lg shadow-blue-300/50" ,
    "grey" : "bg-slate-200 shadow-lg shadow-slate-600/50" , 
    "white" : "bg-white" 
}

const SizeStyling = {
    "primary" : "",
    "secondry" : "w-[15rem] h-[3.5rem]",
    "tertiary" : ""
}

const TextColorStyling = {
    "black" : "text-black font-bold" , 
    "grey" : "" ,
    "blue" : "" ,
    "white" : "text-white font-bold" 
}
const defaultStyles = "flex justify-center items-center rounded-md";
export function Button(props:ButtonStyles)
{
    return<>
            <button className={`${defaultStyles} ${TextColorStyling[props.textColor]} ${SizeStyling[props.size]} ${ColorAndShadowStyles[props.color]}`}>
                {props.FrontIcon}
                {`${props.text}`} 
                {props.BackIcon}
            </button>
    </>
}