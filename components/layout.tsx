import Navbar from "./navbar";
import React from "react";

export default function Layout({children}: HTMLElement) {
    return (
        <div className={"flex h-screen flex-col"}>
            <Navbar/>
            <main className={"h-full"}>{children}</main>
        </div>
    )
}
