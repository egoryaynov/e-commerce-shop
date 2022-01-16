import React from 'react';
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import LastVIewedProducts from "../../components/LastVIewedProducts/LastVIewedProducts";

const Home: React.FC = () => {
    // Banner (In the future...)
    // POPULAR PRODUCTS (by buyCount)
    // Categories
    // Last viewed products
    // Current Orders

    return (
        <>
            <PopularProducts/>
            <LastVIewedProducts/>
        </>
    );
};

export default Home;
