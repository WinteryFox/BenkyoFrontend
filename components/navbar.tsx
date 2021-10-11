import Image from 'next/image'
import Link from 'next/link'
import Button from "./button";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";

export default function Navbar() {
    const {t} = useTranslation()
    const router = useRouter()

    return (
        <nav
            className={"flex sticky items-center w-full z-40 bg-white justify-between px-8 py-3 border-gray-500 shadow"}>
            <Link href={"/"} passHref>
                <a>
                    <Image className={"w-auto h-10"} src={"/logo_text.svg"} alt={"Logo"} width={158} height={32}/>
                </a>
            </Link>

            <Button onClick={() => router.push("/login")}>
                {t("login")}
            </Button>
        </nav>
    )
}
