import React from 'react';
import {ProductsList} from "../../types/Product";
import {Alert, Col, Row} from "antd";
import ProductCard from "./ProductCard";

type PropsType = {
    products: ProductsList | null
    isLoading: boolean
    error: any | undefined
}

const ProductsGrid: React.FC<PropsType> = ({products, isLoading, error}) => {
    if (!isLoading && error) return <Alert type={'error'} message={error.message} banner/>

    return (
        <div>
            {products && products.length < 1 && <Alert type={'warning'} message={'Product list is empty'} banner/>}
            <Row justify="start">
                {products
                    ? products.map((product) => (
                        <Col style={{paddingRight: '10px'}} key={product._id} span={4}>
                            <ProductCard isLoading={isLoading} product={product}/>
                        </Col>
                    ))
                    : new Array(4).fill(0).map((_, idx) => (
                        <Col style={{paddingRight: '10px'}} key={idx} span={4}>
                            <ProductCard isLoading={isLoading} product={null}/>
                        </Col>
                    ))}
            </Row>
        </div>
    );
};

export default ProductsGrid;
