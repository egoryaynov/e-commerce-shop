import { createApi } from '@reduxjs/toolkit/query/react'
import { AddressItemType } from 'types/Address'
import { OrdersItemType } from 'types/Order'
import { CartProductsItem } from 'types/Product'
import { protectedBaseQuery } from './authApi'

type SendOrderRequest = {
    address: AddressItemType
    products: CartProductsItem[]
}
type SendOrderResponse = {
    success: boolean
    order: OrdersItemType
}

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: protectedBaseQuery,
    endpoints: (builder) => ({
        sendOrder: builder.query<SendOrderResponse, SendOrderRequest>({
            query: (credentials) => ({
                url: 'order/payment',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
})

export const { useLazySendOrderQuery } = orderApi