import {createSlice} from '@reduxjs/toolkit'
import {LocalStorageKeys} from "../../types/LocalStorageKeys";

interface LastViewedState {
    products: string[]
}

const initialState = {
    products: []
} as LastViewedState

export const lastViewedSlice = createSlice({
    name: 'lastViewed',
    initialState,
    reducers: {
        getLastViewedProducts(state) {
            const lastViewedIDs = localStorage.getItem(LocalStorageKeys.LAST_VIEWED)

            if (lastViewedIDs && lastViewedIDs.length > 0) {
                const lastViewedArr = JSON.parse(lastViewedIDs)

                state.products = lastViewedArr as unknown as string[]
            }
        }
    },
})

export const {getLastViewedProducts} = lastViewedSlice.actions
export const lastViewedReducer = lastViewedSlice.reducer