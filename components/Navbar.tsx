import Image from 'next/image'
import Link from 'next/link'
import {useTranslation} from "next-i18next";
import {RootState} from "../src/UserStore";
import {useSelector} from "react-redux";
import Dropdown, {Option} from "./Dropdown";
import {useRouter} from "next/router";
import {useState} from "react";

export default function Navbar() {
    const translation = useTranslation()
    const router = useRouter()
    const {pathname, asPath, query} = router
    const user = useSelector((state: RootState) => state.userState.user)
    const [locale] = useState<string>(translation.i18n.language)

    async function setLocale(option: Option) {
        await router.push({pathname, query}, asPath, {locale: option.value})
    }

    const options: Option[] = [
        {
            label: (
                <>
                    <i className={"fp fp-rounded us mr-2"} title={"United States"}/> English
                </>
            ), value: 'en'
        },
        {
            label: (
                <>
                    <i className={"fp fp-rounded nl mr-2"} title={"Nederland"}/> Nederlands
                </>
            ), value: 'nl'
        },
        {
            label: (
                <>
                    <i className={"fp fp-rounded jp mr-2"} title={"日本"}/> 日本語
                </>
            ), value: 'ja'
        }
    ]

    return (
        <nav
            className={"flex sticky items-center w-full z-40 bg-white justify-between px-8 py-3 dark:bg-black"}>
            <Link href={"/"}>
                <a className={"flex items-center"}>
                    <Image src={"/logo.svg"} alt={"Logo"} width={"36px"} height={"36px"}/>
                    <h1 className={"text-3xl ml-2 text-pink-300"}>Benkyo</h1>
                </a>
            </Link>
            <div className={"flex"}>
                <div className={"mr-5"}>
                    <Dropdown value={locale} options={options} onChange={value => setLocale(value)}/>
                </div>
                {user == null ?
                    <Link href={"/login"}>
                        <a id={"login"}
                           className={"px-5 py-2.5 rounded-full border text-violet-900 bg-pink-200 hover:bg-pink-100 hover:shadow-lg hover:shadow-pink-500/30"}>
                            {translation.t("login")}
                        </a>
                    </Link> :
                    <Link href={"/profile"}>
                        <a id={"profile"}
                           className={"px-5 py-2.5 rounded-full border dark:text-white hover:bg-gray-100 active:bg-gray-50 dark:active:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-300 dark:border-gray-600"}>
                            {user.username}
                        </a>
                    </Link>}
            </div>
        </nav>
    )
}
