import {createContext} from "react"

export const TokenContext = createContext({
    login: null,
    logout: null,
    token: null
})