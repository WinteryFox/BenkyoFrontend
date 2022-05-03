import {
    CardRequest,
    ColumnData,
    DeckData,
    deleteDeck,
    getCards,
    getDeck
} from "../../src/Api";
import {GetStaticPaths, GetStaticProps} from "next";
import Image from "next/image";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Button from "../../components/Button";
import {useTranslation} from "next-i18next";
import Head from "next/head"
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useRouter} from "next/router";
import Markdown from "../../components/Markdown";
import DefaultErrorPage from "next/error"
import {useSelector} from "react-redux";
import {RootState} from "../../src/UserStore";
import {languageFromCode} from "../../src/languages";

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
    const user = useSelector((state: RootState) => state.userState.user)
    const translation = useTranslation()
    const t = translation.t
    const router = useRouter()
    const {id} = router.query
    const queryClient = useQueryClient()

    const deckQuery = useQuery<DeckData>(
        ['deck', id],
        async () => await getDeck(id as string)
    )

    const deleteDeckMutation = useMutation<void>(
        () => deleteDeck(id as string), {
            onSuccess: async () => {
                await queryClient.invalidateQueries(['deck', id])
                await router.push('/')
            }
        })

    const cardsQuery = useQuery<CardRequest>(
        ['cards', id],
        async () => await getCards(id as string)
    )

    if (deckQuery.isLoading)
        return "Loading..."
    if (deckQuery.error)
        return "Oops..."
    if (!deckQuery.data)
        return <DefaultErrorPage statusCode={404}/>
    if (!cardsQuery.data)
        return <DefaultErrorPage statusCode={404}/>

    return (
        <>
            <Head>
                <title>{deckQuery.data.name} | Benkyo</title>
                <meta name={"description"} content={deckQuery.data.description}/>
                <meta property={"og:description"} content={deckQuery.data.description}/>
            </Head>

            <div className={"w-full h-full flex justify-center dark:bg-black"}>
                <div className={"flex flex-col lg:flex-row pt-8 pb-4 px-10 lg:w-[1024px]"}>
                    <div className={"flex flex-col items-center md:p-3 pb-3 rounded-xl md:mr-4 shrink-0"}>
                        <div className={"relative w-[11em] h-[11em]"}>
                            <Image src={"/logo.svg"} alt={"Deck image"} layout={"fill"} className={"rounded-3xl"}/>
                            <i className={`absolute -bottom-2 -right-2 fp fp-square rounded-full fp-lg ${deckQuery.data.targetLanguage.substr(3, 5).toLowerCase()}`}
                               title={deckQuery.data.targetLanguage}/>
                        </div>

                        <div className={"flex flex-col md:flex-row lg:flex-col lg:w-full w-full mt-4"}>
                            <Button
                                className={"flex lg:mr-0 mr-1.5 btn-icon bg-violet-200 hover:bg-violet-500 active:bg-violet-400 active:scale-95 hover:text-white hover:shadow-lg hover:shadow-violet-500/30 transition-all dark:active:bg-violet-600 dark:text-white dark:bg-gray-900 hover:bg-violet-800"}
                                onClick={() => {navigator.clipboard.writeText(window.location.href).then()}}
                                id={"delete-deck"}>
                                {t("copy-link")} <i className={"material-icons"}>link</i>
                            </Button>
                            {user != null && deckQuery.data.author == user.id && (
                                <>
                                    <Button
                                        className={"flex btn-icon mt-1.5 md:mt-0 lg:mt-1.5 lg:mr-0 mr-1.5 bg-gray-200 hover:bg-gray-400 active:bg-gray-300 active:active:scale-95 hover:text-white hover:shadow-lg hover:shadow-gray-500/30 transition-all dark:active:bg-gray-600 dark:text-white dark:bg-gray-900 dark:hover:bg-gray-700"}
                                        onClick={() => {
                                        }}
                                        id={"delete-deck"}>
                                        {t("edit")} <i className={"material-icons"}>edit</i>
                                    </Button>
                                    <Button
                                        className={"flex btn-icon mt-1.5 md:mt-0 lg:mt-1.5 items-center bg-rose-200 hover:bg-rose-500 active:bg-rose-400 active:active:scale-95 hover:text-white hover:shadow-lg hover:shadow-rose-500/30 transition-all dark:text-white dark:active:bg-rose-600 dark:hover:bg-rose-700 dark:bg-rose-900"}
                                        onClick={() => deleteDeckMutation.mutate()}
                                        id={"delete-deck"}>
                                        {t("delete")} <i className={"material-icons"}>delete</i>
                                    </Button>
                                </>)}
                        </div>
                    </div>

                    <div className={"flex flex-col w-full"}>
                        <div className={"flex justify-between"}>
                            <div className={"flex w-full justify-between items-center"}>
                                <div className={"flex w-full flex-col"}>
                                    <div className={"text-xs text-gray-400 italic dark:text-gray-300"}>
                                        {t("created-at", {date: new Date(deckQuery.data.createdAt).toLocaleDateString()})}
                                    </div>

                                    <div className={"flex text-4xl font-semibold dark:text-white"} tabIndex={0}>
                                        {deckQuery.data.name}
                                    </div>

                                    <div className={"flex flex-col md:flex-row mt-1 text-lg mb-3 dark:text-black"}>
                                        <div className={"flex md:mb-0 mb-1.5 select-none bg-emerald-100 rounded-full px-5 py-1.5 md:mr-2 dark:text-white dark:bg-emerald-800"}
                                             tabIndex={0}>
                                            {languageFromCode(deckQuery.data.sourceLanguage, translation.i18n.language)}
                                        </div>
                                        <div className={"flex md:mb-0 mb-1.5 select-none bg-emerald-100 rounded-full px-5 py-1.5 md:mr-2 dark:text-white dark:bg-emerald-800"}
                                             tabIndex={0}>
                                            {languageFromCode(deckQuery.data.targetLanguage, translation.i18n.language)}
                                        </div>
                                        <div className={"flex select-none bg-emerald-100 rounded-full px-5 py-1.5 dark:text-white dark:bg-emerald-800"}
                                             tabIndex={0}>
                                            {t("word-list", {count: cardsQuery.data.cards.length})}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div tabIndex={0} className={"leading-5 dark:text-white"}>
                            <Markdown>
                                {deckQuery.data.description}
                            </Markdown>
                        </div>

                        {!cardsQuery.isLoading &&
                            <>
                                <div className={"w-full mt-4"}>
                                    <Button
                                        id={"study"}
                                        className={"text-white text-lg bg-violet-600 hover:bg-violet-500 active:bg-violet-400 active:scale-95 hover:shadow-lg hover:shadow-violet-500/30 dark:active:bg-violet-600 dark:bg-violet-800 dark:hover:bg-violet-700"}
                                        onClick={() => router.push(`/study/${id}`)}
                                        disabled={cardsQuery.data!.cards.length == 0}>
                                        {t("start-deck")}
                                    </Button>
                                </div>

                                <div className={"sticky top-0 dark:text-white"}>
                                    <div className={"sticky top-2 rounded-full shadow mt-3 dark:border-white dark:shadow-gray-600"}>
                                        <table className={"text-lg mb-0 table-fixed w-full border-collapse"}>
                                            <thead>
                                            <tr>
                                                {cardsQuery.data?.columns.map((column: ColumnData) =>
                                                    <th key={column.id} className={"text-left py-2 px-4"} tabIndex={0}>
                                                        {column.name}
                                                    </th>
                                                )}
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>

                                <table className={"text-lg mb-3 mt-0 table-fixed w-full dark:text-white"}>
                                    <tbody>
                                    {cardsQuery.data.cards.sort((a, b) => a.ordinal > b.ordinal ? 1 : -1).map((card) =>
                                        <tr key={card.id}>
                                            {card.data.sort((a, b) => a.ordinal > b.ordinal ? 1 : -1).map((data) =>
                                                <td key={data.column} className={"py-2 px-4"} tabIndex={0}>
                                                    {data.src.join("; ")}
                                                </td>
                                            )}
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
