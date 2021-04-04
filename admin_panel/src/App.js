import {TokenContext} from "./context/TokenContext";
import {useAuth} from "./hooks/useAuth";
import {Redirect, Route} from "react-router";
import SignIn from "./pages/SignIn";
import {Switch} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import {useHttp} from "./hooks/useHttp";
import {AuthApi} from "./api/AuthApi";
import {CircularProgress} from "@material-ui/core";
import Orders from "./pages/Orders";
import Products from "./pages/Products";

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
            {!isAuth && <Switch>
                <Route exact
                       path='/login'
                       render={
                           () => <SignIn requestLogin={requestLogin} error={errorOnLogin || errorOnAuthorize}
                                         isLoading={isLoading}/>
                       }
                />

                <Redirect to='/login'/>
            </Switch>}

            {isAuth && <Switch>
                <Route exact path='/dashboard' render={() => <Dashboard/>}/>
                <Route exact path='/orders' render={() => <Orders/>}/>
                <Route exact path='/products' render={() => <Products/>}/>

                <Redirect to='/dashboard'/>
            </Switch>}
        </TokenContext.Provider>
    )
}

export default App
