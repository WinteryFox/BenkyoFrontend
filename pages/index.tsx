import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {DeckData, getDecks} from "../src/Api";
import DeckPreview from "../components/DeckPreview";
import {GetStaticProps} from "next";

interface Props {
    decks: Array<DeckData>
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const decks = await getDecks()

    return {
        props: {
            ...(await serverSideTranslations(context.locale!)),
            decks
        }
    }
}

export default function Home(props: Props) {
    const {t} = useTranslation()

    return (
        <div className={"flex flex-wrap justify-center m-10"}>
            {props.decks.map((deck) => (
                <div key={deck.id.toString()} className={"mr-6 mb-6 w-96"}>
                    <DeckPreview deck={deck}/>
                </div>
            ))}
        </div>
    )
}
