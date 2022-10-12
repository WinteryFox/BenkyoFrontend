import {CognitoUser} from "amazon-cognito-identity-js";
import {Auth} from "aws-amplify";
import User from "./Api";

interface CognitoUserAttributes {
    sub: string
    email: string
    email_verified: string
    preferred_username: string
}

export const userQuery = () => new Promise<User>(async (resolve, reject) => {
    try {
        const user: CognitoUser & {attributes: CognitoUserAttributes} = await Auth.currentAuthenticatedUser()

        return resolve({
            id: user.attributes.sub,
            email: user.attributes.email,
            username: user.attributes.preferred_username
        })
    } catch (e) {
        return reject(e)
    }
})
