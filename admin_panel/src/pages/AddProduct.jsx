import React, {useContext, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Template from "../components/Template";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {TokenContext} from "../context/TokenContext";
import {ProductsApi} from "../api/ProductsApi";
import {useHttp} from "../hooks/useHttp";
import {Redirect} from "react-router";
import EditProductForm from "../components/common/EditProductForm";

const useStyle = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
}))

const AddProduct = () => {
    const classes = useStyle()
    const {token} = useContext(TokenContext)

    const {request, isLoading: isCreatingProduct} = useHttp()

    const [name, setName] = useState('');
    const [price, setPrice] = useState('0');
    const [discount, setDiscount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [colors, setColors] = useState([]);

    const [createdProductId, setCreatedProductId] = useState(null)

    const onSubmit = (event) => {
        event.preventDefault()
        const options = new ProductsApi()
        const requestPayload = {name, price, categoryId, colors, description}
        if (discount.length > 0) requestPayload.discount = discount

        options.createProduct(token, requestPayload)
        request(options).then(r => {
            setCreatedProductId(r.product._id)
        })
    }

    if (createdProductId) return <Redirect to={`/product/${createdProductId}`}/>

    return (
        <Template title='AddProduct'>
            <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper}>
                    <EditProductForm onSubmit={onSubmit} config={{
                        name,
                        setName,
                        price,
                        setPrice,
                        discount,
                        setDiscount,
                        categoryId,
                        setCategoryId,
                        description,
                        setDescription,
                        colors,
                        setColors
                    }} isDisabled={isCreatingProduct} buttonText={'Add'}/>
                </Paper>
            </Grid>
        </Template>
    );
};

export default AddProduct;
