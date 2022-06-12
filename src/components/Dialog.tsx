import React, {ForwardedRef, forwardRef, MutableRefObject, ReactNode, useEffect, useRef} from "react";

const Dialog = forwardRef(
    (props: {
         children: ReactNode
     }, ref: ForwardedRef<HTMLDialogElement>
    ) => {
        const internalRef = useRef<HTMLDialogElement>(null)

        function closeListener(event: MouseEvent) {
            const rect = internalRef.current!.getBoundingClientRect();
            if (!(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
                && rect.left <= event.clientX && event.clientX <= rect.left + rect.width))
                internalRef.current!.close()
        }

        useEffect(() => {
            const dialog = internalRef.current
            dialog!.addEventListener("click", closeListener)

            return () => dialog!.removeEventListener("click", closeListener)
        }, [])

        return <dialog className={"max-w-md lg:w-full p-5 rounded-3xl dark:bg-gray-800"}
                       ref={(node) => {
                           (internalRef as MutableRefObject<HTMLDialogElement | null>).current = node
                           if (typeof ref === "function") {
                               ref(node)
                           } else if (ref) {
                               (ref as MutableRefObject<HTMLDialogElement | null>).current = node
                           }
                       }}>
            <button
                className={"absolute top-0 right-0 mt-4 mr-4 rounded-full hover:bg-pink-400 hover:bg-opacity-40 dark:hover:bg-gray-400 dark:hover:bg-opacity-30 transition-all duration-150"}
                aria-label={"close"} onClick={() => internalRef.current?.close()} tabIndex={0}>
                <i className={"material-icons dark:text-white m-1"}>close</i>
            </button>
            {props.children}
        </dialog>
    }
)
Dialog.displayName = "Dialog"

export default Dialog
