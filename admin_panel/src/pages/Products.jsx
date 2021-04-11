import React, {useEffect, useState} from 'react';
import Template from "../components/Template";
import {useHttp} from "../hooks/useHttp";
import {Pagination} from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";
import {ProductsApi} from "../api/ProductsApi";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress, Paper} from "@material-ui/core";
import {Link} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography";
import ProductItem from "../components/Products/ProductItem";

const useStyles = makeStyles((theme) => ({
    addButton: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(2)
    }
}));

const Products = () => {
    const classes = useStyles();

    const {request, isLoading, error} = useHttp()
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)

    const changePage = (event, value) => {
        setPage(value)
    }

    useEffect(() => {
        const options = new ProductsApi()
        options.getProducts(page)

        request(options)
            .then(r => {
                setProducts(r.products.docs)
                setPagesCount(r.products.totalPages)
            })
    }, [page, request])

    return (
        <Template title='Products'>
            <Grid item xs={12} md={12} lg={12}>
                {!isLoading && products.length > 0 &&
                <Pagination
                    count={pagesCount}
                    page={page}
                    variant="outlined"
                    onChange={changePage}
                    size="large"
                />}


                <Link to="/products/add">
                    <Button variant="contained" color="primary" className={classes.addButton} startIcon={<AddIcon/>}>
                        Add new product
                    </Button>
                </Link>

                <Grid item xs={12} md={12} lg={12}>
                    {isLoading && <CircularProgress/>}

                    {!isLoading && products.length === 0 &&
                    <Typography variant='body1' className={classes.addButton}>Products doesn't exist yet</Typography>}

                    <Grid container>
                        {!isLoading && products.length > 0 &&
                        products.map(product => {
                            return (
                                <Grid item xs={3} md={3} lg={3}>
                                    <ProductItem key={product._id} product={product}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </Template>
    );
};

export default Products;
