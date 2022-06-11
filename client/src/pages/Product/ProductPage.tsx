import { Carousel, Col, Image, Row } from 'antd';
import LastViewedProducts from 'components/LastViewedProducts/LastViewedProducts';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {RouteComponentProps} from "react-router-dom";
import { addLastViewedProduct } from 'redux/slices/lastViewedSlice';
import {useGetProductByIdQuery} from "../../services/productsApi";

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

type PropsType = {
    id: string
}
const ProductPage: React.FC<RouteComponentProps<PropsType>> = ({ match }) => {
    const {data, error, isLoading} = useGetProductByIdQuery({id: match.params.id})
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(addLastViewedProduct(match.params.id))
    }, [])

    return (
        <div>
            <Row>
                <Col span="8">
                    <Carousel arrows={true} autoplay autoplaySpeed={2000}>
                        {data?.product.images.map(image => (
                            <div>
                                <Image src={image} style={{ width: '100%', height: '100%' }} />
                            </div>
                        ))}
                    </Carousel>
                </Col>
                <Col span="16">col-12</Col>
            </Row>
            
            <LastViewedProducts />
        </div>
    );
};

export default ProductPage;
