import '../styles/globals.sass'
import type {AppProps} from 'next/app'
import Layout from "../components/layout"
import {appWithTranslation} from "next-i18next";
import {Component} from "react";
import nextI18NextConfig from '../next-i18next.config.js';
import {Provider} from "react-redux";
import store, {set} from "../src/UserStore";
import {getSelf} from "../src/User";
import Head from "next/head";

getSelf().then((user) => store.dispatch(set(user)))
    .catch(() => {
    })

function Benkyo({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Benkyo</title>
                <link rel={"shortcut icon"} type={"image/svg"} href={"/logo.svg"}/>
            </Head>

            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </>
    )
}

export default appWithTranslation(Benkyo, nextI18NextConfig)
