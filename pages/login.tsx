import {Formik} from "formik";
import UserPool from "../src/UserPool";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export async function getStaticProps({locale}: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'footer'])),
        },
    };
}

export default function Login() {
    return (
        <div className="w-full max-w-xs">
            <Formik onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true)
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
                    },
                    onFailure: (err) => {
                        console.log(err)
                    },
                    newPasswordRequired: (data) => {
                        console.log(data)
                    }
                })

                setSubmitting(false)
            }}
                    initialValues={{email: '', password: ''}}>
                {({
                      values,
                      handleChange,
                      handleSubmit
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username" type="text" placeholder="Email" name="email" value={values.email} onChange={handleChange} required/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password" type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} required/>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Login
                            </button>
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                               href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </form>)}
            </Formik>
        </div>
    )
}
