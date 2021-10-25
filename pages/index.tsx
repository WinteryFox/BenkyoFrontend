import Head from 'next/head'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
}

export default function Home() {
    const {t} = useTranslation()

    return (
        <div className={"h-20"}>
            <Head>
                <title>Benkyo</title>
            </Head>
            Hello, World!
        </div>
    )
}
