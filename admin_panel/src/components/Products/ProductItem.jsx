import React, {useState} from 'react';
import {Card, CardActions, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Redirect} from "react-router";

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

const ProductItem = ({product}) => {
    const classes = useStyles()

    const [redirectId, setRedirectId] = useState(null)

    console.log(product)

    const redirectToProduct = (id) => {
        setRedirectId(id)
    }

    if (redirectId) return <Redirect to={`/product/${redirectId}`}/>

    return (
        <Card className={classes.card} onClick={() => redirectToProduct(product._id)}>
            <CardContent>
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
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default ProductItem;
