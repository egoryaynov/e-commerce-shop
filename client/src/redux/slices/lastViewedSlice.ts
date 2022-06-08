import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LocalStorageKeys} from "../../types/LocalStorageKeys";

interface LastViewedState {
    products: string[]
    initialized: boolean
}

const initialState = {
    products: [],
    initialized: false
} as LastViewedState

export const lastViewedSlice = createSlice({
    name: 'lastViewed',
    initialState,
    reducers: {
        getLastViewedProducts(state) {
            const lastViewedIDs = localStorage.getItem(LocalStorageKeys.LAST_VIEWED)

            if (lastViewedIDs && lastViewedIDs.length > 0) {
                state.products = JSON.parse(lastViewedIDs)
            }

            state.initialized = true
        },
        addLastViewedProduct(state, action: PayloadAction<string>) {
            if (!state.products.includes(action.payload)) {
                const newProducts = [action.payload, ...state.products]
                localStorage.setItem(LocalStorageKeys.LAST_VIEWED, JSON.stringify(newProducts))

                state.products = newProducts
            }
        }
    },
})

export const {getLastViewedProducts, addLastViewedProduct} = lastViewedSlice.actions
export const lastViewedReducer = lastViewedSlice.reducer