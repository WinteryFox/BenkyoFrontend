import {CardData} from "../src/Api";

export default function Card(props: {
    card: CardData
}) {
    return (
        <div className={"flex flex-col justify-center rounded-xl shadow py-3 px-5"}>
            <div className={"flex my-2"}>
                {props.card.question}
            </div>

            <div className={"flex flex-col"}>
                {props.card.answers.join("; ")}
            </div>
        </div>
    )
}
