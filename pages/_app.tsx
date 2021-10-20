import '../styles/globals.sass'
import type {AppProps} from 'next/app'
import Layout from "../components/layout"
import {appWithTranslation} from "next-i18next";
import {Component} from "react";
import nextI18NextConfig from '../next-i18next.config.js';
import {Provider} from "react-redux";
import store from "../src/UserStore";

function Benkyo({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}

export default appWithTranslation(Benkyo, nextI18NextConfig)
