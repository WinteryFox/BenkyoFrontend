import {Html, Head, Main, NextScript} from 'next/document'
import React from "react";
import {useTranslation} from "next-i18next";

export default function Document() {
    const translation = useTranslation()

    return (
        <Html lang={translation.i18n.language}>
            <Head>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
