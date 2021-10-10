import {ReactNode} from "react";

export default function Button(props: { children: ReactNode }) {
    return (
        <button
            className={"bg-primary-500 hover:bg-primary-700 transition-colors duration-150 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}
            type="submit">
            {props.children}
        </button>
    )
}
