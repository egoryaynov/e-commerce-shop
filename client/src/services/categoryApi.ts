import { createApi } from '@reduxjs/toolkit/query/react'
import { protectedBaseQuery } from './authApi'

type GetCategoriesResponse = {
    success: boolean
    categories: Array<{
        _id: string
        name: string
    }>
}

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: protectedBaseQuery,
    endpoints: (builder) => ({
        getCategories: builder.query<GetCategoriesResponse, {}>({
            query: (params) => ({ url: `category` })
        }),
    }),
})

export const { useGetCategoriesQuery } = categoryApi