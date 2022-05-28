import React, {useCallback, useContext, useEffect, useState} from 'react';
import Template from "../components/Template";
import {useHttp} from "../hooks/useHttp";
import {OrdersApi} from "../api/OrdersApi";
import {TokenContext} from "../context/TokenContext";
import {CircularProgress} from "@material-ui/core";

const Orders = () => {
    const {request, isLoading} = useHttp()
    const {token} = useContext(TokenContext)
    const [orders, setOrders] = useState([])

    const requestOrders = useCallback(async () => {
        const options = new OrdersApi()
        options.getOrders(token)

        await request(options).then(r => setOrders(r.orders))
    }, [request, token])

    useEffect(() => {
        requestOrders().then()
    }, [requestOrders])


    return (
        <Template title='Orders'>
            {isLoading
                ? <CircularProgress/>
                : orders.map(order => {
                    return <p>{order._id}</p>
                })
            }
        </Template>
    );
};

export default Orders;
