import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {DeckData, getDeckImage, getDecks} from "../src/Api";
import {GetStaticProps} from "next";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import SkeletonDiv from "../components/SkeletonDiv";
import ImageWithFallback from "../components/ImageWithFallback";
import logo from "../public/logo.svg";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import AxiosErrorPage from "../components/AxiosErrorPage";

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!))
        }
    }
}

export default function Home() {
    const {t} = useTranslation()
    const {isLoading, error, data} = useQuery<Array<DeckData>, AxiosError>("search_decks", async () => await getDecks())

    if (error)
        return <AxiosErrorPage error={error}/>
    else if (isLoading)
        return <div className={"flex flex-wrap m-6 md:mx-20 justify-center"}>
            {[...Array(50)].map((value, index) =>
                <div key={index}
                     className={"flex grow-0 select-none m-2 w-72 h-[332px] flex-col p-4 rounded-3xl border border-gray-200 dark:border-gray-600"}>
                    <div className={"flex justify-center"}>
                        <SkeletonDiv className={"flex rounded-3xl w-40 h-40"}/>
                    </div>
                    <SkeletonDiv className={"mt-2 w-full h-10 rounded"}/>
                    <SkeletonDiv className={"mt-1 w-1/2 h-3 rounded"}/>
                    <SkeletonDiv className={"mt-1 w-full h-5 rounded"}/>
                    <SkeletonDiv className={"mt-1 w-full h-5 rounded"}/>
                    <SkeletonDiv className={"mt-1 w-2/3 h-5 rounded"}/>
                </div>)}
        </div>
    else
        return (
            <div className={"flex flex-wrap m-6 md:mx-20 justify-center"}>
                {data!.map((deck: DeckData) => (
                    <Link href={`/decks/${deck.id}`} key={deck.id}>
                        <a className={"flex grow-0 select-none m-2 w-72 h-[332px] flex-col p-4 rounded-3xl bg-white hover:border shadow-md border border-gray-200 hover:border-violet-300 hover:scale-105 active:scale-100 hover:shadow-2xl hover:border-violet-400 transition-all active:bg-gray-100 dark:bg-black dark:text-white dark:border-gray-600 dark:active:bg-gray-800 dark:shadow-md dark:shadow-gray-600 dark:hover:shadow-lg dark:hover:shadow-violet-800"}>
                            <div className={"flex justify-center"}>
                                <div className={"relative w-40 h-40"}>
                                    <ImageWithFallback src={getDeckImage(deck.imageHash)} alt={"Deck image"}
                                                       layout={"fill"} className={"rounded-3xl"} placeholder={logo}/>
                                    <i className={`border flag:${deck.targetLanguage.slice(3, 5).toUpperCase()} absolute -bottom-2 -right-2 text-4xl shadow rounded-full`}/>
                                </div>
                            </div>
                            <div className={"mt-2 font-semibold text-xl break-after-all"}>
                                {deck.name}
                            </div>
                            {/*deck.author == "0" && (
                        <i className={"ml-1"} title={"Verified"}>
                            <Image src={verified} alt={"Verified"} width={16} height={16}/>
                        </i>)*/ // TODO
                            }
                            <div className={"text-xs text-gray-400"}>
                                {t("created-at", {date: new Date(deck.createdAt).toLocaleDateString()})}
                            </div>
                            <div className={"text-ellipsis overflow-hidden"}>
                                {deck.shortDescription}
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        )
}
