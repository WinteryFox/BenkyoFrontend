import {GetStaticPaths, GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {CardData, DeckData, getDeck, getNewCards} from "../../src/Api";
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
    const [answer, setAnswer] = useState("")
    const [cardsLeft, setCardsLeft] = useState<Array<CardData> | null>(null)
    const [currentCard, setCurrentCard] = useState<CardData | null>(null)

    const {t} = useTranslation()
    const router = useRouter()
    const {id} = router.query

    const {isLoading, error, data} = useQuery<Props>(
        `study_${id}`,
        async () => {
            const deck = await getDeck(id! as string)
            const cards = await getNewCards(id! as string)

            if (deck && cards) {
                setCurrentCard(cards[0])
                cards.shift()
                setCardsLeft(cards)
            }
            return {
                deck,
                cards
            }
        }
    )

    if (isLoading)
        return "Loading..."
    if (error)
        return "Oops..."
    if (!data || !data.deck || !data.cards)
        return <DefaultErrorPage statusCode={404}/>

    if (data.cards.length == 0)
        router.push("/").then() // TODO: Show session stats

    if (!currentCard || !cardsLeft)
        return "Unknown error..."

    function handleEnter() {
        if (currentCard!.answers.filter((v) => answer.toLowerCase() == v.toLowerCase()).length > 0) {
            const temp = [...cardsLeft!]
            temp.shift()
            setCardsLeft(temp)
            if (cardsLeft!.length == 0) {
                console.log("Session has finished!")
                return
            }

            setCurrentCard(cardsLeft![0])
        } else {
            console.log("Incorrect!")
        }
    }

    return (
        <>
            <Head>
                <title>Benkyo | {data.deck.name}</title>
            </Head>

            <div>
                {cardsLeft.map(v => (
                    <div key={v.id}>{v.question}</div>
                ))}
                <h1>{currentCard.question} ({cardsLeft.length})</h1>
                <Input id={"answer"} value={answer} onChange={e => setAnswer(e.target.value)}
                       onEnter={() => handleEnter()}/>
            </div>
        </>
    )
}
