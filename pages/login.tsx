import {Formik, FormikErrors} from "formik";
import UserPool from "../src/UserPool";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Image from "next/image";
import {useTranslation} from "next-i18next";
import Input from "../components/input";
import Button from "../components/button";
import Link from "next/link";
import Head from "next/head";
import {useRouter} from "next/router";
import background from "../images/cherry_blossom.svg";
import {RootState, set, useAppDispatch} from "../src/UserStore";
import {getSelf} from "../src/User";
import {useSelector} from "react-redux";

export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
}

interface FormValues {
    email: string
    password: string
}

export default function Login() {
    const router = useRouter()
    useSelector((state: RootState) => {
        if (state.userState.user != null)
            router.push("/").then(() => {
            })

        return null
    })

    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const initialValues: FormValues = {
        email: "",
        password: ""
    }

    return (
        <div className={"flex items-center justify-center w-full h-full"}>
            <Head>
                <title>Benkyo | {t("login")}</title>
            </Head>

            <Image src={background} alt={"background"} layout={"fill"} objectFit={"cover"} priority/>
            <Formik
                onSubmit={(values, {setSubmitting, setErrors}) => {
                    const user = new CognitoUser({
                        Username: values.email,
                        Pool: UserPool
                    })

                    user.authenticateUser(
                        new AuthenticationDetails({
                            Username: values.email,
                            Password: values.password
                        }),
                        {
                            onSuccess: async () => {
                                const user = await getSelf()
                                dispatch(set(user))
                                await router.push("/")
                            },
                            onFailure: (err: Error) => {
                                const errors: FormikErrors<FormValues> = {}
                                if (err.name == "NotAuthorizedException") {
                                    errors.email = t("invalid-credentials")
                                    errors.password = t("invalid-credentials")
                                } else if (err.name == "UserNotConfirmedException") {
                                    errors.email = t("verify-email")
                                } else {
                                    console.error(err)
                                    errors.email = t("unknown-error")
                                }

                                setErrors(errors)
                                setSubmitting(false)
                            },
                            newPasswordRequired: (data) => {
                                console.log(data)
                                setSubmitting(false)
                            }
                        }
                    )
                }}
                initialValues={initialValues}
                validate={(values: FormValues) => {
                    const errors: FormikErrors<FormValues> = {}

                    if (!values.email)
                        errors.email = t("required")

                    if (!values.password)
                        errors.password = t("required")

                    return errors
                }}>
                {({
                      touched,
                      errors,
                      values,
                      handleChange,
                      handleSubmit,
                      isSubmitting
                  }) => (
                    <form onSubmit={handleSubmit}
                          className={"z-10 flex flex-col rounded max-w-lg w-full p-8 bg-white shadow"}>
                        <h3 className={"flex text-2xl font-bold mb-1"}>{t("welcome-back")}</h3>
                        <h4 className={"flex text-sm mb-4 text-gray-500"}>{t("meet-again")}</h4>

                        <div className={"mb-4"}>
                            <Input id={"email"} value={values.email} onChange={handleChange} autocomplete={"username"}
                                   error={!!errors.email && touched.email}>
                                {t("email")}*
                                <span className={"ml-1 text-xs"}>
                                    {errors.email && touched.email && errors.email}
                                </span>
                            </Input>
                        </div>

                        <div className={"mb-4"}>
                            <Input id={"password"} type={"password"} value={values.password} onChange={handleChange}
                                   autocomplete={"current-password"} error={!!errors.password && touched.password}>
                                {t("password")}*
                                <span className={"ml-1 text-xs"}>
                                    {errors.password && touched.password && errors.password}
                                </span>
                            </Input>
                        </div>

                        <Button type={"submit"} disabled={isSubmitting}>{t("login")}</Button>

                        <div className={"flex mt-1"}>
                            <Link href={"/register"}>
                                <a className={"text-xs mt-2 text-blue-500 hover:underline"}>{t("need-account")}</a>
                            </Link>
                        </div>
                    </form>)}
            </Formik>
        </div>
    )
}
