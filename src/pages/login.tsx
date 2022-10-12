import {Formik, FormikErrors} from "formik";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Image from "next/image";
import {useTranslation} from "next-i18next";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from "next/link";
import Head from "next/head";
import {useRouter} from "next/router";
import background from "../resources/images/cherry_blossom.svg";
import {Auth} from "aws-amplify"
import {useQuery, useQueryClient} from "react-query";
import {userQuery} from "../Queries";

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
    const {t} = useTranslation()
    const queryClient = useQueryClient()
    const user = useQuery("user", userQuery)
    if (!user.isLoading && user.data != null)
        router.push("/").then()

    const initialValues: FormValues = {
        email: "",
        password: ""
    }

    return (
        <div className={"flex items-center justify-center w-full"}>
            <Head>
                <title>Benkyo | {t("login")}</title>
            </Head>

            <Image src={background} alt={"background"} layout={"fill"} objectFit={"cover"} priority/>
            <Formik
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    try {
                        await Auth.signIn(values.email, values.password)
                        await queryClient.invalidateQueries(["user"])
                        await router.push("/")
                    } catch (e: any) {
                        const errors: FormikErrors<FormValues> = {}
                        if ("code" in e) {
                            if (e.name == "NotAuthorizedException") {
                                errors.email = t("invalid-credentials")
                                errors.password = t("invalid-credentials")
                            } else if (e.name == "UserNotConfirmedException") {
                                errors.email = t("verify-email")
                            } else {
                                console.error(e)
                                errors.email = t("unknown-error")
                            }
                        } else {
                            errors.email = t("unknown-error")
                        }

                        setErrors(errors)
                        setSubmitting(false)
                    }
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
                          className={"z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl max-w-lg w-full p-8 bg-white shadow dark:bg-black"}>
                        <div className={"flex justify-center"}>
                            <h3 className={"flex text-2xl font-bold mb-1 dark:text-white"}>{t("welcome-back")}</h3>
                        </div>
                        <div className={"flex justify-center"}>
                            <h4 className={"flex mb-4 text-gray-500 dark:text-gray-400"}>{t("meet-again")}</h4>
                        </div>
                        <div className={"mb-4"}>
                            <Input id={"email"} value={values.email} onChange={handleChange} autocomplete={"username"}
                                   error={!!errors.email && touched.email} type={"email"}>
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

                        <Button type={"submit"} disabled={isSubmitting}
                                className={"text-white bg-violet-500 text-lg hover:shadow hover:shadow-violet-400 hover:bg-violet-400"}>
                            {t("login")}
                        </Button>

                        <div className={"flex mt-1"}>
                            <Link href={"/register"}>
                                <a id={"register"}
                                   className={"mt-2 text-pink-500 hover:text-pink-400"}>{t("need-account")}</a>
                            </Link>
                        </div>
                    </form>)}
            </Formik>
        </div>
    )
}
