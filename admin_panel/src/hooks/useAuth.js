import {useCallback, useEffect, useState} from 'react'

const STORAGE_NAME = 'token'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(null)

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
            login(data.token)
        }

        setReady(r => true)
    }, [login])

    return {token, login, logout, ready}
}