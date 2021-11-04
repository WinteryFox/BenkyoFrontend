export default function Flag(props: {
    code: string
}) {
    return (
        <i className={`fp fp-rounded fp-lg ${props.code.substr(3, 5).toLowerCase()}`}
           title={props.code}/>
    )
}
