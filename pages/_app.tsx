import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "../components/Layout"
import {appWithTranslation} from "next-i18next";
import {Component, useEffect} from "react";
import nextI18NextConfig from '../next-i18next.config.js';
import {Provider} from "react-redux";
import store, {set} from "../src/UserStore";
import {getSelf} from "../src/User";
import Head from "next/head";
import {QueryClient, QueryClientProvider} from "react-query";
import Amplify from "aws-amplify";

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
        getSelf()
            .then((user) => {
                store.dispatch(set(user))
            })
            .catch((e) => {
                console.log(e)
            })
        console.log("effect used")
    }, [])

    return (
        <>
            <Head>
                <title>Benkyo</title>
                <link rel={"shortcut icon"} type={"image/svg"} href={"/logo.svg"}/>

                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

                <meta name={"viewport"} content={"width=device-width, initial-scale=1.0, user-scalable=no"}/>

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

            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </QueryClientProvider>
            </Provider>
        </>
    )
}

export default appWithTranslation(Benkyo, nextI18NextConfig)
