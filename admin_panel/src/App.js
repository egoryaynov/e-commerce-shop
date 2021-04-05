import {TokenContext} from "./context/TokenContext";
import {useAuth} from "./hooks/useAuth";
import {useHttp} from "./hooks/useHttp";
import {AuthApi} from "./api/AuthApi";
import {CircularProgress} from "@material-ui/core";
import {routes} from "./routes";

const App = () => {
    const {request, isLoading, error: errorOnLogin} = useHttp()
    const {token, login, logout, error: errorOnAuthorize, ready, isAuth, setIsAuth} = useAuth()

    const requestLogin = async (email, password) => {
        const options = new AuthApi()

        try {
            options.login(email, password)
            const data = await request(options)

            login(data.token)
            setIsAuth(true)
        } catch (e) {
            console.error(e)
        }
    }

    if (isLoading || !ready) {
        return <CircularProgress/>
    }

    return (
        <TokenContext.Provider value={{
            login, logout, token, isAuth
        }}>
            {routes(isAuth, requestLogin, errorOnLogin, errorOnAuthorize, isLoading)}
        </TokenContext.Provider>
    )
}

export default App
