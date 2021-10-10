import Head from 'next/head'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'footer'])),
        },
    };
}

export default function Home() {
  return (
    <div>
      Hello, World!
    </div>
  )
}
