import Image from 'next/image'
import Link from 'next/link'
import Button from "./Button";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {RootState} from "../src/UserStore";
import {useSelector} from "react-redux";

export default function Navbar() {
    const {t} = useTranslation()
    const router = useRouter()
    const user = useSelector((state: RootState) => state.userState.user)

    return (
        <nav
            className={"flex sticky items-center w-full z-40 bg-white justify-between px-8 py-3 border-gray-500 shadow"}>
            <Link href={"/"}>
                <a className={"flex items-center"}>
                    <Image src={"/logo.svg"} alt={"Logo"} width={"36px"} height={"36px"}/>
                    <h1 className={"text-3xl ml-2 text-pink-300"}>Benkyo</h1>
                </a>
            </Link>
            <div>
                {user == null ?
                    <Button onClick={() => router.push("/login")}>
                        {t("login")}
                    </Button> :
                    <div>{user.username}</div>}
            </div>
        </nav>
    )
}
