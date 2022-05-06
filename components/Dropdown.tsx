import {ReactNode, useRef, useState} from "react";

export interface Option {
    label: ReactNode,
    value: string
}

export default function Dropdown(props: {
    options: Option[],
    onChange: (value: Option) => void,
    value: string
}) {
    const [isExpanded, setExpanded] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div className="relative inline-block text-left rounded-full" tabIndex={0} onFocus={() => setExpanded(true)}
             onClick={() => setExpanded(!isExpanded)} ref={ref}>
            <div
                className="select-none cursor-pointer inline-flex border-gray-300 px-4 py-2 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                id="menu-button" aria-expanded="true" aria-haspopup="true">
                {props.options.find(v => v.value == props.value)!.label}
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                     fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"/>
                </svg>
            </div>

            {isExpanded &&
                <div
                    className="origin-top-right absolute right-0 w-40 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                    <div role="none">
                        {props.options.map(option => (
                            <button key={option.value}
                                    className="w-full text-gray-700 dark:text-white dark:text-white-700 block p-2 rounded select-none hover:bg-gray-200 dark:hover:bg-gray-600 hover:cursor-pointer"
                                    role="menuitem" tabIndex={0}
                                    id={option.value} onClick={() => props.onChange(option)}>
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>}
        </div>
    )
}