import Image from 'next/image'
import Link from 'next/link'
import Button from "./button";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import store from "../src/UserStore";
import {useAppDispatch} from "../src/UserStore";

export default function Navbar() {
    const {t} = useTranslation()
    const router = useRouter()
    const dispatch = useAppDispatch()

    dispatch({
        type: "set"
    })

    return (
        <nav
            className={"flex sticky items-center w-full z-40 bg-white justify-between px-8 py-3 border-gray-500 shadow"}>
            <Link href={"/"}>
                <a className={"flex"}>
                    <Image src={"/logo.svg"} alt={"Logo"} width={"36px"} height={"36px"}/>
                </a>
            </Link>

            {store.getState().userState.user == null ?
                <Button onClick={() => router.push("/login")}>
                    {t("login")}
                </Button> :
                <div>
                    <span>{store.getState().userState.user?.username}</span>
                </div>
            }
        </nav>
    )
}
