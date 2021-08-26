import React from 'react';
import Navigation from "./Navigation";
import {Layout} from "antd";

const MainLayout: React.FC = (props) => {
    return (
        <Layout>
            <Navigation/>
            {props.children}
        </Layout>
    );
};

export default MainLayout;
