import React, {ReactNode} from "react";

export default function Button(props: {
    className?: string,
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    children: ReactNode
}) {
    return (
        <button
            className={`${props.className} disabled:cursor-not-allowed transition-all duration-150 rounded-full px-[24px] h-[40px] w-full`}
            type={props.type}
            tabIndex={0}
            onClick={event => props.onClick ? props.onClick(event) : null}
            disabled={props.disabled}>
            {props.children}
        </button>
    )
}
