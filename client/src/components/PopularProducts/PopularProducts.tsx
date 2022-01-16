import React from 'react';
import Title from "antd/es/typography/Title";
import {useGetProductsQuery} from "../../services/productsApi";
import ProductsGrid from "../Products/ProductsGrid";

const PopularProducts: React.FC = () => {
    const {data, error, isLoading} = useGetProductsQuery({sort: 'buyCount_desc'})

    return (
        <div>
            <Title level={2}>Popular Products</Title>
            <ProductsGrid products={data ? data.products.docs : null} isLoading={isLoading} error={error}/>
        </div>
    );
};

export default PopularProducts;
