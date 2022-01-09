import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {DeckData, getDecks} from "../src/Api";
import DeckPreview from "../components/DeckPreview";
import {GetStaticProps} from "next";
import {useQuery} from "react-query";
import DefaultErrorPage from "next/error";
import {useSelector, useStore} from "react-redux";
import {RootState} from "../src/UserStore";
import {useRouter} from "next/router";

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
    const router = useRouter()
    const {t} = useTranslation()
    const user = useSelector((state: RootState) => state.userState.user)

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

    async function createDeck() {
        if (!user)
            return await router.push("/login")

        return await router.push("/decks/create")
    }

    return (
        <div className={"flex flex-wrap justify-center m-6"}>
            {data.decks?.map((deck) => (
                <DeckPreview key={deck.id.toString()} deck={deck}/>
            ))}

            <button className={"flex m-2 w-72 h-[296px] flex-col p-4 rounded bg-white shadow border items-center justify-center text-5xl cursor-pointer hover:border-violet-500 hover:scale-[102%] transition-all"}
            onClick={createDeck}>
                +
            </button>
        </div>
    )
}
