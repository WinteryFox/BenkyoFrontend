import {Card, Deck, getCards, getDeck} from "../../src/Api";
import {GetStaticPaths, GetStaticProps} from "next";
import Image from "next/image";
import verified from "resources/verified.svg"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect} from "react";
import Flag from "../../components/Flag";
import Button from "../../components/button";
import {useTranslation} from "next-i18next";

interface Props {
    deck: Deck,
    cards: Array<Card>
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const deck = await getDeck(context.params!["id"]![0])
    const cards = await getCards(context.params!["id"]![0])

    if (!deck)
        return {
            notFound: true
        }

    return {
        props: {
            ...(await serverSideTranslations(context.locale!)),
            deck,
            cards
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

export default function Id(props: Props) {
    const {t} = useTranslation()

    useEffect(() => {
        document.title = `Benkyo | ${props.deck.name}` // TODO: Temporary patch
    })

    return (
        <div className={"flex flex-col bg-white"}>
            <div className={"flex py-8 px-10 border-b"}>
                <div className={"p-3 rounded-xl mr-4 flex-shrink-0"}>
                    <Image src={"/logo.svg"} alt={"Deck image"} title={"Deck image"} className={"rounded-2xl"}
                           width={62} height={62}/>

                    <div className={"flex flex-col items-center mt-2"}>
                        <Flag code={props.deck.targetLanguage}/>
                    </div>
                </div>

                <div className={"flex flex-col"}>
                    <div className={"flex justify-between items-center"}>
                        <div className={"flex flex-col"}>
                            <div className={"text-xs text-gray-400"}>
                                Created <time
                                dateTime={props.deck.createdAt}>{new Date(props.deck.createdAt).toLocaleDateString()}</time>
                            </div>

                            <div className={"flex text-3xl font-semibold"}>
                                {props.deck.name}

                                {props.deck.author == BigInt(0) && (
                                    <i className={"ml-2"} title={"Verified"}>
                                        <Image src={verified} alt={"Verified"} width={24} height={24}/>
                                    </i>)}
                            </div>
                        </div>

                        <Button>
                            {t("start-deck")}
                        </Button>
                    </div>

                    {props.deck.description}
                </div>
            </div>

            <div className={"flex flex-col self-center md:w-[640px] sm:w-full mb-3"}>
                {props.cards.map((card: Card) => (
                    <div key={card.id} className={"flex flex-col"}>
                        <div className={"flex justify-between my-2"}>
                            {card.question}

                            <div className={"flex flex-col"}>
                                {card.answers.map((answer) => (
                                    <div key={answer}>
                                        {answer}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={"border-b"}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
