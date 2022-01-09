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
            <a className={"flex grow-0 select-none m-2 w-72 h-[296px] flex-col p-4 rounded bg-white shadow border hover:border-violet-500 hover:scale-[102%] transition-all"}>
                <div className={"flex justify-center"}>
                    <div className={"relative w-32 h-32"}>
                        <Image src={"/logo.svg"} alt={"Deck image"} layout={"fill"} className={"rounded-3xl"}/>
                        <i className={`absolute -bottom-2 -right-2 fp fp-square rounded-full fp-lg ${props.deck.targetLanguage.substr(3, 5).toLowerCase()}`}
                           title={props.deck.targetLanguage}/>
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
