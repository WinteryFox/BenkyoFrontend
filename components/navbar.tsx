import Image from 'next/image'

export default function Navbar() {
    return (
        <div className={"sticky top-0 z-40 bg-white flex pl-8 py-5"}>
            <div className={""}>
                <a className={"overflow-hidden"} href={"/"}>
                    <Image className={"w-auto h-10"} src={"/logo_text.svg"} alt={"Logo"} width={200} height={32}/>
                </a>
            </div>

            <div>
                Hello
            </div>
        </div>
    )
}
