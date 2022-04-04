import axios, {Method} from "axios";
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
    } catch (_) {
    }
    return config
})

export interface DeckData {
    id: string,
    author: string,
    isPrivate: boolean,
    createdAt: string,
    name: string,
    shortDescription: string,
    description: string,
    sourceLanguage: string,
    targetLanguage: string,
    imageHash: string | null
}

export interface ColumnData {
    id: string,
    name: string,
    ordinal: number
}

export interface CardRequest {
    columns: Array<ColumnData>,
    cards: Array<CardData>
}

export interface CardData {
    id: string,
    ordinal: number,
    data: Array<CardDataData>
}

export interface CardDataData {
    column: string,
    ordinal: number,
    src: Array<string>
}

export interface CreateDeckRequest {
    name: string,
    shortDescription: string,
    description: string,
    isPrivate: boolean,
    sourceLanguage: string,
    targetLanguage: string
}

async function request<B, R>(method: Method, url: string, data?: B): Promise<R> {
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

export async function getDecks(): Promise<Array<DeckData>> {
    return request("GET", "/decks")
}

export async function getDeck(id: string): Promise<DeckData> {
    return request("GET", `/decks/${encodeURIComponent(id)}`)
}

export async function getCards(deck: string): Promise<CardRequest> {
    return request("GET", `/decks/${encodeURIComponent(deck)}/cards`)
}

export async function getNewCards(deck: string): Promise<Array<CardData>> {
    return request("GET", `/study/${encodeURIComponent(deck)}`)
}

export async function createDeck(data: CreateDeckRequest): Promise<DeckData> {
    return request("POST", "/decks", data)
}

export interface CardAttempt {
    card: string,
    attempts: Array<string>
}

export interface CardCreateRequest {
    question: string,
    answers: Array<string>
}

export async function finishStudySession(data: Array<CardAttempt>): Promise<void> {

}

export async function deleteDeck(id: string): Promise<void> {
    return request("DELETE", `/decks/${encodeURIComponent(id)}`)
}

export async function createCard(deck: string, data: CardCreateRequest): Promise<CardData> {
    return request<CardCreateRequest, CardData>("POST", `/decks/${encodeURIComponent(deck)}/cards`, data)
}

export async function deleteCard(deckId: string, cardId: string) {
    return request("DELETE", `/decks/${encodeURIComponent(deckId)}/cards/${cardId}`)
}
