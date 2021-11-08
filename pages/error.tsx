import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!))
        }
    }
}

export default function Error() {
    const {t} = useTranslation()

    return (
        <div className={"flex self-center items-center h-full"}>
            <div className={"p-4 mr-4 border-r border-gray-300"}>
                <i className={"material-icons text-2xl"} title={"Error"}>error</i>
            </div>
            <h1>{t("error")}</h1>
        </div>
    )
}
