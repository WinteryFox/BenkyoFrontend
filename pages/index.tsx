import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {DeckData, getDecks} from "../src/Api";
import DeckPreview from "../components/DeckPreview";
import {GetStaticProps} from "next";
import {useQuery} from "react-query";

interface Props {
    decks: Array<DeckData>
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!))
        }
    }
}

export default function Home() {
    const {t} = useTranslation()

    const {isLoading, error, data} = useQuery<Props>("search_decks", async () => {
        return {
            decks: await getDecks()
        }
    })

    if (isLoading)
        return 'Loading...'
    if (error)
        return 'Oops...'
    if (!data)
        return '404'

    return (
        <div className={"flex flex-wrap justify-center m-10"}>
            {data.decks.map((deck) => (
                <div key={deck.id.toString()} className={"mr-6 mb-6 w-96"}>
                    <DeckPreview deck={deck}/>
                </div>
            ))}
        </div>
    )
}
