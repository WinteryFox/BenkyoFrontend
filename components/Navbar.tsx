import Image from 'next/image'
import Link from 'next/link'
import {useTranslation} from "next-i18next";
import {RootState} from "../src/UserStore";
import {useSelector} from "react-redux";

export default function Navbar() {
    const {t} = useTranslation()
    const user = useSelector((state: RootState) => state.userState.user)

    return (
        <nav
            className={"flex sticky items-center w-full z-40 bg-white justify-between px-8 py-3 dark:bg-black"}>
            <Link href={"/"}>
                <a className={"flex items-center"}>
                    <Image src={"/logo.svg"} alt={"Logo"} width={"36px"} height={"36px"}/>
                    <h1 className={"text-3xl ml-2 text-pink-300"}>Benkyo</h1>
                </a>
            </Link>
            <div>
                {user == null ?

                    <Link href={"/login"}>
                        <a id={"login"} className={"px-5 py-2 rounded-full border border-pink-200 bg-pink-100 hover:bg-pink-50 hover:shadow-md hover:shadow-pink-500/30 dark:bg-pink-300 dark:hover:bg-pink-300/90"}>
                            {t("login")}
                        </a>
                    </Link> :
                    <Link href={"/profile"}>
                        <a id={"profile"} className={"px-5 py-2.5 rounded-full border dark:text-white hover:bg-gray-100 active:bg-gray-50 dark:active:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-300 dark:border-gray-600"}>
                            {user.username}
                        </a>
                    </Link>}
            </div>
        </nav>
    )
}
