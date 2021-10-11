import {Formik, FormikErrors} from 'formik';
import UserPool from '../src/UserPool';
import {CognitoUserAttribute} from 'amazon-cognito-identity-js';
import Link from 'next/link';
import Button from "../components/button";
import Input from "../components/input";
import Image from "next/image"
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";

export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'footer'])),
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
    const {t} = useTranslation()
    const router = useRouter()

    const initialValues: FormValues = {
        email: "",
        password: "",
        passwordVerify: "",
        username: ""
    }

    return (
        <div className={"flex items-center justify-center w-full h-full"}>
            <Image src={"/cherry_blossom.svg"} alt={"background"} layout={"fill"} objectFit={"cover"} priority/>
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

                                setErrors(errors)
                                setSubmitting(false)
                                return
                            }

                            await router.push("/login")
                        })
                }}
                initialValues={initialValues}
                validate={(values: FormValues) => {
                    let errors: FormikErrors<FormValues> = {}

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
                          className={"z-10 flex flex-col rounded max-w-lg w-full p-8 bg-white shadow"}>
                        <h3 className={"flex justify-center text-2xl font-bold mb-4"}>{t("account-creation")}</h3>

                        <div className="mb-4">
                            <Input id={"email"} type={"email"} value={values.email} onChange={handleChange}
                                   autocomplete={"username"}>
                                {t("email")}*
                                <span className={"ml-1 text-red-500 text-xs"}>
                                    {errors.email && touched.email && errors.email}
                                </span>
                            </Input>
                        </div>

                        <div className="mb-4">
                            <Input id={"username"} value={values.username} onChange={handleChange}>
                                {t("username")}*
                                <span className={"ml-1 text-red-500 text-xs"}>
                                    {errors.username && touched.username && errors.username}
                                </span>
                            </Input>
                        </div>

                        <div className="mb-4">
                            <Input id={"password"} type={"password"} value={values.password}
                                   onChange={handleChange} autocomplete={"new-password"}>
                                {t("password")}*
                                <span className={"ml-1 text-red-500 text-xs"}>
                                    {errors.password && touched.password && errors.password}
                                </span>
                            </Input>
                        </div>

                        <div className={"mb-6"}>
                            <Input id={"passwordVerify"} type={"password"} value={values.passwordVerify}
                                   onChange={handleChange}>
                                {t("verify-password")}*
                                <span className={"ml-1 text-red-500 text-xs"}>
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
