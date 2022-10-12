export default function SkeletonDeck() {
    return <div className={"flex flex-col lg:flex-row pt-8 pb-4 px-10 mx-auto lg:w-[1024px]"}>
        <div className={"flex flex-col items-center md:p-3 pb-3 rounded-xl md:mr-4 shrink-0"}>
            <div className={"relative w-[11em] h-[11em]"}>
                <div className={"w-full h-full rounded-3xl loading"}/>
            </div>
        </div>

        <div className={"flex flex-col w-full"}>
            <div className={"flex justify-between"}>
                <div className={"flex w-full justify-between items-center"}>
                    <div className={"flex w-full flex-col"}>
                        <div className={"text-xs text-gray-400 dark:text-gray-300"}>
                            <p className={"h-4 w-40 rounded loading mt-2"}/>
                        </div>

                        <div className={"flex text-4xl font-semibold dark:text-white"} tabIndex={0}>
                            <p className={"w-52 h-10 rounded-lg loading mt-2"}/>
                        </div>

                        <div className={"flex flex-col md:flex-row mt-1 text-lg mb-3 dark:text-black"}>
                            <div
                                className={"flex w-36 h-10 md:mb-0 mb-1.5 select-none rounded-full px-5 py-1.5 md:mr-2 loading"}/>
                            <div
                                className={"flex w-36 h-10 md:mb-0 mb-1.5 select-none rounded-full px-5 py-1.5 md:mr-2 loading"}/>
                            <div
                                className={"flex w-36 h-10 md:mb-0 mb-1.5 select-none rounded-full px-5 py-1.5 md:mr-2 loading"}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"w-1/3 loading rounded h-8"}/>
            <div className={"w-full loading rounded h-4 mt-1.5"}/>
            <div className={"w-full loading rounded h-4 mt-1.5"}/>
            <div className={"w-full loading rounded h-4 mt-1.5"}/>
            <div className={"w-1/5 loading rounded h-4 mt-1.5"}/>

            <div className={"w-2/3 loading rounded h-8 mt-4"}/>
            <div className={"w-full loading rounded h-4 mt-1.5"}/>
            <div className={"w-full loading rounded h-4 mt-1.5"}/>
            <div className={"w-full loading rounded h-4 mt-1.5"}/>
            <div className={"w-full loading rounded h-4 mt-1.5"}/>
            <div className={"w-3/5 loading rounded h-4 mt-1.5"}/>

            <div className={"w-1/5 loading rounded h-8 mt-4"}/>
            <div className={"w-full loading rounded h-4 mt-1.5"}/>
            <div className={"w-full loading rounded h-4 mt-1.5"}/>
            <div className={"w-2/5 loading rounded h-4 mt-1.5"}/>

            <div className={"w-full mt-4"}>
                <div className={"flex w-full h-10 rounded-full loading mb-3"}/>
            </div>

            <div className={"w-full h-11 rounded-full loading"}/>
            <table className={"table-fixed w-full"}>
                <tbody>
                <tr>
                    <td className={"p-2"}><p className={"h-7 w-2/3 rounded-full loading"}/></td>
                    <td className={"p-2"}><p className={"h-7 w-2/3 rounded-full loading"}/></td>
                    <td className={"p-2"}><p className={"h-7 w-2/3 rounded-full loading"}/></td>
                </tr>
                <tr>
                    <td className={"p-2"}><p className={"h-7 w-2/3 rounded-full loading"}/></td>
                    <td className={"p-2"}><p className={"h-7 w-2/3 rounded-full loading"}/></td>
                    <td className={"p-2"}><p className={"h-7 w-2/3 rounded-full loading"}/></td>
                </tr>
                <tr>
                    <td className={"p-2"}><p className={"h-7 w-2/3 rounded-full loading"}/></td>
                    <td className={"p-2"}><p className={"h-7 w-2/3 rounded-full loading"}/></td>
                    <td className={"p-2"}><p className={"h-7 w-2/3 rounded-full loading"}/></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
}
