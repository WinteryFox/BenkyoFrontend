import {ReactNode} from "react";

export default function Option(props: {
    value: string
    children?: ReactNode
}) {
    return (
        <option value={props.value}>
            {props.children}
        </option>
    )
}
