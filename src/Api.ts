import axios, {AxiosError, Method} from "axios";
import {Auth} from "aws-amplify"

const baseUrl = "http://localhost:8282/api"
const client = axios.create({
    baseURL: baseUrl
})

client.interceptors.request.use(async (config) => {
    try {
        const session = await Auth.currentSession()
        config.headers = {
            "Authorization": `Bearer ${session.getAccessToken().getJwtToken()}`
        }
    } catch (_) {}
    return config
})

export interface DeckData {
    id: string,
    author: string,
    isPrivate: boolean,
    name: string,
    shortDescription: string,
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

export interface CreateDeckRequest {
    name: string,
    shortDescription: string,
    description: string,
    isPrivate: boolean,
    sourceLanguage: string,
    targetLanguage: string
}

async function request<B, R>(method: Method, url: string, data?: B): Promise<R | null> {
    return new Promise<R>((async (resolve, reject) => {
        try {
            const response = await client.request({
                url,
                method,
                data
            })

            return resolve(response.data as R)
        } catch (e) {
            return reject(e)
        }
    }))
}

export async function getDecks(): Promise<Array<DeckData> | null> {
    return request("GET", "/decks")
}

export async function getDeck(id: string): Promise<DeckData | null> {
    return request("GET", `/decks/${encodeURIComponent(id)}`)
}

export async function getCards(deck: string): Promise<Array<CardData> | null> {
    return request("GET", `/decks/${encodeURIComponent(deck)}/cards`)
}

export async function getNewCards(deck: string): Promise<Array<CardData> | null> {
    return request("GET", `/study/${encodeURIComponent(deck)}`)
}

export async function createDeck(data: CreateDeckRequest): Promise<DeckData | null> {
    return request("POST", "/decks", data)
}
