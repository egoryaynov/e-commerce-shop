import React from 'react';
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import LastViewedProducts from "../../components/LastViewedProducts/LastViewedProducts";
import { Space } from 'antd';

const Home: React.FC = () => {
    return (
        <>
            <PopularProducts/>
            <LastViewedProducts/>
        </>
    );
};

export default Home;
