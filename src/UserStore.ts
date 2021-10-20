import {configureStore, createSlice} from "@reduxjs/toolkit";
import User from "./User";
import {useDispatch} from "react-redux";

type UserState = {
    user: User | null
}

const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        set: (state, action) => action.payload
    }
})

const store = configureStore({
    reducer: {
        userState: userSlice.reducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
