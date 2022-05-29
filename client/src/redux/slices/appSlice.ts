import {createSlice} from '@reduxjs/toolkit'
import {lastViewedSlice} from "./lastViewedSlice";

interface AppState {
    initialized: boolean
}

const initialState = {
    initialized: false
} as AppState

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        initializeApp(state) {
            lastViewedSlice.caseReducers.getLastViewedProducts({products: []})

            state.initialized = true
        }
    },
})

export const {initializeApp} = appSlice.actions
export const appReducer = appSlice.reducer