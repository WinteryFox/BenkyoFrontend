import {useState} from "react";
import {Formik} from 'formik';
import UserPool from '../src/UserPool';

interface Register {
    email: String
    password: String
}

export default function Login() {
    let [form, changeForm] = useState<Register>()

    return (
        <div className="w-full max-w-xs">
            <Formik onSubmit={(values, {setSubmitting}) => {
                UserPool.signUp(values.email, values.password, [], [], (err, data) => {
                    if (err)
                        console.error(err)

                    console.log(data)
                })
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
                            Register
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                           href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>)}
            </Formik>
            <p className="text-center text-gray-500 text-xs">
                &copy;2021 Benkyo. All rights reserved.
            </p>
        </div>
    )
}
