import Image from 'next/image'
import Link from 'next/link'
import {useTranslation} from "next-i18next";
import {RootState} from "../src/UserStore";
import {useSelector} from "react-redux";
import Dropdown, {Option} from "./Dropdown";
import {useRouter} from "next/router";
import {useState} from "react";
import Flag from "country-flag-icons/react/3x2";
import logo from "../public/logo.svg";

export default function Navbar() {
    const {i18n, t} = useTranslation()
    const router = useRouter()
    const {pathname, asPath, query} = router
    const user = useSelector((state: RootState) => state.userState.user)
    const [locale] = useState<string>(i18n.language)

    async function setLocale(option: Option) {
        window.localStorage.setItem("locale", option.value)
        await router.push({pathname, query}, asPath, {locale: option.value})
    }

    const options: Option[] = [
        {
            label: (
                <div className={"flex items-center"}>
                    <Flag.GB className={"h-4 rounded mr-2"} aria-label={"Nederland"}/> English
                </div>
            ), value: 'en'
        },
        {
            label: (
                <div className={"flex items-center"}>
                    <Flag.NL className={"h-4 rounded mr-2"} aria-label={"Nederland"}/> Nederlands
                </div>
            ), value: 'nl'
        },
        {
            label: (
                <div className={"flex items-center"}>
                    <Flag.JP className={"h-4 rounded mr-2"} aria-label={"Nederland"}/> 日本語
                </div>
            ), value: 'ja'
        }
    ]

    return (
        <nav
            className={"flex sticky items-center w-full z-40 justify-between px-8 py-3"}>
            <Link href={"/"}>
                <a className={"flex items-center"} tabIndex={0}>
                    <Image src={logo} alt={"Logo"} width={"32px"} height={"32px"} priority/>
                    <h1 className={"text-3xl ml-2 dark:text-white hidden md:block"}>Benkyo</h1>
                </a>
            </Link>
            <div className={"flex items-center"}>
                <div className={"mr-2"}>
                    <Dropdown value={locale} options={options} onChange={value => setLocale(value)}/>
                </div>
                {user == null ?
                    <Link href={"/login"}>
                        <a id={"login"}
                           className={"px-5 py-2 rounded-full border border-pink-200 bg-pink-100 hover:bg-pink-50 hover:shadow-md hover:shadow-pink-500/30 dark:bg-pink-300 dark:hover:bg-pink-300/90 dark:text-black"}>
                            {t("login")}
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
