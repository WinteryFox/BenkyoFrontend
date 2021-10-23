import UserPool from "./UserPool";
import {CognitoUserSession} from "amazon-cognito-identity-js";

export default interface User {
    id: string
    email: string
    username: string
}

export const getSelf = () => new Promise<User>((resolve, reject) => {
    const cognitoUser = UserPool.getCurrentUser()
    if (!cognitoUser)
        return reject("No current user.")

    cognitoUser.getSession(((err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session) {
            return reject(err)
        }

        if (!session.isValid()) {
            return reject("Session is not valid.")
        }

        cognitoUser.getUserAttributes(((err1, result) => {
            if (err1 || !result) {
                return reject(err1)
            }

            return resolve({
                id: cognitoUser.getUsername(),
                email: result.find((value) => value.Name == "email")!.Value,
                username: result.find((value) => value.Name == "preferred_username")!.Value
            })
        }))
    }))
})
