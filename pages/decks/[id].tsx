import {CardData, DeckData, getCards, getDeck} from "../../src/Api";
import {GetStaticPaths, GetStaticProps} from "next";
import Image from "next/image";
import verified from "resources/verified.svg"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Flag from "../../components/Flag";
import Button from "../../components/button";
import {useTranslation} from "next-i18next";
import Card from "../../components/Card";
import Head from "next/head"
import {useQuery} from "react-query";
import {useRouter} from "next/router";

interface Props {
    deck: DeckData,
    cards: Array<CardData>
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!))
        }
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

export default function Id(props: Props) {
    const {t} = useTranslation()
    const router = useRouter()
    const {id} = router.query

    const {isLoading, error, data} = useQuery<Props>(
        `deck_${id}`,
        async () => {
            return {
                deck: await getDeck(id![0]),
                cards: await getCards(id![0])
            }
        }
    )

    if (isLoading)
        return 'Loading...'
    if (error)
        return 'Oops...'
    if (!data)
        return '404'

    function start() {
        alert("This is where a study session would start...")
    }

    return (
        <>
            <Head>
                <title>Benkyo | {data.deck.name}</title>
            </Head>

            <div className={"w-full h-full flex justify-center"}>
                <div className={"flex flex-col md:flex-row pt-8 pb-4 px-10 md:w-[1024px]"}>
                    <div className={"flex md:flex-col md:p-3 pb-3 rounded-xl md:mr-4 flex-shrink-0 items-center"}>
                        <Image src={"/logo.svg"} alt={"Deck image"} title={"Deck image"} className={"rounded-2xl"}
                               width={62} height={62}/>

                        <div className={"flex flex-col items-center md:mt-2 ml-4 md:ml-0"}>
                            <Flag code={data.deck.targetLanguage}/>
                        </div>
                    </div>

                    <div className={"flex flex-col w-full"}>
                        <div className={"flex justify-between items-center"}>
                            <div className={"flex flex-col"}>
                                <div className={"text-xs text-gray-400"}>
                                    {t("created-at", {date: new Date(data.deck.createdAt).toLocaleDateString()})}
                                </div>

                                <div className={"flex text-3xl font-semibold"}>
                                    {data.deck.name}

                                    {data.deck.verified && (
                                        <i className={"ml-2"} title={"Verified"}>
                                            <Image src={verified} alt={"Verified"} width={24} height={24}/>
                                        </i>)}
                                </div>
                            </div>
                        </div>

                        <p className={"whitespace-pre-wrap"}>
                            {data.deck.description}
                        </p>

                        <div className={"w-full mt-2"}>
                            <Button onClick={start}>
                                {t("start-deck")}
                            </Button>
                        </div>

                        <div className={"flex flex-col w-full mb-3 mt-4"}>
                            <p className={"flex text-lg font-semibold"}>
                                {t("word-list", {count: data.cards.length})}
                            </p>
                            <div className={"flex flex-col items-center w-full"}>
                                {data.cards.map((card: CardData) => (
                                    <div className={"w-full my-1.5"} key={card.id}>
                                        <Card card={card}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
