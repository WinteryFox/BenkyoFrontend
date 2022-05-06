import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {DeckData, getDecks} from "../src/Api";
import DeckPreview from "../components/DeckPreview";
import {GetStaticProps} from "next";
import {useQuery} from "react-query";
import DefaultErrorPage from "next/error";

interface Props {
    decks: Array<DeckData> | null
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!))
        }
    }
}

export default function Home() {
    const {isLoading, error, data} = useQuery<Props>("search_decks", async () => {
        return {
            decks: await getDecks()
        }
    })

    if (isLoading)
        return 'Loading...'
    if (error) {
        console.log(error)
        /*return <DefaultErrorPage statusCode={(error as AxiosError).response!.data.error}/>*/
        return 'error'
    }
    if (!data)
        return <DefaultErrorPage statusCode={404}/>

    return (
        <div className={"flex flex-wrap m-6 md:mx-20 justify-center w-full"}>
            {data.decks?.map((deck) => (
                <DeckPreview key={deck.id.toString()} deck={deck}/>
            ))}
        </div>
    )
}
