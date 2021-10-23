import Navbar from "./navbar";
import React, {ReactNode} from "react";

export default function Layout(props: {children: ReactNode}) {
    return (
        <div className={"flex h-screen flex-col"}>
            <Navbar/>
            <main className={"h-full"}>{props.children}</main>
        </div>
    )
}
