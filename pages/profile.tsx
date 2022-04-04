import Button from "../components/Button";
import {Auth} from "aws-amplify"
import {RootState, set, useAppDispatch} from "../src/UserStore";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
}

export default function Profile() {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const router = useRouter()
    const user = useSelector(async (state: RootState) => state.userState.user)

    if (!user)
        return "You're not logged in." // TODO

    return (
        <Button onClick={async () => {
            await Auth.signOut()
            dispatch(set(null))
        }}>
            {t("logout")}
        </Button>
    )
}