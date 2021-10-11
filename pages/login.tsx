import {Formik} from "formik";
import UserPool from "../src/UserPool";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Image from "next/image";
import {useTranslation} from "next-i18next";
import Input from "../components/input";
import Button from "../components/button";
import Link from "next/link";

export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'footer'])),
        },
    };
}

export default function Login() {
    const {t} = useTranslation()

    return (
        <div className={"flex items-center justify-center w-full h-full"}>
            <Image src={"/cherry_blossom.svg"} alt={"background"} layout={"fill"} objectFit={"cover"} priority/>
            <Formik
                onSubmit={(values, {setSubmitting}) => {
                    const user = new CognitoUser({
                        Username: values.email,
                        Pool: UserPool
                    })

                    const authDetails = new AuthenticationDetails({
                        Username: values.email,
                        Password: values.password
                    })

                    user.authenticateUser(authDetails, {
                        onSuccess: (data) => {
                            console.log(data)
                            setSubmitting(false)
                        },
                        onFailure: (err) => {
                            console.error(err)
                            setSubmitting(false)
                        },
                        newPasswordRequired: (data) => {
                            console.log(data)
                            setSubmitting(false)
                        }
                    })
                }}
                initialValues={{email: '', password: ''}}>
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
                            <Input id={"email"} value={values.email} onChange={handleChange} autocomplete={"username"}>
                                {t("email")}
                            </Input>
                        </div>

                        <div className={"mb-4"}>
                            <Input id={"password"} type={"password"} value={values.password} onChange={handleChange}
                                   autocomplete={"current-password"}>
                                {t("password")}
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
