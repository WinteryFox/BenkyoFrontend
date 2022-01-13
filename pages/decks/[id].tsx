import {CardCreateRequest, CardData, createCard, DeckData, deleteDeck, getCards, getDeck} from "../../src/Api";
import {GetStaticPaths, GetStaticProps} from "next";
import Image from "next/image";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Button from "../../components/Button";
import {useTranslation} from "next-i18next";
import Card from "../../components/Card";
import Head from "next/head"
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useRouter} from "next/router";
import Markdown from "../../components/Markdown";
import DefaultErrorPage from "next/error"
import {useSelector} from "react-redux";
import {RootState} from "../../src/UserStore";
import {useState} from "react";
import Input from "../../components/Input";

interface Props {
    deck: DeckData | null
    cards: Array<CardData> | null
}

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
    const {t} = useTranslation()
    const router = useRouter()
    const {id} = router.query
    const [editCard, setEditCard] = useState<string | null>(null)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const queryClient = useQueryClient()

    const {isLoading, error, data} = useQuery<Props>(
        `deck_${id}`,
        async () => {
            return {
                deck: await getDeck(id! as string),
                cards: await getCards(id! as string)
            }
        }
    )

    const mutateCards = useMutation(async (request: CardCreateRequest) => {
        return await createCard(data!.deck!.id, request)
    }, {
        onSuccess: (d) => {
            queryClient.setQueryData(`deck_${id}`, [data!.deck, [...data!.cards!, d]])
        }
    })

    async function create() {
        await createCard(data!.deck!.id, {question, answers: [answer]})
        setEditCard(null)
        setQuestion("")
        setAnswer("")
        router.reload() // TODO
    }

    async function del() {
        await deleteDeck(data!.deck!.id)
        await router.push("/")
    }

    if (isLoading)
        return "Loading..."
    if (error)
        return "Oops..."
    if (!data || !data.deck || !data.cards)
        return <DefaultErrorPage statusCode={404}/>

    return (
        <>
            <Head>
                <title>{data.deck.name} | Benkyo</title>
                <meta name={"description"} content={data.deck.description}/>
                <meta property={"og:description"} content={data.deck.description}/>
            </Head>

            <div className={"w-full h-full flex justify-center"}>
                <div className={"flex flex-col lg:flex-row pt-8 pb-4 px-10 lg:w-[1024px]"}>
                    <div className={"flex lg:flex-col items-center md:p-3 pb-3 rounded-xl md:mr-4 shrink-0"}>
                        <div className={"relative w-32 h-32"}>
                            <Image src={"/logo.svg"} alt={"Deck image"} layout={"fill"} className={"rounded-3xl"}/>
                            <i className={`absolute -bottom-2 -right-2 fp fp-square rounded-full fp-lg ${data.deck.targetLanguage.substr(3, 5).toLowerCase()}`}
                               title={data.deck.targetLanguage}/>
                        </div>
                    </div>

                    <div className={"flex flex-col w-full"}>
                        <div className={"flex justify-between"}>
                            <div className={"flex justify-between items-center"}>
                                <div className={"flex flex-col"}>
                                    <div className={"text-xs text-gray-400 italic"}>
                                        {t("created-at", {date: new Date(data.deck.createdAt).toLocaleDateString()})}
                                    </div>

                                    <div className={"flex text-4xl font-semibold"}>
                                        {data.deck.name}
                                    </div>
                                </div>
                            </div>

                            {user != null && data.deck.author == user.id &&
                                <button
                                    className={"rounded-full w-10 h-10 hover:text-red-500 hover:bg-red-300 hover:bg-opacity-30 transition-all duration-200"}
                                    onClick={() => del()}
                                    id={"delete-deck"}>
                                    <i className={"material-icons text-3xl"}>delete</i>
                                </button>}
                        </div>

                        <div>
                            <Markdown>
                                {data.deck.description}
                            </Markdown>
                        </div>

                        <div className={"w-full mt-2"}>
                            <Button
                                id={"study"}
                                className={"text-white bg-violet-600 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/30"}
                                onClick={() => router.push(`/study/${id}`)} disabled={data.cards.length == 0}>
                                {t("start-deck")}
                            </Button>
                        </div>

                        <div className={"flex flex-col w-full mb-3 mt-4"}>
                            <p className={"flex text-lg font-semibold"}>
                                {t("word-list", {count: data.cards.length})}
                            </p>
                            <div className={"flex flex-col items-center w-full"}>
                                {data.cards.map((card: CardData) => (
                                    <div className={"w-full my-1.5"} key={card.id}>
                                        <Card card={card} deckId={data!.deck!.id}
                                              isAuthor={data!.deck!.author == user?.id}/>
                                    </div>
                                ))}
                                {data.deck.author == user?.id &&
                                    <div className={"w-full my-1.5"}>
                                        <div
                                            className={"flex py-3 mb-2 text-5xl justify-center rounded-xl shadow py-4 px-5 border hover:border-violet-500 hover:cursor-pointer hover:scale-[102%] transition-all"}>
                                            {editCard == null && (
                                                <button className={"w-full h-full"} id={"create-card"}
                                                        onClick={() => setEditCard("-1")}>
                                                    +
                                                </button>)}
                                            {editCard == "-1" && (
                                                <div className={"flex flex-col w-full"}>
                                                    <Input id={"question"} value={question}
                                                           onChange={e => setQuestion(e.target.value)}>
                                                        {t("question")}
                                                    </Input>
                                                    <Input id={"answer"} value={answer}
                                                           onChange={e => setAnswer(e.target.value)}>
                                                        {t("answers")}
                                                    </Input>
                                                    <Button id={"submit-card"}
                                                            className={"btn btn-violet text-base mt-2"}
                                                            onClick={() => create()}>
                                                        {t("save")}
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
