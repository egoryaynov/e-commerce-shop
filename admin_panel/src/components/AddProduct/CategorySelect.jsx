import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

const CategorySelect = ({categories, setCategory}) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    useEffect(() => {
        if (selectedCategory.length > 0) {
            setCategory(selectedCategory)
        }
    }, [selectedCategory]);

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
