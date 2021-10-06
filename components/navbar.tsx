import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
    return (
        <div className={"sticky top-0 z-40 bg-white flex justify-between px-8 py-5"}>
            <a className={"overflow-hidden"} href={"/"}>
                <Image className={"w-auto h-10"} src={"/logo_text.svg"} alt={"Logo"} width={200} height={32}/>
            </a>

            <Link href={"/register"}>
                Register
            </Link>
        </div>
    )
}
