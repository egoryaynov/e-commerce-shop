import React, {useContext, useEffect, useState} from 'react';
import EditProductForm from "../common/EditProductForm";
import {useCategories} from "../../hooks/useCategories";
import {CircularProgress, Typography} from "@material-ui/core";
import {TokenContext} from "../../context/TokenContext";
import {ProductsApi} from "../../api/ProductsApi";
import {useHttp} from "../../hooks/useHttp";
import {Redirect} from "react-router";

const InfoTab = ({product, productId}) => {
    const {token} = useContext(TokenContext)
    const {request, isLoading: submitting} = useHttp()

    const {isLoading: isCategoriesLoading, categories} = useCategories()

    const [categoryId, setCategoryId] = useState(product.category._id)
    const [name, setName] = useState(product.name)
    const [colors, setColors] = useState(product.colors)
    const [description, setDescription] = useState(product.description)
    const [discount, setDiscount] = useState(product.discount || '')
    const [price, setPrice] = useState(product.price)

    const [selectedCategoryName, setSelectedCategoryName] = useState('')

    const [edited, setEdited] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault()

        const options = new ProductsApi()
        options.editProduct(token, {productId, categoryId, name, colors, description, discount, price})

        try {
            request(options).then((res) => {
                setEdited(true)
            })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (categories && categories.length > 0) {
            const selectedCategory = categories.find(category => categoryId === category._id)

            setSelectedCategoryName(selectedCategory.name)
        }
    }, [categories]);

    if (isCategoriesLoading) return <CircularProgress/>
    if (edited) return <Redirect to={'/products'}/>

    return (
        <>
            <Typography color={'primary'} variant={'subtitle1'}>
                Current category is: {selectedCategoryName}
            </Typography>

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
                setColors,
            }} buttonText='Change' currentColors={colors}/>
        </>
    );
};

export default InfoTab;
