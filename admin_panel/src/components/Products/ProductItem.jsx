import React, {useState} from 'react';
import {Card, CardActions, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Redirect} from "react-router";
import DeleteProductDialog from "./DeleteProductDialog";

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        cursor: 'pointer',
        border: '1px solid transparent',
        '&:hover': {
            border: '1px solid blue',
        }
    }
}));

const ProductItem = ({product, deleteProduct}) => {
    const classes = useStyles()

    const [redirectId, setRedirectId] = useState(null)
    const [mustShowDialog, setMustShowDialog] = useState(false)
    
    const redirectToProduct = (id) => {
        setRedirectId(id)
    }

    const handleDialogClose = () => {
        setMustShowDialog(false)
    }
    const handleDialogOpen = () => {
        setMustShowDialog(true)
    }

    const handleDeleteProduct = () => {
        deleteProduct(product._id)
        handleDialogClose()
    }

    if (redirectId) return <Redirect to={`/product/${redirectId}`}/>

    return (
        <Card className={classes.card}>
            <CardContent onClick={() => redirectToProduct(product._id)}>
                <Typography color="textSecondary" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="h5" component="h2">

                </Typography>
                <Typography color="textSecondary">
                    adjective
                </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br/>
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="text" color="secondary" size="small" onClick={handleDialogOpen}>Delete</Button>
            </CardActions>

            <DeleteProductDialog open={mustShowDialog} handleDialogClose={handleDialogClose}
                                 handleDelete={handleDeleteProduct}/>
        </Card>
    );
};

export default ProductItem;
