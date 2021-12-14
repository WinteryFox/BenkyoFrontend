import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {DeckData, getCards, getDeck} from "../../src/Api";

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!))
        }
    }
}

interface Props {
    deck: DeckData
}

export default function Study() {
    const {t} = useTranslation()
    const router = useRouter()
    const {id} = router.query

    const {isLoading, error, data} = useQuery<Props>(
        `study_${id}`,
        async () => {
            return {
                deck: await getDeck(id![0]),
                cards: await getCards(id![0])
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
        </>
    )
}
