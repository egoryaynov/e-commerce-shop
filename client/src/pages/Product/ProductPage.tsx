import { Button, Carousel, Col, Image, Row, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import ColorSelector from 'components/ColorSelector/ColorSelector';
import LastViewedProducts from 'components/LastViewedProducts/LastViewedProducts';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {RouteComponentProps} from "react-router-dom";
import { addProductToCart } from 'redux/slices/cartSlice';
import { addLastViewedProduct } from 'redux/slices/lastViewedSlice';
import { CartProductsItem } from 'types/Product';
import {useGetProductByIdQuery} from "../../services/productsApi";

export type ColorType = {
    name: string
    hex: string
}

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
    const [cartProductItem, setCartProductItem] = useState<CartProductsItem | undefined>()
    const [color, setColor] = useState<{ name: string, hex: string }>(undefined as unknown as ColorType)

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(addLastViewedProduct(match.params.id))
    }, [])

    useEffect(() => {
        if (data && !color) {
            setColor(data.product.colors[0])
        }
    }, [data])

    useEffect(() => {
        if (data && color) {
            setCartProductItem({
                product: data.product,
                color
            })
        }
    }, [data, color])

    const onCartAddHandler = () => {
        if (cartProductItem) dispatch(addProductToCart(cartProductItem))
    }

    if (!data || !color) return null

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
                <Col span="16" style={{ paddingLeft: 30 }}>
                    <Title>{data.product.name}</Title>

                    <div>
                        <span style={{ fontWeight: 'bold' }}>Категория: </span>
                        <span>{data.product.category.name}</span>
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <span style={{ fontWeight: 'bold' }}>Описание: </span>
                        <span>{data.product.description}</span>
                    </div>

                    <div style={{ marginTop: 15 }}>
                        <ColorSelector colors={data.product.colors} setColor={setColor} color={color} />
                    </div>

                    <Button type="primary" size={"large"} style={{ marginTop: 10 }} onClick={onCartAddHandler}>
                        Добавить в корзину
                    </Button>
                </Col>
            </Row>
            
            <LastViewedProducts />
        </div>
    );
};

export default ProductPage;
