import Link from "next/link";
import {DeckData} from "../src/Api";
import Image from "next/image";
import {useTranslation} from "next-i18next";

export default function DeckPreview(props: {
    deck: DeckData
}) {
    const {t} = useTranslation()

    return (
        <Link href={`/decks/${props.deck.id}`}>
            <a className={"flex grow-0 select-none m-2 w-72 h-[296px] flex-col p-4 rounded bg-white hover:border shadow-md border border-gray-200 hover:border-violet-300 hover:scale-105 active:scale-100 hover:shadow-2xl over:border-violet-400 transition-all active:bg-gray-100 dark:bg-black dark:text-white dark:border-gray-600 dark:active:bg-gray-800 dark:shadow-md dark:shadow-gray-600 dark:hover:shadow-lg dark:hover:shadow-violet-800"}>
                <div className={"flex justify-center"}>
                    <div className={"relative w-32 h-32"}>
                        <Image src={"/logo.svg"} alt={"Deck image"} layout={"fill"} className={"rounded-3xl"}/>
                        <i className={`flag:${props.deck.targetLanguage.slice(3, 5).toUpperCase()} absolute -bottom-2 -right-2 text-4xl shadow rounded-full`}/>
                    </div>
                </div>
                <div className={"font-semibold text-xl"}>
                    {props.deck.name}
                </div>
                {/*props.deck.author == "0" && (
                        <i className={"ml-1"} title={"Verified"}>
                            <Image src={verified} alt={"Verified"} width={16} height={16}/>
                        </i>)*/ // TODO
                }
                <div className={"text-xs text-gray-400"}>
                    {t("created-at", {date: new Date(props.deck.createdAt).toLocaleDateString()})}
                </div>
                <div className={"text-ellipsis overflow-hidden"}>
                    {props.deck.shortDescription}
                </div>
            </a>
        </Link>
    )
}
