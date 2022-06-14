import React, {useEffect, useState} from 'react';
import MainLayout from "./components/MainLayout/MainLayout";
import {Route, Switch} from "react-router-dom";
import {Exception} from "./pages/Exception/Exception";
import Home from "./pages/Home/Home";
import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import ProductPage from "./pages/Product/ProductPage";
import { getLastViewedProducts } from 'redux/slices/lastViewedSlice';
import CategoriesPage from 'pages/Categories/CategoriesPage';
import ProductsPage from 'pages/Products/ProductsPage';
import { RootState } from 'redux/store';
import { deleteToken, initToken, updateUserInfo } from 'redux/slices/authSlice';
import { useLazyGetUserInfoQuery } from 'services/authApi';
import Profile from 'pages/Profile/Profile';
import CartPage from 'pages/Cart/Cart';
import { initCart } from 'redux/slices/cartSlice';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';

const App: React.FC = () => {
    const [initialized, setinitialized] = useState(false)
    const [trigger, { isLoading, data, error }] = useLazyGetUserInfoQuery()

    const lastViewedInitialized = useSelector((state: RootState) => state.lastViewed.initialized)
    const tokenInitialized = useSelector((state: RootState) => state.auth.initialized)
    const cartInitialized = useSelector((state: RootState) => state.cart.initialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLastViewedProducts())
        dispatch(initToken())
        dispatch(initCart())
    }, [])

    useEffect(() => {
        if (lastViewedInitialized && tokenInitialized && cartInitialized) {
            trigger({})
            setinitialized(true)
        }
    }, [lastViewedInitialized, tokenInitialized, cartInitialized])

    useEffect(() => {
        if (error) dispatch(deleteToken())
    }, [error])

    useEffect(() => {
        if (data) dispatch(updateUserInfo(data.user))
    }, [data])
    
    if (!initialized) return null

    return (
        <MainLayout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/product/:id" component={ProductPage} />
                <Route exact path="/categories" component={CategoriesPage} />
                <Route exact path="/products" component={ProductsPage} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/cart" component={CartPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                <Route path="*">
                    <Exception statusCode={404} title="Страница не найдена"
                        subtitle="Запрашиваемой страницы не существует" />
                </Route>
            </Switch>
        </MainLayout>
    )
}

export default App;