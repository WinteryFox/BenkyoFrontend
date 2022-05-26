import React, {ReactNode, useEffect, useRef} from "react";

export default function Dialog(props: {
    id: string,
    active?: boolean,
    children: ReactNode
}) {
    const dialog = useRef<HTMLDialogElement>(null)
    useEffect(() => {
        if (dialog.current == null)
            return

        if (props.active)
            dialog.current.showModal()
        else
            dialog.current.close()
    }, [props.active])

    return (
        <dialog id={props.id}
                className={"max-w-md lg:w-full shadow-xl p-5 rounded-xl dark:shadow-gray-900 dark:bg-gray-800"}
                ref={dialog}>
            {props.children}
        </dialog>
    )
}
