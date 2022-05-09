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
                            return <Checkbox checked={node.checked}/>
                        default:
                            return <input type={node.type}/>
                    }
                },
                ol: (node) => <ol className={"list-disc list-inside"} role={"list"}>{node.children}</ol>,
                ul: (node) => <ul className={"list-disc list-inside"} role={"list"}>{node.children}</ul>,
                h1: (node) => <h1 className={"text-4xl font-semibold"}>{node.children}</h1>,
                h2: (node) => <h2 className={"text-3xl font-semibold"}>{node.children}</h2>,
                h3: (node) => <h3 className={"text-2xl font-semibold"}>{node.children}</h3>,
                h4: (node) => <h4 className={"text-xl font-semibold"}>{node.children}</h4>,
                h5: (node) => <h5 className={"text-lg font-semibold"}>{node.children}</h5>,
                h6: (node) => <h6 className={"text-md font-semibold"}>{node.children}</h6>
            }}>
                {props.children}
            </ReactMarkdown>
        </div>
    )
}
