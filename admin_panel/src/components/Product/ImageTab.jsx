import React, {useContext, useRef} from 'react';
import Typography from "@material-ui/core/Typography";
import {useHttp} from "../../hooks/useHttp";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import {TokenContext} from "../../context/TokenContext";
import {ProductsApi} from "../../api/ProductsApi";
import {Alert} from "@material-ui/lab";

const ImageTab = ({images, setProduct, productId}) => {
    const {request, isLoading} = useHttp()
    const {token} = useContext(TokenContext)

    const inputRef = useRef()

    const handleAddImage = () => {
        const options = new ProductsApi()

        const requestProduct = async () => {
            try {
                options.addImages(token, inputRef.current.files, productId)
                const data = await request(options)

                setProduct(data.product)
            } catch (e) {
                console.error(e)
            }
        }

        requestProduct().then()
    }

    return (
        <>
            {images.length === 0
                ? <Typography>No images upload yet</Typography>
                : images.map((imageUrl, idx) => {
                    return (<img alt={'image' + idx} src={'http://' + imageUrl}/>)
                })
            }
            {images.length >= 5 && <Alert severity="warning">Max images count is 5</Alert>}

            <Button
                variant="contained"
                component="label"
                disabled={isLoading || images.length >= 5}
                endIcon={<AddIcon/>}
            >
                Upload File
                <input
                    accept='image/*'
                    ref={inputRef}
                    type='file'
                    hidden
                    name='file'
                    onChange={handleAddImage}
                    multiple={true}
                />
            </Button>
        </>
    )
}

export default ImageTab
