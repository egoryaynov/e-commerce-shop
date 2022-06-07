import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Product, ProductsList} from "../types/Product";

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
type GetProductByIdResponse = {
    success: boolean
    product: Product
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api/v1'}),
    endpoints: (builder) => ({
        getProducts: builder.query<GetProductsResponse, GetProductsParams>({
            query: (params) => ({url: `product`, params})
        }),
        getProductById: builder.query<GetProductByIdResponse, { id: string }>({
            query: (params) => ({url: `product/${params.id}`})
        })
    }),
})

export const {useGetProductsQuery, useGetProductByIdQuery} = productsApi