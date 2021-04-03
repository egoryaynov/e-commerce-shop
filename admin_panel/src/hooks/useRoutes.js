import {Redirect, Route} from "react-router"
import Panel from "../pages/Panel"
import {Switch} from "@material-ui/core"
import SignIn from "../pages/SignIn"

export const useRoutes = (isAuth) => {
    if (!isAuth) {
        return (
            <Switch>
                <Route exact path='/login' render={() => <SignIn/>}/>

                <Redirect to='/login'/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route exact path='/panel' render={() => <Panel/>}/>

                <Redirect to='/panel'/>
            </Switch>
        )
    }
}