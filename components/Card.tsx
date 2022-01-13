import {CardData, deleteCard} from "../src/Api";
import {useRouter} from "next/router";

export default function Card(props: {
    isAuthor: boolean
    deckId: string
    card: CardData
}) {
    const router = useRouter()

    async function del() {
        await deleteCard(props.deckId, props.card.id)
        await router.reload() // TODO
    }

    return (
        <div
            className={"flex justify-between rounded-xl shadow py-4 px-5 border hover:border-violet-500 hover:cursor-pointer hover:scale-[102%] transition-all"}>
            <div className={"flex flex-col"}>
                <div className={"flex mb-2"}>
                    {props.card.question}
                </div>

                <div className={"flex flex-col"}>
                    {props.card.answers.join("; ")}
                </div>
            </div>

            {props.isAuthor &&
                <button
                    className={"rounded-full w-10 h-10 hover:text-red-500 hover:bg-red-300 hover:bg-opacity-30 transition-all duration-200"}
                    onClick={() => del()}
                    id={"delete-card"}>
                    <i className={"material-icons text-3xl"}>delete</i>
                </button>}
        </div>
    )
}
