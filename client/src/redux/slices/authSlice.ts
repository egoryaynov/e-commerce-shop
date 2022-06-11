import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'types/User';
import { LocalStorageKeys } from "../../types/LocalStorageKeys";

interface AuthState {
    user: User | null
    token: string | null
    initialized: boolean
}

const initialState = {
    user: null,
    token: null,
    initialized: false
} as AuthState

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initToken(state) {
            const token = localStorage.getItem(LocalStorageKeys.TOKEN)

            if (token) {
                state.token = token
            }

            state.initialized = true
        },
        deleteToken(state) {
            localStorage.removeItem(LocalStorageKeys.TOKEN)

            state.token = null
            state.user = null
        },
        addToken(state, action: PayloadAction<string>) {
            localStorage.setItem(LocalStorageKeys.TOKEN, action.payload)

            state.token = action.payload
        },
        updateUserInfo(state, action: PayloadAction<User>) {
            state.user = action.payload
        }
    }
})

export const { addToken, deleteToken, initToken, updateUserInfo } = authSlice.actions
export const authReducer = authSlice.reducer