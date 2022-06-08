import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type GetCategoriesResponse = {
    success: boolean
    categories: Array<{
        _id: string
        name: string
    }>
}

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    endpoints: (builder) => ({
        getCategories: builder.query<GetCategoriesResponse, {}>({
            query: (params) => ({ url: `category` })
        }),
    }),
})

export const { useGetCategoriesQuery } = categoryApi