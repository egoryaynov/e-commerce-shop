import React from 'react';
import Template from "../components/Template";
import {useCategories} from "../hooks/useCategories";
import {CircularProgress} from "@material-ui/core";

const Categories = () => {
    const {categories, isLoading} = useCategories()

    if (isLoading) return <CircularProgress/>

    return (
        <Template title='Categories'>
            AAAAA
        </Template>
    );
};

export default Categories;
