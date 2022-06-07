import LastViewedProducts from 'components/LastViewedProducts/LastViewedProducts';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {RouteComponentProps} from "react-router-dom";
import { addLastViewedProduct } from 'redux/slices/lastViewedSlice';
import {useGetProductByIdQuery} from "../../services/productsApi";

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
            <LastViewedProducts />
        </div>
    );
};

export default ProductPage;
