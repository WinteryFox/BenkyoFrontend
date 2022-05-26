import React, {ReactEventHandler, ReactNode, useEffect, useRef} from "react";

export default function Dialog(props: {
    id: string,
    open: boolean,
    onClose: ReactEventHandler<HTMLDialogElement>,
    children: ReactNode
}) {
    const dialog = useRef<HTMLDialogElement>(null)
    useEffect(() => {
        if (dialog.current == null)
            return

        if (props.open)
            dialog.current.showModal()
    }, [props.open])

    return (
        <dialog id={props.id}
                className={"max-w-md lg:w-full shadow-xl p-5 rounded-xl dark:shadow-gray-900 dark:bg-gray-800"}
                onClose={props.onClose}
                ref={dialog}>
            {props.children}
        </dialog>
    )
}
