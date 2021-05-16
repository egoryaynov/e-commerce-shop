import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import Template from "../components/Template";
import {useHttp} from "../hooks/useHttp";
import {ProductsApi} from "../api/ProductsApi";
import {AppBar, CircularProgress, Tab, Tabs} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ImageTab from "../components/Product/ImageTab";
import InfoTab from "../components/Product/InfoTab";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Product = () => {
    const {id: productId} = useParams()

    const {request, isLoading} = useHttp()
    const [product, setProduct] = useState()
    const [value, setValue] = useState(0)

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const options = new ProductsApi()

        const requestProduct = async () => {
            try {
                options.getProductById(productId)
                const data = await request(options)

                setProduct(data.product)
            } catch (e) {
                console.error(e)
            }
        }

        requestProduct()
    }, [])

    return (
        <Template title={`Product ${productId}`}>
            {isLoading || !product ? <CircularProgress/>
                : <>
                    <AppBar position="static">
                        <Tabs value={value} onChange={handleTabChange} aria-label="simple tabs example">
                            <Tab label="Info"/>
                            <Tab label="Images"/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <InfoTab productId={productId} product={product}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ImageTab images={product.images} setProduct={setProduct} productId={product._id}/>
                    </TabPanel>
                </>
            }
        </Template>
    );
};

export default Product;
