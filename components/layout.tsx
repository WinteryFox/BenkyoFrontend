import Navbar from "./navbar";
import React from "react";

export default function Layout({children}: HTMLElement) {
    return (
        <>
            <Navbar/>
            <main>{children}</main>
        </>
    )
}
