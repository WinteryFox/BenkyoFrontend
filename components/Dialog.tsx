import React, {ReactNode} from "react";

export default function Dialog(props: {
    id: string
    children: ReactNode
}) {
    return (
        <dialog id={props.id} className={"max-w-md lg:w-full shadow-xl p-5 rounded-xl dark:shadow-gray-900 dark:bg-gray-800"}>
            {props.children}
        </dialog>
    )
}
