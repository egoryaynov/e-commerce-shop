import React, {useCallback, useContext, useEffect, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Deposits from '../components/Dashboard/Deposits';
import OrdersTable from '../components/Dashboard/OrdersTable';
import Template from "../components/Template";
import Chart from "../components/Dashboard/Chart";
import {useHttp} from "../hooks/useHttp";
import {TokenContext} from "../context/TokenContext";
import {OrdersApi} from "../api/OrdersApi";
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const {request, isLoading} = useHttp()
    const {token} = useContext(TokenContext)
    const [orders, setOrders] = useState(null)

    const requestOrders = useCallback(async () => {
        const options = new OrdersApi()
        options.getOrders(token)

        await request(options).then(r => {
            setOrders(r.orders)
        })
    }, [request, token])

    useEffect(() => {
        requestOrders().then()
    }, [requestOrders])

    return (
        <Template title='Dashboard'>
            {isLoading || !orders
                ? <CircularProgress/>
                : <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            {/*<Chart/>*/}
                            <Chart orders={orders}/>
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <Deposits orders={orders}/>
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <OrdersTable orders={orders}/>
                        </Paper>
                    </Grid>
                </Grid>
            }
        </Template>
    );
}