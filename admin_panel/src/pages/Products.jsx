import React, {useEffect, useState} from 'react';
import Template from "../components/Template";
import {useHttp} from "../hooks/useHttp";
import {Pagination} from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";
import {ProductsApi} from "../api/ProductsApi";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    addButton: {
        marginTop: theme.spacing(2),
    },
}));

const Products = () => {
    const classes = useStyles();

    const {request, isLoading, error} = useHttp()
    const [page, setPage] = useState(1)

    const changePage = (event, value) => {
        setPage(value)
    }

    useEffect(() => {
        const options = new ProductsApi()
        options.getProducts(page)

        //request(options).then()
    }, [page])

    if (isLoading) {
        return <CircularProgress/>
    }

    return (
        <Template title='Products'>
            <Grid item xs={12} md={12} lg={12}>
                <Pagination
                    count={100}
                    page={page}
                    variant="outlined"
                    onChange={changePage}
                    size="large"
                />
                <Button
                    className={classes.addButton}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon/>}
                >
                    Add new product
                </Button>
            </Grid>
        </Template>
    );
};

export default Products;
