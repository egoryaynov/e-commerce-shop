import React from 'react';
import Grid from "@material-ui/core/Grid";
import Template from "../Template";
import {Paper, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {useCategories} from "../../hooks/useCategories";
import ColorsTable from "./ColorsTable";

const useStyle = makeStyles((theme) => ({
    form: {
        '& > div, button': {
            marginBottom: '10px'
        }
    },
    paper: {
        padding: theme.spacing(2),
    },
}))

const AddProduct = () => {
    const classes = useStyle()
    const {isLoading: isCategoriesLoading, categories} = useCategories()

    const onSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <Template title='AddProduct'>
            <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper}>
                    <form noValidate autoComplete="off" method='post' onSubmit={onSubmit} className={classes.form}>
                        <TextField
                            required
                            fullWidth
                            id="filled-required"
                            label="Name"
                            variant="filled"
                        />
                        <TextField
                            required
                            fullWidth
                            id="outlined-number"
                            type="number"
                            label="Price"
                            variant="filled"
                        />
                        <TextField
                            fullWidth
                            id="outlined-number"
                            type="number"
                            label="Discount"
                            variant="filled"
                        />

                        <ColorsTable/>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isCategoriesLoading}
                            color="primary"
                            className={classes.submit}
                        >
                            Add
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Template>
    );
};

export default AddProduct;
