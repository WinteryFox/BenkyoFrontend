import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkParse from "remark-parse";
import { useRemark } from "react-remark";
import Checkbox from "./Checkbox";
import {HTMLProps, useEffect} from "react";
import {ComponentProps} from "rehype-react";

export default function Markdown(props: {
    source: string
}) {
    const [markdown, setSource] = useRemark({
        remarkPlugins: [remarkGfm, remarkBreaks, remarkParse],
        rehypeReactOptions: {
            components: {
                a: (props: ComponentProps) =>
                    <a className={"text-pink-500 hover:text-pink-400"} {...props}/>,
                input: (props: HTMLProps<HTMLInputElement> & {node?: Node}) => {
                    switch (props) {
                        case "checkbox":
                            return <Checkbox checked={props.checked} disabled={props.disabled}/>
                        default:
                            return <input type={props.type} {...props}/>
                    }
                },
                ol: (props: ComponentProps) => <ol className={"list-disc list-inside"} role={"list"} {...props}/>,
                ul: (props: ComponentProps) => <ul className={"list-disc list-inside"} role={"list"} {...props}/>,
                h1: (props: ComponentProps) => <h1 className={"text-4xl font-semibold mb-2"} {...props}/>,
                h2: (props: ComponentProps) => <h2 className={"text-3xl font-semibold mb-2"} {...props}/>,
                h3: (props: ComponentProps) => <h3 className={"text-2xl font-semibold mb-2"} {...props}/>,
                h4: (props: ComponentProps) => <h4 className={"text-xl font-semibold mb-2"} {...props}/>,
                h5: (props: ComponentProps) => <h5 className={"text-lg font-semibold mb-2"} {...props}/>,
                h6: (props: ComponentProps) => <h6 className={"text-md font-semibold mb-2"} {...props}/>
            }
        }
    })

    useEffect(() => setSource(props.source), [setSource, props.source])

    return markdown
}
