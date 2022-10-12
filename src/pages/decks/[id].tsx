import {
    CardRequest,
    ColumnData,
    DeckData,
    deleteDeck,
    getCards,
    getDeck, getDeckImage
} from "../../Api";
import {GetStaticPaths, GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Button from "../../components/Button";
import {useTranslation} from "next-i18next";
import Head from "next/head"
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useRouter} from "next/router";
import Markdown from "../../components/Markdown";
import {languageFromCode} from "../../languages";
import logo from "../../../public/logo.svg";
import Dialog from "../../components/Dialog";
import DefaultErrorPage from "next/error";
import {AxiosError} from "axios";
import ImageWithFallback from "../../components/ImageWithFallback";
import {useRef} from "react";
import SkeletonDeck from "../../components/skeleton/SkeletonDeck";
import {userQuery} from "../../Queries";


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
    const user = useQuery("user", userQuery)
    const translation = useTranslation()
    const t = translation.t
    const router = useRouter()
    const {id} = router.query
    const queryClient = useQueryClient()
    const deleteRef = useRef<HTMLDialogElement>(null)

    const deckQuery = useQuery<DeckData, AxiosError>(
        ['deck', id],
        async () => await getDeck(id as string)
    )

    const deleteDeckMutation = useMutation<void, AxiosError>(
        () => deleteDeck(id as string), {
            onSuccess: async () => {
                await router.push('/')
                await queryClient.invalidateQueries(['deck', id])
            }
        })

    const cardsQuery = useQuery<CardRequest, AxiosError>(
        ['cards', id],
        async () => await getCards(id as string)
    )

    if (deckQuery.error)
        return <DefaultErrorPage statusCode={deckQuery.error.response!.status}/>
    else if (cardsQuery.error)
        return <DefaultErrorPage statusCode={cardsQuery.error.response!.status}/>

    if (deckQuery.isLoading || cardsQuery.isLoading)
        return <div className={"loading-container"}>
            <SkeletonDeck/>
        </div>
    else
        return (<>
            <Head>
                <title>{deckQuery.data?.name}</title>
                <meta name={"description"} content={deckQuery.data?.description}/>
                <meta property={"og:description"} content={deckQuery.data?.description}/>
            </Head>

            <div className={"flex flex-col lg:flex-row pt-8 pb-4 px-10 mx-auto lg:w-[1024px]"}>
                <div className={"flex flex-col items-center md:p-3 pb-3 rounded-xl md:mr-4 shrink-0"}>
                    <div className={"relative w-[11em] h-[11em]"}>
                        <ImageWithFallback src={getDeckImage(deckQuery.data?.imageHash)} placeholder={logo}
                                           alt={"Deck image"} layout={"fill"} className={"rounded-3xl"}
                                           priority/>
                        <i className={`border flag:${deckQuery.data!.targetLanguage.slice(3, 5).toUpperCase()} absolute -bottom-2 -right-2 text-4xl shadow rounded-full`}/>
                    </div>

                    <div className={"flex flex-col md:flex-row lg:flex-col lg:w-full w-full mt-4"}>
                        {deckQuery.data?.author == user.data?.id && (
                            <>
                                <Button
                                    className={"flex btn-icon mt-1.5 md:mt-0 lg:mt-1.5 lg:mr-0 mr-1.5 bg-amber-100 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-violet-500/30 transition-all dark:text-white dark:bg-cyan-600 dark:hover:bg-cyan-700"}
                                    onClick={() => {
                                    }}
                                    id={"edit-deck"}>
                                    {t("edit")} <i className={"material-icons"}>edit</i>
                                </Button>
                                <Button
                                    className={"flex btn-icon mt-2 md:mt-0 lg:mt-2 items-center bg-rose-200 hover:bg-rose-700 hover:text-white hover:shadow-lg hover:shadow-violet-500/30 transition-all dark:text-white dark:bg-rose-600 dark:hover:bg-rose-700"}
                                    onClick={() => deleteRef.current?.showModal()}
                                    id={"delete-deck"}>
                                    {t("delete")} <i className={"material-icons"}>delete</i>
                                </Button>
                                <Dialog ref={deleteRef}>
                                    <div className={"text-2xl pb-2 font-bold dark:text-white"}>
                                        {t("delete-title-prompt")}
                                    </div>
                                    <div className={"pb-2 md:pb-5 text-lg dark:text-white"}>
                                        {t("delete-desc-prompt")}
                                    </div>
                                    <form method="dialog">
                                        <menu className={"flex space-x-3"}>
                                            <Button
                                                className={"flex text-lg mt-2 md:mt-0 lg:mt-2 items-center bg-rose-200 hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-violet-500/30 transition-all dark:text-white dark:bg-rose-600 dark:hover:bg-rose-600/80"}
                                                onClick={() => deleteDeckMutation.mutate()}>
                                                {t("delete-confirm")}
                                            </Button>
                                        </menu>
                                    </form>
                                </Dialog>
                            </>)}
                    </div>
                </div>

                <div className={"flex flex-col w-full"}>
                    <div className={"flex justify-between"}>
                        <div className={"flex w-full justify-between items-center"}>
                            <div className={"flex w-full flex-col"}>
                                <div className={"text-xs text-gray-400 dark:text-gray-300"}>
                                    {t("created-at", {date: new Date(deckQuery.data!.createdAt).toLocaleDateString()})}
                                </div>

                                <div className={"flex text-4xl font-semibold dark:text-white"} tabIndex={0}>
                                    {deckQuery.data?.name}
                                </div>

                                <div className={"flex flex-col md:flex-row mt-1 text-lg mb-3 dark:text-black"}>
                                    <div
                                        className={"flex md:mb-0 mb-1.5 select-none bg-emerald-100 rounded-full px-5 py-1.5 md:mr-2 dark:text-white dark:bg-emerald-700"}
                                        tabIndex={0}>
                                        {languageFromCode(deckQuery.data!.sourceLanguage, translation.i18n.language)}
                                    </div>
                                    <div
                                        className={"flex md:mb-0 mb-1.5 select-none bg-emerald-100 rounded-full px-5 py-1.5 md:mr-2 dark:text-white dark:bg-emerald-700"}
                                        tabIndex={0}>
                                        {languageFromCode(deckQuery.data!.targetLanguage, translation.i18n.language)}
                                    </div>
                                    <div
                                        className={"flex select-none bg-emerald-100 rounded-full px-5 py-1.5 dark:text-white dark:bg-emerald-700"}
                                        tabIndex={0}>
                                        {t("word-list", {count: cardsQuery.data?.cards.length ?? 0})}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Markdown source={deckQuery.data!.description}/>

                    <div className={"w-full mt-4"}>
                        <Button
                            id={"study"}
                            className={"mb-3 text-white text-lg bg-violet-600 hover:bg-violet-500 active:bg-violet-400 active:scale-95 hover:shadow-lg hover:shadow-violet-500/30 dark:active:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700"}
                            onClick={() => router.push(`/study/${id}`)}
                            disabled={cardsQuery.data?.cards.length == 0 || user.isLoading || !user.data}>
                            {t("start-deck")}
                        </Button>
                    </div>

                    <table className={"table-fixed w-full"}>
                        <thead
                            className={"sticky top-2 shadow border dark:border-white dark:shadow-gray-600 rounded-full text-lg"}>
                        <tr>
                            {cardsQuery.data!.columns.map((column: ColumnData) =>
                                <th key={column.id} className={"text-left p-2 break-words"}
                                    tabIndex={0}>
                                    {column.name}
                                </th>)}
                        </tr>
                        </thead>

                        <tbody>
                        {cardsQuery.data?.cards.sort((a, b) => a.ordinal > b.ordinal ? 1 : -1).map((card) =>
                            <tr key={card.id}>
                                {card.data.sort((a, b) => a.ordinal > b.ordinal ? 1 : -1).map((data) =>
                                    <td key={data.column} className={"align-baseline p-2 break-words"}
                                        tabIndex={0}>
                                        {data.src.join("; ")}
                                    </td>
                                )}
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>)
}
