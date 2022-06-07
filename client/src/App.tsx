import React, {useEffect} from 'react';
import MainLayout from "./components/MainLayout/MainLayout";
import {Route, Switch} from "react-router-dom";
import {Exception} from "./pages/Exception/Exception";
import Home from "./pages/Home/Home";
import './App.scss';
import {useDispatch} from "react-redux";
import ProductPage from "./pages/Product/ProductPage";
import { getLastViewedProducts } from 'redux/slices/lastViewedSlice';

const App: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLastViewedProducts())
    }, []);

    return (
        <MainLayout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/product/:id" component={ProductPage} />

                <Route path="*">
                    <Exception statusCode={404} title="Страница не найдена"
                        subtitle="Запрашиваемой страницы не существует" />
                </Route>
            </Switch>
        </MainLayout>
    )
}

export default App;