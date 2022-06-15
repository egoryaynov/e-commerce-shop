import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartProductsItem } from 'types/Product';
import { LocalStorageKeys } from "../../types/LocalStorageKeys";

interface CartState {
    products: CartProductsItem[]
    initialized: boolean
}

const initialState = {
    products: [],
    initialized: false
} as CartState

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        initCart(state: CartState) {
            const products = JSON.parse(localStorage.getItem(LocalStorageKeys.CART) || "[]")

            if (products && products.length > 0) {
                state.products = products
            }

            state.initialized = true
        },
        addProductToCart(state: CartState, action: PayloadAction<CartProductsItem>) {
            if (state.products.findIndex(item => item.product._id === action.payload.product._id) === -1) {
                const newProducts = state.products ? [...state.products, action.payload] : [action.payload]

                localStorage.setItem(LocalStorageKeys.CART, JSON.stringify(newProducts))
                state.products = newProducts
            }
        },
        deleteProductFromCart(state: CartState, action: PayloadAction<string>) {
            if (state.products) {
                const newProducts = state.products.filter((item) => item.product._id !== action.payload)
                
                localStorage.setItem(LocalStorageKeys.CART, JSON.stringify(newProducts))
                state.products = newProducts
            }
        },
        clearCart(state: CartState) {
            localStorage.removeItem(LocalStorageKeys.CART)
            state.products = []
        }
    }
})

export const { initCart, addProductToCart, deleteProductFromCart, clearCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer