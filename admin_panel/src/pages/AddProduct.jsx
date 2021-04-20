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

    const {request, isLoading: isCreatingProduct, error} = useHttp()

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
                    {/*<form noValidate autoComplete="off" method='post' onSubmit={onSubmit} className={classes.form}>*/}
                    {/*    <TextField*/}
                    {/*        required*/}
                    {/*        fullWidth*/}
                    {/*        id="filled-required"*/}
                    {/*        label="Name"*/}
                    {/*        value={name}*/}
                    {/*        onChange={(event) => setName(event.target.value)}*/}
                    {/*        variant="filled"*/}
                    {/*    />*/}
                    {/*    <TextField*/}
                    {/*        required*/}
                    {/*        fullWidth*/}
                    {/*        id="outlined-number"*/}
                    {/*        type="number"*/}
                    {/*        label="Price"*/}
                    {/*        value={price}*/}
                    {/*        onChange={(event) => setPrice(event.target.value)}*/}
                    {/*        variant="filled"*/}
                    {/*    />*/}
                    {/*    <TextField*/}
                    {/*        fullWidth*/}
                    {/*        id="outlined-number"*/}
                    {/*        type="number"*/}
                    {/*        label="Discount (new price, optional field)"*/}
                    {/*        value={discount}*/}
                    {/*        onChange={(event) => setDiscount(event.target.value)}*/}
                    {/*        variant="filled"*/}
                    {/*    />*/}
                    {/*    <TextField*/}
                    {/*        required*/}
                    {/*        placeholder="Description"*/}
                    {/*        multiline*/}
                    {/*        rows={2}*/}
                    {/*        fullWidth*/}
                    {/*        value={description}*/}
                    {/*        onChange={(event) => setDescription(event.target.value)}*/}
                    {/*        rowsMax={6}*/}
                    {/*    />*/}

                    {/*    <ColorsTable setColors={setColors}/>*/}
                    {/*    <CategorySelect setCategory={setCategoryId}/>*/}

                    {/*    {error && <Alert severity="error">{error}</Alert>}*/}
                    {/*    <Button*/}
                    {/*        type="submit"*/}
                    {/*        fullWidth*/}
                    {/*        variant="contained"*/}
                    {/*        disabled={isCategoriesLoading}*/}
                    {/*        color="primary"*/}
                    {/*        className={classes.submit}*/}
                    {/*    >*/}
                    {/*        Add*/}
                    {/*    </Button>*/}
                    {/*</form>*/}
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
                    }} isDisabled={isCreatingProduct}/>
                </Paper>
            </Grid>
        </Template>
    );
};

export default AddProduct;
