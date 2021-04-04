import {useCallback, useEffect, useState} from 'react'
import {useHttp} from "./useHttp";
import {AuthApi} from "../api/AuthApi";

const STORAGE_NAME = 'token'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const {request, error, clearError} = useHttp()

    const login = useCallback((jwtToken) => {
        setToken(jwtToken)

        localStorage.setItem(STORAGE_NAME, JSON.stringify({
            token: jwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)

        localStorage.removeItem(STORAGE_NAME)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(STORAGE_NAME))

        if (data && data.token) {
            const validateToken = async () => {
                const options = new AuthApi()

                options.validateToken(data.token)

                try {
                    await request(options)

                    setIsAuth(true)
                } catch (e) {
                    logout()
                    setIsAuth(false)
                } finally {
                    setReady(r => true)
                }
            }

            validateToken().then()
        } else {
            setReady(true)
        }
    }, [login, logout, request, token])

    return {token, login, logout, error, clearError, ready, isAuth, setIsAuth}
}