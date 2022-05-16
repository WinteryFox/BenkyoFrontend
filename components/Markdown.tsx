import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import {useRemark} from "react-remark";
import Checkbox from "./Checkbox";
import {ComponentProps, HTMLProps, useEffect} from "react";

export default function Markdown(props: {
    source: string
}) {
    const [markdown, setSource] = useRemark({
        remarkPlugins: [remarkGfm, remarkParse],
        rehypeReactOptions: {
            components: {
                input: (props: HTMLProps<HTMLInputElement> & { node?: Node }) => {
                    switch (props.type) {
                        case "checkbox":
                            return <Checkbox checked={props.checked} disabled={true}/>
                        default:
                            return <input type={props.type} {...props}/>
                    }
                },
                a: (props: ComponentProps<any>) => <a target={"_blank"} {...props}/>
            }
        }
    })

    useEffect(() => setSource(props.source), [setSource, props.source])

    return (
        <div className={"prose prose-a:no-underline prose-a:text-pink-500 hover:prose-a:text-pink-400 max-w-none dark:prose-invert"}>
            {markdown}
        </div>
    )
}
