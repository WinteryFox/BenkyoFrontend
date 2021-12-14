import {CardData, DeckData, getDeck} from "../../src/Api";
import {GetStaticPaths, GetStaticProps} from "next";
import Image from "next/image";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Flag from "../../components/Flag";
import Button from "../../components/Button";
import {useTranslation} from "next-i18next";
import Card from "../../components/Card";
import Head from "next/head"
import {useQuery} from "react-query";
import {useRouter} from "next/router";
import Markdown from "../../components/Markdown";
import Link from "next/link";

interface Props {
    deck: DeckData
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

export default function Id() {
    const {t} = useTranslation()
    const router = useRouter()
    const {id} = router.query

    const {isLoading, error, data} = useQuery<Props>(
        `deck_${id}`,
        async () => {
            return {
                deck: await getDeck(id![0])
            }
        }
    )

    if (isLoading)
        return "Loading..."
    if (error)
        return "Oops..."
    if (!data)
        return "404"

    return (
        <>
            <Head>
                <title>Benkyo | {data.deck.name}</title>
            </Head>

            <div className={"w-full h-full flex justify-center"}>
                <div className={"flex md:flex-row pt-8 pb-4 px-10 md:w-[1024px]"}>
                    <div className={"flex md:flex-col md:p-3 pb-3 rounded-xl md:mr-4 shrink-0 items-center"}>
                        <Image src={"/logo.svg"} alt={"Deck image"} title={"Deck image"} className={"rounded-2xl"}
                               width={62} height={62}/>

                        <div className={"flex flex-col items-center md:mt-2 ml-4 md:ml-0"}>
                            <Flag code={data.deck.targetLanguage}/>
                        </div>
                    </div>

                    <div className={"flex flex-col w-full"}>
                        <div className={"flex justify-between items-center"}>
                            <div className={"flex flex-col"}>
                                <div className={"text-xs text-gray-400 italic"}>
                                    {t("created-at", {date: new Date(data.deck.createdAt).toLocaleDateString()})}
                                </div>

                                <div className={"flex text-4xl font-semibold"}>
                                    {data.deck.name}
                                </div>
                            </div>
                        </div>

                        <div>
                            <Markdown>
                                {data.deck.description}
                            </Markdown>
                        </div>

                        <div className={"w-full mt-2"}>
                            <Link href={`/study/${id}`} passHref>
                                <Button
                                    className={"text-white bg-violet-600 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/30"}>
                                    {t("start-deck")}
                                </Button>
                            </Link>
                        </div>

                        <div className={"flex flex-col w-full mb-3 mt-4"}>
                            <p className={"flex text-lg font-semibold"}>
                                {t("word-list", {count: data.deck.cards.length})}
                            </p>
                            <div className={"flex flex-col items-center w-full"}>
                                {data.deck.cards.map((card: CardData) => (
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
