import React, {useEffect} from 'react';
import MainLayout from "./components/MainLayout/MainLayout";
import {Route, Switch} from "react-router-dom";
import {Exception} from "./pages/Exception/Exception";
import Home from "./pages/Home/Home";
import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {initializeApp} from "./redux/slices/appSlice";

const App: React.FC = () => {
    const initialized = useSelector((state: RootState) => state.app.initialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, []);

    return (
        <MainLayout>
            {initialized &&
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>

                    <Route path="*">
                        <Exception statusCode={404} title="Страница не найдена"
                                   subtitle="Запрашиваемой страницы не существует"/>
                    </Route>
                </Switch>
            }
        </MainLayout>
    )
}

export default App;