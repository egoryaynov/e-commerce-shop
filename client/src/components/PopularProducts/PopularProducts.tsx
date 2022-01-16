import React from 'react';
import Title from "antd/es/typography/Title";
import {useGetProductsQuery} from "../../services/productsApi";

const PopularProducts: React.FC = () => {
    const {data, error, isLoading} = useGetProductsQuery({})
    console.log(data?.products.docs)

    return (
        <div>
            <Title level={2}>Popular Products</Title>
        </div>
    );
};

export default PopularProducts;
