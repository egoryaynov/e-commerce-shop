import React from 'react';
import {Layout} from "antd";
import Navigation from "./components/Navigation";

class App extends React.Component {
    render() {
        return (
            <Layout>
                <Navigation/>
            </Layout>
        );
    }
}

export default App;
