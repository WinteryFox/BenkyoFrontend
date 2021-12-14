import {ChangeEvent} from "react";

export default function Checkbox(props: {
    value?: boolean | undefined,
    disabled?: boolean | undefined,
    onChange?: ChangeEvent<HTMLInputElement>
}) {
    return (
        <input type={"checkbox"} checked={props.value} disabled={props.disabled} className={"rounded checked:bg-pink-500"}/>
    )
}
