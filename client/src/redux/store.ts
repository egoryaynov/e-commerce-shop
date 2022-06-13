import {configureStore} from '@reduxjs/toolkit'
import { addressApi } from 'services/addressApi';
import { authApi } from 'services/authApi';
import { categoryApi } from 'services/categoryApi';
import { orderApi } from 'services/orderApi';
import {productsApi} from "../services/productsApi";
import { authReducer } from './slices/authSlice';
import { cartReducer } from './slices/cartSlice';
import {lastViewedReducer} from "./slices/lastViewedSlice";

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [addressApi.reducerPath]: addressApi.reducer,
        lastViewed: lastViewedReducer,
        auth: authReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
    devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch