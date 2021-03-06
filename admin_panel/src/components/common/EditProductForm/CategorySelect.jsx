import React, {useEffect, useState} from 'react';
import {CircularProgress, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useCategories} from "../../../hooks/useCategories";

const CategorySelect = ({setCategory}) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const {isLoading, categories} = useCategories()

    const handleChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    useEffect(() => {
        if (selectedCategory.length > 0) {
            setCategory(selectedCategory)
        }
    }, [selectedCategory, setCategory]);

    if (isLoading) return <CircularProgress/>

    return (
        <FormControl required fullWidth>
            <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
            <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={selectedCategory}
                onChange={handleChange}
            >
                {categories.map(category => {
                    return <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
};

export default CategorySelect;
