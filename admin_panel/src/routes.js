import {Switch} from "react-router-dom";
import {Redirect, Route} from "react-router";

import {Categories, Customers, Dashboard, Orders, Products, SignIn, AddProduct} from "./pages";

export const routes = (isAuth, requestLogin, errorOnLogin, errorOnAuthorize, isLoading) => {
    return (
        <>
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
                <Route exact path='/products/add' render={() => <AddProduct/>}/>
                <Route exact path='/customers' render={() => <Customers/>}/>
                <Route exact path='/categories' render={() => <Categories/>}/>

                <Redirect to='/dashboard'/>
            </Switch>}
        </>
    )
}