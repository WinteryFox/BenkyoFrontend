import {Formik, FormikErrors} from 'formik';
import UserPool from '../src/UserPool';
import {CognitoUserAttribute} from 'amazon-cognito-identity-js';
import Link from 'next/link';
import Button from "../components/Button";
import Input from "../components/Input";
import Image from "next/image"
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";
import {useState} from "react";
import Head from "next/head";
import background from "../images/cherry_blossom.svg";
import {useSelector} from "react-redux";
import {RootState} from "../src/UserStore";

export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
}

interface FormValues {
    email: string
    username: string
    password: string
    passwordVerify: string
}

export default function Register() {
    const router = useRouter()
    useSelector((state: RootState) => {
        if (state.userState.user != null)
            router.push("/").then(() => {
            })

        return null
    })

    const {t} = useTranslation()
    const [state, changeState] = useState<boolean>(false)

    const initialValues: FormValues = {
        email: "",
        password: "",
        passwordVerify: "",
        username: ""
    }

    if (state)
        return (
            <div className={"flex items-center justify-center w-full h-full"}>
                <Head>
                    <title>Benkyo | {t("register")}</title>
                </Head>

                <Image src={background} alt={"background"} layout={"fill"} objectFit={"cover"} priority/>
                <div className={"z-10 rounded-3xl max-w-lg w-full p-8 bg-white shadow"}>
                    <div className={"flex justify-center mb-4"}>
                        <Image src={"/paper_plane.svg"} alt={"Paper plane"} width={256} height={256}/>
                    </div>
                    <h3 className={"flex justify-center text-2xl font-bold"}>{t("verify-email")}</h3>
                    <span className={"flex justify-center text-sm"}>{t("close-window")}</span>
                </div>
            </div>
        )
    else
        return (
            <div className={"flex items-center justify-center w-full h-full"}>
                <Head>
                    <title>Benkyo | {t("register")}</title>
                </Head>

                <Image src={background} alt={"background"} layout={"fill"} objectFit={"cover"} priority/>
                <Formik
                    onSubmit={(values, {setSubmitting, setErrors}) => {
                        UserPool.signUp(
                            values.email,
                            values.password,
                            [
                                new CognitoUserAttribute({
                                    Name: 'preferred_username',
                                    Value: values.username
                                })
                            ],
                            [],
                            async (err, data) => {
                                if (err) {
                                    const errors: FormikErrors<FormValues> = {}
                                    if (err.name == "UsernameExistsException")
                                        errors.email = t("email-registered")
                                    else {
                                        console.error(err)
                                        errors.email = t("unknown-error")
                                    }

                                    setErrors(errors)
                                    setSubmitting(false)
                                } else {
                                    if (!data?.userConfirmed) {
                                        changeState(true)
                                    } else {
                                        await router.push("/login")
                                    }
                                }
                            })
                    }}
                    initialValues={initialValues}
                    validate={(values: FormValues) => {
                        const errors: FormikErrors<FormValues> = {}

                        if (!values.username)
                            errors.username = t("required")
                        else if (values.username.length < 2 || values.username.length > 32)
                            errors.username = t("invalid-username")

                        if (!values.email)
                            errors.email = t("required")
                        else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email))
                            errors.email = t("invalid-email")

                        if (!values.password)
                            errors.password = t("required")
                        else if (values.password.length < 8)
                            errors.password = t("password-rule-1")
                        else if (!/^(?=.*[a-z][A-Z])/.test(values.password))
                            errors.password = t("password-rule-2")
                        else if (!/(?=.*[\^$*.\[\]{}()?\-“!@#%&/,><’:;|_~`])/.test(values.password))
                            errors.password = t("password-rule-3")
                        else if (!/(?=.*[0-9])/.test(values.password))
                            errors.password = t("password-rule-4")

                        if (!values.passwordVerify)
                            errors.passwordVerify = t("required")
                        else if (values.password != values.passwordVerify)
                            errors.passwordVerify = t("must-match")

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
                              className={"z-10 flex flex-col rounded-3xl max-w-lg w-full p-8 bg-white shadow"}>
                            <h3 className={"flex justify-center text-2xl font-bold mb-4"}>{t("account-creation")}</h3>

                            <div className="mb-4">
                                <Input id={"email"} type={"email"} value={values.email} onChange={handleChange}
                                       autocomplete={"username"} error={!!errors.email && touched.email}>
                                    {t("email")}*
                                    <span className={"ml-1 text-xs"}>
                                    {errors.email && touched.email && errors.email}
                                </span>
                                </Input>
                            </div>

                            <div className="mb-4">
                                <Input id={"username"} value={values.username} onChange={handleChange} error={!!errors.username && touched.username}>
                                    {t("username")}*
                                    <span className={"ml-1 text-xs"}>
                                    {errors.username && touched.username && errors.username}
                                </span>
                                </Input>
                            </div>

                            <div className="mb-4">
                                <Input id={"password"} type={"password"} value={values.password}
                                       onChange={handleChange} autocomplete={"new-password"} error={!!errors.password && touched.password}>
                                    {t("password")}*
                                    <span className={"ml-1 text-xs"}>
                                    {errors.password && touched.password && errors.password}
                                </span>
                                </Input>
                            </div>

                            <div className={"mb-6"}>
                                <Input id={"passwordVerify"} type={"password"} value={values.passwordVerify}
                                       onChange={handleChange} error={!!errors.passwordVerify && touched.passwordVerify}>
                                    {t("verify-password")}*
                                    <span className={"ml-1 text-xs"}>
                                    {errors.passwordVerify && touched.passwordVerify && errors.passwordVerify}
                                </span>
                                </Input>
                            </div>

                            <Button type={"submit"} disabled={isSubmitting}>
                                {t("register")}
                            </Button>

                            <div className={"flex mt-1"}>
                                <Link href={"/login"}>
                                    <a className={"text-xs mt-2 text-blue-500 hover:underline"}>{t("have-account")}</a>
                                </Link>
                            </div>
                        </form>)}
                </Formik>
            </div>
        )
}
