import {GetStaticPaths, GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {CardAttempt, CardData, DeckData, getDeck, getNewCards} from "../../src/Api";
import Input from "../../components/Input";
import {useState} from "react";
import DefaultErrorPage from "next/error";

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

interface Props {
    deck: DeckData | null,
    cards: Array<CardData> | null
}

export default function Study() {
    const [isReady, setReady] = useState(false)
    const [answer, setAnswer] = useState("")
    const [cardsLeft, setCardsLeft] = useState<Array<CardData> | null>(null)
    const [currentCard, setCurrentCard] = useState<CardData | null>(null)
    const [attempts, setAttempts] = useState<Array<string>>([])
    const [results, setResults] = useState<Array<CardAttempt>>([])
    const [isFinished, setFinished] = useState<boolean>(false)

    const {t} = useTranslation()
    const router = useRouter()
    const {id} = router.query

    const {isLoading, error, data} = useQuery<Props>(
        `study_${id}`,
        async () => {
            const deck = await getDeck(id! as string)
            const cards = await getNewCards(id! as string)

            if (!deck || !cards) {
                throw Error("Deck does not exist or has no cards")
            }

            const temp: Array<CardData> = [...cards]
            const card = temp.shift()
            if (!card)
                await router.push(`/decks/${deck.id}`)

            setCurrentCard(card!)
            setCardsLeft(temp)
            setReady(true)
            return {
                deck: deck,
                cards: cards
            }
        }
    )

    if (isLoading || !isReady)
        return "Loading..."
    if (error)
        return "Oops..."
    if (!data || !data.deck || !data.cards)
        return <DefaultErrorPage statusCode={404}/>

    /*useEffect(() => {
        setResults(prevState => [...prevState, {
            card: currentCard.id,
        }])
    }, [currentCard])*/

    async function handleEnter() {
        if (currentCard == null)
            return

        if (currentCard.answers.filter((v) => answer.toLowerCase() == v.toLowerCase()).length > 0) {
            const curr = currentCard
            const res: Array<CardAttempt> = [...results, {
                card: curr.id,
                attempts: attempts
            }]
            setResults(res)

            const temp = [...cardsLeft!]
            const card = temp.shift()
            setCardsLeft(temp)
            if (!card) {
                setFinished(true)
                return
            }

            setAnswer("")
            setCurrentCard(card)
        } else {
            const an = answer
            const at: Array<string> = [...attempts, an]
            setAttempts(at)
        }
    }

    return (
        <>
            <Head>
                <title>{data.deck.name} | Benkyo Study Session</title>
            </Head>

            <div className={"flex flex-col w-full"}>
                <div className={"flex sticky items-center w-full z-40 bg-white px-8 pb-3"}>
                    <div className={"text-2xl"}>{data.deck.name}</div>
                </div>

                {!isFinished ?
                    <>
                        <div className={"w-full bg-gray-200 h-2"}>
                            <div className={"bg-pink-300 h-2"}
                                 style={{width: `${Math.floor((data.cards.length - cardsLeft!.length - 1) / data.cards.length * 100)}%`}}/>
                        </div>

                        <div className={"px-20 py-5 w-full max-w-[812px] flex flex-col self-center"}>
                            <h1 className={"text-4xl mb-10 mt-5"}>{t("give-answer")}</h1>
                            <h1 className={"text-3xl mb-4"}>{currentCard!.question}</h1>
                            <div className={"flex flex-col"}>
                                <Input id={"answer"} value={answer} onChange={e => setAnswer(e.target.value)}
                                       onEnter={() => handleEnter()}/>
                            </div>
                        </div>
                    </> :
                    <div className={"flex flex-col items-center"}>
                        <h1 className={"text-5xl mb-5"}>Results ({results.length})</h1>
                        {results.map(result => {
                            console.log("cards: " + data.cards)
                            console.log("result: " + result.card)
                            const card = data.cards!.find(card => card.id == result.card)!

                            return (
                                <div className={"w-[512px] my-1.5"} key={card.id}>
                                    <div
                                        className={"flex flex-col rounded-xl shadow py-4 px-5 border hover:border-violet-500 hover:cursor-pointer hover:scale-[102%] transition-all"}>
                                        <div className={"flex justify-between"}>
                                            <div className={"flex mb-2"}>
                                                {card.question}
                                            </div>

                                            <div className={"flex flex-col"}>
                                                {card.answers.join("; ")}
                                            </div>
                                        </div>

                                        <div>
                                            Answers given; {result.attempts.join(", ")}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
            </div>
        </>
    )
}
