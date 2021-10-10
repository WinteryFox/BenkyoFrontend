import {Formik} from 'formik';
import UserPool from '../src/UserPool';
import {CognitoUserAttribute} from 'amazon-cognito-identity-js';
import Link from 'next/link';
import Button from "../components/button";
import Input from "../components/input";
import Image from "next/image"
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'footer'])),
        },
    };
}

export default function Register() {
    const {t} = useTranslation()

    return (
        <div className={"flex items-center justify-center w-full h-full"}>
            <Image src={"/cherry_blossom.svg"} alt={"background"} layout={"fill"} objectFit={"cover"} priority/>
            <Formik onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true)

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
                    (err, data) => {
                        if (err)
                            alert(`Error; ${err.message}`)

                        console.log(data)
                    })
                setSubmitting(false)
            }}
                    initialValues={{email: "", username: "", password: "", passwordVerify: ""}}
                    validate={values => {
                        let errors = {
                            email: String,
                            username: String,
                            password: String,
                            passwordVerify: String
                        }

                        if (!values.username)
                            errors.username = "Required"

                        if (!values.email)
                            errors.email = "Required"
                        else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email))
                            errors.email = "Invalid email"

                        if (!values.password)
                            errors.password = "Required"
                        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}()?\-“!@#%&\/,><’:;|_~`])\S{8,99}$/.test(values.password))
                            errors.password = "Invalid password"

                        if (values.password != values.passwordVerify)
                            errors.passwordVerify = "Must match"

                        return errors
                    }}>
                {({
                      touched,
                      errors,
                      values,
                      handleChange,
                      handleSubmit
                  }) => (
                    <form onSubmit={handleSubmit}
                          className={"z-10 flex flex-col rounded max-w-lg w-full p-8 bg-white shadow"}>
                        <h3 className={"flex justify-center text-2xl font-bold mb-2"}>{t("account-creation")}</h3>

                        <div className="mb-4">
                            <Input id={"username"} value={values.username} onChange={handleChange}>
                                {t("username")}*
                                <span
                                    className={"text-red-500 text-xs"}>{errors.username && touched.username && errors.username}</span>
                            </Input>
                        </div>

                        <div className="mb-4">
                            <Input id={"email"} type={"email"} value={values.email} onChange={handleChange}>
                                {t("email")}*
                                <span
                                    className={"text-red-500 text-xs"}>{errors.email && touched.email && errors.email}</span>
                            </Input>
                        </div>

                        <div className="mb-4">
                            <div className={"mb-2"}>
                                <Input id={"password"} type={"password"} value={values.password}
                                       onChange={handleChange}>
                                    {t("password")}*
                                    <span
                                        className={"text-red-500 text-xs"}>{errors.password && touched.password && errors.password}</span>
                                </Input>
                            </div>
                            <ul className={"text-sm list-disc list-inside leading-tight"}>
                                <li>{t("password-rule-1")}</li>
                                <li>{t("password-rule-2")}</li>
                                <li>{t("password-rule-3")}</li>
                                <li>{t("password-rule-4")}</li>
                            </ul>
                        </div>

                        <div className={"mb-6"}>
                            <Input id={"passwordVerify"} type={"password"} value={values.passwordVerify}
                                   onChange={handleChange}>
                                {t("verify-password")}*
                                <span
                                    className={"text-red-500 text-xs"}>{errors.passwordVerify && touched.passwordVerify && errors.passwordVerify}</span>
                            </Input>
                        </div>

                        <Button>{t("register")}</Button>

                        <div className={"flex mt-2"}>
                            <Link href={"/login"}>
                                <a className={"text-xs mt-2 text-blue-500 hover:underline"}>{t("have-account")}</a>
                            </Link>
                        </div>
                    </form>)}
            </Formik>
        </div>
    )
}
