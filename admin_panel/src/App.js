import {TokenContext} from "./context/TokenContext";
import {useAuth} from "./hooks/useAuth";
import {useRoutes} from "./hooks/useRoutes";

const App = () => {
    const {token, login, logout, error, clearError, ready, isAuth} = useAuth()

    return (
        <TokenContext.Provider value={{
            login, logout, token, isAuth
        }}>
            {useRoutes(isAuth)}
        </TokenContext.Provider>
    )
}

export default App
