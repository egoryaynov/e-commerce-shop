import React from 'react';
import Navigation from "../Navigation";
import {Layout} from 'antd';
import styles from './MainLayout.module.scss';

const {Header, Content} = Layout;

type PropsType = {
    isLoading?: boolean
    Skeleton?: React.FC
}

const MainLayout: React.FC<PropsType> = (props) => {
    return (
        <Layout>
            <Header>
                <Navigation/>
            </Header>
            <Content className={styles.content}>
                {props.children}
            </Content>
        </Layout>
    );
};

export default MainLayout;
