import axios from "axios";

const baseUrl = "http://localhost:8282/api"

const client = axios.create({
    baseURL: baseUrl
})

export interface DeckData {
    id: bigint,
    verified: boolean,
    author: bigint,
    createdAt: string,
    name: string,
    description: string,
    sourceLanguage: string,
    targetLanguage: string,
    imageHash: string
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

export async function getCards(id: string): Promise<Array<CardData>> {
    return (await client.get(`/decks/${id}/cards`)).data
}
