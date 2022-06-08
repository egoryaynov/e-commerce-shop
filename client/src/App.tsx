import React, {useEffect} from 'react';
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

const App: React.FC = () => {
    const lastViewedInitialized = useSelector((state: RootState) => state.lastViewed.initialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLastViewedProducts())
    }, []);

    if (!lastViewedInitialized) return null

    return (
        <MainLayout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/product/:id" component={ProductPage} />
                <Route exact path="/categories" component={CategoriesPage} />
                <Route exact path="/products" component={ProductsPage} />

                <Route path="*">
                    <Exception statusCode={404} title="Страница не найдена"
                        subtitle="Запрашиваемой страницы не существует" />
                </Route>
            </Switch>
        </MainLayout>
    )
}

export default App;