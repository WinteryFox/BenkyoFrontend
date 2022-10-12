import '../../styles/globals.css'
import type {AppProps} from 'next/app'
import {appWithTranslation} from "next-i18next";
import React, {Component, useEffect} from "react";
import nextI18NextConfig from '../../next-i18next.config.js';
import Head from "next/head";
import {QueryClient, QueryClientProvider} from "react-query";
import Amplify from "aws-amplify";
import Navbar from "../components/Navbar";

Amplify.configure({
    Auth: {
        region: "us-east-2",
        userPoolId: "us-east-2_3MQKXi2A6",
        userPoolWebClientId: "25iod9nafoc175klk29s9qjvjs"
    }
})

const queryClient = new QueryClient()

function Benkyo({Component, pageProps, router}: AppProps) {
    const {pathname, asPath, query} = router

    useEffect(() => {
        const locale = window.localStorage.getItem("locale")
        if (locale != null)
            router.push({pathname, query}, asPath, {locale: locale}).then()
    }, [])

    return (
        <>
            <Head>
                <title>Benkyo</title>
                <link rel={"shortcut icon"} type={"image/svg"} href={"/logo.svg"}/>

                <meta name={"viewport"} content={"width=device-width,initial-scale=1.0,user-scalable=yes"}/>

                <meta property={"og:title"} content={"Benkyo"}/>
                {/*TODO: Localize and edit descriptions (based on the page too)*/}
                <meta name={"description"} content={"Benkyo is a platform for learning languages."}/>
                <meta property={"og:description"} content={"Benkyo is a platform for learning languages."}/>
                <meta property={"og:site_name"} content={"Benkyo"}/>
                <meta property={"og:url"} content={""}/>
                <meta property={"og:site_name"} content={"Benkyo"}/>
                <meta property={"og:keywords"}
                      content={"Benkyo,Learn,Study,Memorize,Memorise,SRS,Spaced repetition system,Memrise,Anki"}/>
                <meta property={"og:image"} content={"logo.svg"}/>

                <meta property={"twitter:card"} content={"summary_large_image"}/>
                <meta property={"twitter:site"} content={"@AmyFoxieh"}/>
                <meta property={"twitter:site:id"} content={"@AmyFoxieh"}/>
                <meta property={"twitter:creator"} content={"@AmyFoxieh"}/>
                <meta property={"twitter:creator:id"} content={"@AmyFoxieh"}/>
                <meta property={"twitter:image"} content={"/logo.svg"}/>
            </Head>

            <QueryClientProvider client={queryClient}>
                <Navbar/>
                <main>
                    <Component {...pageProps} />
                </main>
            </QueryClientProvider>
        </>
    )
}

export default appWithTranslation(Benkyo, nextI18NextConfig)
