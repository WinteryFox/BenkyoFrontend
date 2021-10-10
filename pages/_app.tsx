import '../styles/globals.sass'
import type {AppProps} from 'next/app'
import Layout from "../components/layout"
import {appWithTranslation} from "next-i18next";
import {Component} from "react";
import nextI18NextConfig from '../next-i18next.config.js';

function Benkyo({Component, pageProps}: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default appWithTranslation(Benkyo, nextI18NextConfig)
