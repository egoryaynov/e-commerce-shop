import React from 'react';
import {TextField} from "@material-ui/core";
import ColorsTable from "../../AddProduct/ColorsTable";
import CategorySelect from "./CategorySelect";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    form: {
        '& > div, button, table, select': {
            marginBottom: '10px'
        }
    },
}))

const EditProductForm = ({onSubmit, isDisabled, config}) => {
    const classes = useStyles()

    return (
        <form noValidate autoComplete="off" method='post' onSubmit={onSubmit} className={classes.form}>
            <TextField
                required
                fullWidth
                id="filled-required"
                label="Name"
                value={config.name}
                onChange={(event) => config.setName(event.target.value)}
                variant="filled"
            />
            <TextField
                required
                fullWidth
                id="outlined-number"
                type="number"
                label="Price"
                value={config.price}
                onChange={(event) => config.setPrice(event.target.value)}
                variant="filled"
            />
            <TextField
                fullWidth
                id="outlined-number"
                type="number"
                label="Discount (new price, optional field)"
                value={config.discount}
                onChange={(event) => config.setDiscount(event.target.value)}
                variant="filled"
            />
            <TextField
                required
                placeholder="Description"
                multiline
                rows={2}
                fullWidth
                value={config.description}
                onChange={(event) => config.setDescription(event.target.value)}
                rowsMax={6}
            />

            <ColorsTable setColors={config.setColors}/>
            <CategorySelect setCategory={config.setCategoryId}/>

            {/*{error && <Alert severity="error">{error}</Alert>}*/}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isDisabled || false}
                color="primary"
            >
                Add
            </Button>
        </form>
    );
};

export default EditProductForm;
