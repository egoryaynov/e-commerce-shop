import React, {useEffect, useState} from 'react';
import EditProductForm from "../common/EditProductForm";

const InfoTab = ({product}) => {
    const [categoryId, setCategoryId] = useState(product.category._id)
    const [name, setName] = useState(product.category.name)
    const [colors, setColors] = useState(product.category.colors)
    const [description, setDescription] = useState(product.category.description)
    const [discount, setDiscount] = useState(product.category.discount)
    const [price, setPrice] = useState(product.category.price)

    useEffect(() => {
        alert()
    }, [categoryId, name, colors, description, discount, price]);

    const onSubmit = () => {

    }

    console.log(product)
    return (
        <>
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
            }}/>
        </>
    );
};

export default InfoTab;
