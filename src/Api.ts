import axios from "axios";
import {Auth} from "aws-amplify"

const baseUrl = "http://localhost:8282/api"
const client = axios.create({
    baseURL: baseUrl
})

client.interceptors.request.use(async (config) => {
    const session = await Auth.currentSession()
    config.headers = {
        "Authorization": `Bearer ${session.getAccessToken().getJwtToken()}`
    }
    return config
})

export interface DeckData {
    id: bigint,
    author: bigint,
    isPrivate: boolean,
    name: string,
    description: string,
    sourceLanguage: string,
    targetLanguage: string,
    createdAt: string,
    imageHash: string | null
}

export interface CardData {
    id: string
    question: string,
    answers: Array<string>
}

export async function getDecks(): Promise<Array<DeckData>> {
    return (await client.get("/decks")).data
}

export async function getDeck(id: string): Promise<DeckData> {
    return (await client.get(`/decks/${id}`)).data
}

export async function getCards(deck: string): Promise<Array<CardData>> {
    return (await client.get(`/decks/${deck}/cards`)).data
}

export async function getNewCards(deck: string): Promise<Array<CardData>> {
    return (await client.get(`/study/${deck}`)).data
}
