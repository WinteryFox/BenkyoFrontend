import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkParse from "remark-parse";
import Checkbox from "./Checkbox";

export default function Markdown(props: {
    children: string
}) {
    return (
        <div>
            <ReactMarkdown remarkPlugins={[remarkParse, remarkGfm, remarkBreaks]} components={{
                a: (node) =>
                    <a href={node.href} className={"text-pink-500 hover:text-pink-400"}>{node.children}</a>,
                input: (node) => {
                    switch (node.type) {
                        case "checkbox":
                            return <Checkbox id={""} checked={node.checked}/>
                        default:
                            return <input type={node.type}/>
                    }
                },
                ol: (node) => <ol className={"list-disc list-inside"} role={"list"}>{node.children}</ol>,
                ul: (node) => <ul className={"list-disc list-inside"} role={"list"}>{node.children}</ul>,
                h1: (node) => <h1 className={"text-3xl font-semibold"}>{node.children}</h1>,
                h2: (node) => <h1 className={"text-2xl font-semibold"}>{node.children}</h1>,
                h3: (node) => <h1 className={"text-xl font-semibold"}>{node.children}</h1>,
                h4: (node) => <h1 className={"text-lg font-semibold"}>{node.children}</h1>,
                h5: (node) => <h1 className={"text-base font-semibold"}>{node.children}</h1>
            }}>
                {props.children}
            </ReactMarkdown>
        </div>
    )
}
