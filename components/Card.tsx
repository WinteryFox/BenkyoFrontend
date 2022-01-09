import {CardData} from "../src/Api";

export default function Card(props: {
    card: CardData
}) {
    return (
        <div className={"flex flex-col justify-center rounded-xl shadow py-4 px-5 border hover:border-violet-500 hover:cursor-pointer hover:scale-[102%] transition-all"}>
            <div className={"flex mb-2"}>
                {props.card.question}
            </div>

            <div className={"flex flex-col"}>
                {props.card.answers.join("; ")}
            </div>
        </div>
    )
}
