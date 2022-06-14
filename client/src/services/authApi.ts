import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../redux/store'
import { User } from '../types/User'

export interface LoginRequest {
    email: string
    password: string
}
export interface LoginResponse {
    success: boolean
    token: string
}

export interface RegisterRequest {
    firstName: string
    secondName: string
    middleName: string
    email: string
    password: string
}
export interface RegisterResponse {
    success: boolean
    token: string
}

export interface GetUserInfoResponse {
    success: boolean
    user: User
}

export const protectedBaseQuery = fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
})

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: protectedBaseQuery,
    endpoints: (builder) => ({
        login: builder.query<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.query<RegisterResponse, RegisterRequest>({
            query: (credentials) => ({
                url: 'auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        getUserInfo: builder.query<GetUserInfoResponse, {}>({
            query: (params) => ({ url: `auth` })
        }),
    }),
})

export const { useLazyLoginQuery, useLazyRegisterQuery, useLazyGetUserInfoQuery } = authApi