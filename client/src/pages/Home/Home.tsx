import React from 'react';
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import LastViewedProducts from "../../components/LastViewedProducts/LastViewedProducts";

const Home: React.FC = () => {
    // POPULAR PRODUCTS (by buyCount)
    // Categories
    // Last viewed products
    // Current Orders

    return (
        <>
            <PopularProducts/>
            <LastViewedProducts/>
        </>
    );
};

export default Home;
