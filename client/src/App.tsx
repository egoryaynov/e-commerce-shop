import React from 'react';
import MainLayout from "./components/MainLayout/MainLayout";
import {Route, Switch} from "react-router-dom";
import {Exception} from "./pages/Exception/Exception";
import Home from "./components/Home/Home";

const App: React.FC = () => (
    <MainLayout>
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>

            <Route path="*">
                <Exception statusCode={404} title="Sorry, page not found" subtitle="Requested page doesn't exist"/>
            </Route>
        </Switch>
    </MainLayout>
)

export default App;