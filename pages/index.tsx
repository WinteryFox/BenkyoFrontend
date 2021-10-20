import Head from 'next/head'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'footer'])),
        },
    };
}

export default function Home() {
    const {t} = useTranslation()

    return (
        <div>
            <Head>
                <title>Benkyo</title>
            </Head>
            Hello, World!
        </div>
    )
}
