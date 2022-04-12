import {ChangeEventHandler, ReactNode} from "react";

export default function TextArea(props: {
    id: string,
    error?: boolean,
    value: string,
    onChange: ChangeEventHandler<HTMLTextAreaElement>,
    children: ReactNode
}) {
    return (
        <label htmlFor={props.id} className={`${props.error ? "text-red-500" : ""} text-sm font-bold mb-1 text-gray-500`}>
            {props.children}
            <textarea id={props.id} rows={5} value={props.value} onChange={props.onChange} className={"w-full rounded-2xl shadow border border-gray-200 text-black text-base focus:border-violet-500 transition-colors duration-150"}/>
        </label>
    )
}
