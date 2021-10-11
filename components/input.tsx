import {ChangeEvent, ReactNode} from "react";

export default function Input(props: {
    id: string
    value: string
    onChange: (event: ChangeEvent) => void
    type?: string
    autocomplete?: string
    children: ReactNode
}) {
    return (
        <>
            <label className="block text-sm font-bold mb-1 text-gray-500" htmlFor={props.id}>
                {props.children}
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-none focus:shadow-outline focus:border-primary-500 transition-colors duration-150"
                id={props.id} type={props.type} name={props.id} value={props.value} autoComplete={props.autocomplete}
                onChange={(event) => props.onChange(event)} required/>
        </>
    )
}
