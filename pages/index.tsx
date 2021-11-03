import Head from 'next/head'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {Deck, getDecks} from "../src/Api";
import DeckPreview from "../components/DeckPreview";

export async function getStaticProps({locale}: any) {
    const decks = await getDecks()

    return {
        props: {
            ...(await serverSideTranslations(locale)),
            decks
        },
    }
}

export default function Home(props: {
    decks: Array<Deck>
}) {
    const {t} = useTranslation()

    return (
        <div className={"flex flex-wrap justify-center m-10"}>
            <Head>
                <title>Benkyo</title>
                <link rel={"shortcut icon"} type={"image/svg"} href={"/logo.svg"}/>
            </Head>

            {props.decks.map((deck) => (
                <div key={deck.id.toString()} className={"mr-6 mb-6 w-96"}>
                    <DeckPreview deck={deck}/>
                </div>
            ))}
        </div>
    )
}
