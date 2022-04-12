import {ChangeEventHandler, ReactNode} from "react";

export default function Select(
    props: {
        id: string
        value: string
        label: string
        onChange: ChangeEventHandler
        error?: boolean
        children?: ReactNode
    }
) {
    return (
        <div className={"flex flex-col"}>
            <label htmlFor={props.id} className={`${props.error ? "text-red-500" : ""} text-sm font-bold mb-1 text-gray-500`}>
                {props.label}
            </label>
            <select id={props.id} value={props.value} onChange={props.onChange}
                    className={`${props.error ? "text-red-500" : ""} mb-1 shadow border border-gray-200 rounded-full focus:border-violet-500 transition-colors duration-150`}>
                {props.children}
            </select>
        </div>
    )
}
