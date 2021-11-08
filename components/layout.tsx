import Navbar from "./navbar";
import React, {ReactNode} from "react";

export default function Layout(props: {children: ReactNode}) {
    return (
        <div className={"flex flex-col h-screen"}>
            <Navbar/>
            <main className={"flex w-full h-full"}>{props.children}</main>
        </div>
    )
}
