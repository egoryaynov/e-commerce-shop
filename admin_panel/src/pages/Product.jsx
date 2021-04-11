import React from 'react';
import {useParams} from "react-router";
import Template from "../components/Template";

const Product = () => {
    const {id: productId} = useParams()

    return (
        <Template title={`Product ${productId}`}>
            {productId}
        </Template>
    );
};

export default Product;
