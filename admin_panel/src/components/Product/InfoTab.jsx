import React, {useEffect, useState} from 'react';
import EditProductForm from "../common/EditProductForm";
import {useCategories} from "../../hooks/useCategories";
import {CircularProgress, Typography} from "@material-ui/core";

const InfoTab = ({product}) => {
    const {isLoading: isCategoriesLoading, categories} = useCategories()

    const [categoryId, setCategoryId] = useState(product.category._id)
    const [name, setName] = useState(product.name)
    const [colors, setColors] = useState(product.category.colors)
    const [description, setDescription] = useState(product.category.description)
    const [discount, setDiscount] = useState(product.category.discount || '')
    const [price, setPrice] = useState(product.category.price)

    const [selectedCategoryName, setSelectedCategoryName] = useState('')
    const [categoryChanged, setCategoryChanged] = useState(false)

    // useEffect(() => {
    //     console.log(categoryId)
    //     console.log(name)
    //     console.log(colors)
    //     console.log(description)
    //     console.log(discount)
    //     console.log(price)
    // }, [categoryId, name, colors, description, discount, price]);

    const onSubmit = () => {

    }

    useEffect(() => {
        if (categories) {
            const selectedCategory = categories.find(category => categoryId === category._id)

            setSelectedCategoryName(selectedCategory.name)
        }
    }, [categories]);

    const setCategoryIdWrapper = (categoryId) => {
        setCategoryChanged(true)

        setCategoryId(categoryId)
    }

    if (isCategoriesLoading) return <CircularProgress/>

    return (
        <>
            <Typography hidden={categoryChanged} color={'primary'} variant={'subtitle1'}>
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
                setCategoryIdWrapper: setCategoryId,
                description,
                setDescription,
                colors,
                setColors,
            }} buttonText='Change'/>
        </>
    );
};

export default InfoTab;
