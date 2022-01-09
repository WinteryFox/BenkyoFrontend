import {ChangeEventHandler, ReactNode} from "react";

export default function Checkbox(props: {
    id: string,
    checked?: boolean | undefined,
    disabled?: boolean | undefined,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    children?: ReactNode
}) {
    return (
        <label className={`${props.disabled ? "cursor-not-allowed " : ""} flex items-center select-none justify-between cursor-pointer font-bold text-gray-500 text-sm mb-1`}>
            {props.children}
            <input id={props.id} type={"checkbox"} checked={props.checked} onChange={props.onChange} disabled={props.disabled}
                   className={`${props.disabled ? "cursor-not-allowed " : ""} cursor-pointer mr-2 text-pink-500 w-4 h-4 border rounded-3xl checked:bg-pink-500`}/>
        </label>
    )
}
