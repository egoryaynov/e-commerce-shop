import React from 'react';
import Title from "antd/es/typography/Title";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useGetProductsQuery} from "../../services/productsApi";
import ProductsGrid from "../Products/ProductsGrid";

const LastViewedProducts = () => {
    const lastViewedIds = useSelector((state: RootState) => state.lastViewed.products)
    const {data, error, isLoading} = useGetProductsQuery({id: lastViewedIds.join(',')})

    if (lastViewedIds.length === 0) return null
    return (
        <div>
            <Title level={2}>Последние просмотренные товары</Title>
            <ProductsGrid products={data ? data.products.docs.slice(0, 5) : null} isLoading={isLoading} error={error}/>
        </div>
    );
};

export default LastViewedProducts;
