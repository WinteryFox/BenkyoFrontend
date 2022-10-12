import Button from "../components/Button";
import {Auth} from "aws-amplify"
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";
import {useQuery, useQueryClient} from "react-query";
import {userQuery} from "../Queries";

export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
}

export default function Profile() {
    const {t} = useTranslation()
    const router = useRouter()
    const queryClient = useQueryClient()
    const user = useQuery(["user"], userQuery)

    if (!user.isLoading && !user.data)
        return "You're not logged in." // TODO

    return (
        <div className={"flex items-center justify-center w-full h-full"}>
            <Button className={" max-w-xs w-full text-white bg-red-500 text-lg hover:shadow hover:shadow-red-400 hover:bg-red-400"}
                    onClick={async () => {
                        await Auth.signOut()
                        await queryClient.invalidateQueries(["user"])
                        await router.push("/login")
                    }}>
                {t("logout")}
            </Button>
        </div>

    )
}