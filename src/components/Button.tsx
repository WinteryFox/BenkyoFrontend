import React, {ReactNode} from "react";

export default function Button(props: {
    className?: string,
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    id?: string
    children: ReactNode
}) {
    return (
        <button
            id={props.id}
            className={`btn ${props.className}`}
            type={props.type}
            tabIndex={0}
            onClick={event => props.onClick ? props.onClick(event) : null}
            disabled={props.disabled}>
            {props.children}
        </button>
    )
}
