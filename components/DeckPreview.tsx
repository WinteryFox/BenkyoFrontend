import Link from "next/link";
import {DeckData} from "../src/Api";
import Image from "next/image";
import verified from "../resources/verified.svg";

export default function DeckPreview(props: {
    deck: DeckData
}) {
    return (
        <Link href={`/decks/${props.deck.id}`}>
            <a className={"flex flex-col p-4 rounded bg-white shadow"}>
                <Image src={"/logo.svg"} alt={"Deck image"} width={62} height={62}/>
                <div className={"flex font-semibold text-xl items-center"}>
                    {props.deck.name}

                    {props.deck.author == BigInt(0) && (
                        <i className={"ml-1"} title={"Verified"}>
                            <Image src={verified} alt={"Verified"} width={16} height={16}/>
                        </i>)}
                </div>
                <div>{props.deck.targetLanguage}</div>
                <div>{new Date(props.deck.createdAt).toLocaleDateString()}</div>
            </a>
        </Link>
    )
}
