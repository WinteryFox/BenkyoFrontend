import React, {ReactNode} from "react";
import {useTranslation} from "next-i18next";
import Button from "./Button";

export default function Dialog(props: {
    id: string
    leftBtn: string
    rightBtn: string
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    children: ReactNode
}) {
    const {t} = useTranslation()

    return (
        <dialog id={props.id} className={"max-w-md lg:w-full shadow-xl p-5 rounded-xl dark:shadow-gray-900 dark:bg-gray-800"}>
            {props.children}
            <form method="dialog">
                <menu className={"flex space-x-3"}>
                    <Button
                        className={"flex text-lg mt-2 md:mt-0 lg:mt-2 items-center bg-gray-200 hover:bg-gray-400 hover:text-white hover:shadow-lg hover:shadow-violet-500/30 transition-all dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500/80"}>
                        {t(props.leftBtn)}
                    </Button>
                    <Button
                        className={"flex text-lg mt-2 md:mt-0 lg:mt-2 items-center bg-rose-200 hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-violet-500/30 transition-all dark:text-white dark:bg-rose-600 dark:hover:bg-rose-600/80"}
                        onClick={event => props.onClick ? props.onClick(event) : null}>
                        {t(props.rightBtn)}
                    </Button>
                </menu>
            </form>
        </dialog>
    )
}
