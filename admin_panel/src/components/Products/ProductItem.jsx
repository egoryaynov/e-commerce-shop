import React, {useState} from 'react';
import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Redirect} from "react-router";
import DeleteProductDialog from "./DeleteProductDialog";

const useStyles = makeStyles((theme) => ({
    card: {
        cursor: 'pointer',
        border: '1px solid transparent',
        '&:hover': {
            border: '1px solid blue',
        }
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    colorCircle: {
        borderRadius: '50%',
        width: '30px',
        height: '30px'
    },
    colorsContainer: {
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(2),
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
        <Card className={classes.card} onClick={() => redirectToProduct(product._id)}>
            <CardHeader
                title={product.name}
                subheader={product.category[0].name}
            />
            <Grid className={classes.colorsContainer} spacing={1} container>
                {product.colors.map(color => {
                    return <Grid className={classes.colorsItem} item>
                        <div className={classes.colorCircle} style={{backgroundColor: color.hex}}/>
                    </Grid>
                })}
            </Grid>

            {product.images &&
            <CardMedia
                className={classes.media}
                image={product.images}
                title="Product image"
            />}

            <CardContent>
                <Typography variant="body2" component="p">
                    {product.description}
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
