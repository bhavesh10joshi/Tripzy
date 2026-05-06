import type { ReactElement } from "react"

interface ButtonStyles {
    size: "primary" | "secondry" | "tertiary" | "middle",
    text: string,
    FrontIcon?: ReactElement,
    BackIcon?: ReactElement,
    color: "blue" | "grey" | "white",
    textColor: "black" | "grey" | "blue" | "white"
    OnClick?: () => void
}

const ColorAndShadowStyles = {
    "blue": "bg-blue-300 shadow-lg shadow-blue-300/50",
    "grey": "bg-slate-200 shadow-lg shadow-slate-600/50",
    "white": "bg-white"
}

const SizeStyling = {
    "primary": "w-[6rem] h-[2rem]",
    "secondry": "w-[15rem] h-[3.5rem]",
    "middle" : "w-[9rem] h-[2.5rem]",
    "tertiary": ""
}

const TextColorStyling = {
    "black": "text-black font-bold",
    "grey": "",
    "blue": "text-blue-500 font-bold",
    "white": "text-white font-bold"
}

const defaultStyles = "flex justify-center items-center rounded-md transition-all duration-300 transform hover:scale-[1.05] active:scale-95 hover:shadow-xl cursor-pointer";

export function Button(props: ButtonStyles) {
    return <>
        <button 
            onClick={props.OnClick}
            className={`${defaultStyles} ${TextColorStyling[props.textColor]} ${SizeStyling[props.size]} ${ColorAndShadowStyles[props.color]}`}
        >
            <div className="flex items-center gap-2">
                {props.FrontIcon}
                <span>{props.text}</span>
                {props.BackIcon}
            </div>
        </button>
    </>
}