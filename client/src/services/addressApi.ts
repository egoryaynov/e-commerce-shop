import { createApi } from '@reduxjs/toolkit/query/react'
import { AddressItemType } from 'types/Address'
import { protectedBaseQuery } from './authApi'

type CreateAddressRequest = {
    street: string
    houseNumber: string
    apartmentNumber: string
    city: string
    country: string
    postcode: string
}
type CreateAddressResponse = {
    success: boolean
    addresses: AddressItemType[]
}

export const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: protectedBaseQuery,
    endpoints: (builder) => ({
        createAddress: builder.query<CreateAddressResponse, CreateAddressRequest>({
            query: (credentials) => ({
                url: 'address',
                method: 'POST',
                body: credentials,
            }),
        })
    })
})

export const { useLazyCreateAddressQuery } = addressApi