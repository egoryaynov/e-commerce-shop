import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AddressItemType } from 'types/Address';
import { OrdersItemType } from 'types/Order';
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
        initToken(state: AuthState) {
            const token = localStorage.getItem(LocalStorageKeys.TOKEN)

            if (token) {
                state.token = token
            }

            state.initialized = true
        },
        deleteToken(state: AuthState) {
            localStorage.removeItem(LocalStorageKeys.TOKEN)

            state.token = null
            state.user = null
        },
        addToken(state: AuthState, action: PayloadAction<string>) {
            localStorage.setItem(LocalStorageKeys.TOKEN, action.payload)

            state.token = action.payload
        },
        updateUserInfo(state: AuthState, action: PayloadAction<User>) {
            state.user = action.payload
        },
        addOrder(state: AuthState, action: PayloadAction<OrdersItemType>) {
            if (state.user) {
                const newOrders = [...state.user.orders, action.payload]
                state.user.orders = newOrders
            }
        },
        rewriteAddresses(state: AuthState, action: PayloadAction<AddressItemType[]>) {
            if (state.user) {
                state.user.addresses = action.payload
            }
        }
    }
})

export const { addToken, deleteToken, initToken, updateUserInfo, addOrder, rewriteAddresses } = authSlice.actions
export const authReducer = authSlice.reducer