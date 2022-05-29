import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ProductsList} from "../types/Product";

export type GetProductsParams = {
    search?: string
    page?: number
    limit?: number
    sort?: 'name_asc' | 'name_desc' | 'buyCount_asc' | 'buyCount_desc' | 'price_asc' | 'price_desc' | 'discount_asc' | 'discount_desc'
    filter?: 'category' | 'color' | 'discount' | string
    categories?: string
    colors?: string
    id?: string
}

type GetProductsResponse = {
    success: boolean
    products: {
        docs: ProductsList
        hasNextPage: boolean
        hasPrevPage: boolean
        limit: number
        page: number
        pagingCounter: number
        totalDocs: number
        totalPages: number
        nextPage: null | number
        prevPage: null | number
    }
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api/v1'}),
    endpoints: (builder) => ({
        getProducts: builder.query<GetProductsResponse, GetProductsParams>({
            query: (params) => ({url: `product`, params})
        })
    }),
})

export const {useGetProductsQuery} = productsApi