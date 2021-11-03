import React, {ReactNode} from "react";

export default function Button(props: {
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    children: ReactNode
}) {
    return (
        <button
            className="disabled:bg-gray-300 disabled:cursor-not-allowed bg-primary-500 hover:bg-primary-700
            transition-colors duration-150 text-white font-bold py-2 px-4 rounded"
            type={props.type}
            tabIndex={0}
            onClick={event => props.onClick ? props.onClick(event) : null}
            disabled={props.disabled}>
            {props.children}
        </button>
    )
}
