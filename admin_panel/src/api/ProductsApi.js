import {API} from "./API";

export class ProductsApi {
    getProducts = ({page}) => {
        // todo add pagination
        this.url = `${API.baseUrl}/product`
        this.method = 'GET'
    }

    createProduct = (token, options) => {
        this.url = `${API.baseUrl}/product`
        this.method = 'POST'
        this.headers = {
            Authorization: `Bearer ${token}`
        }
        this.body = options
    }

    deleteProduct = (token, productId) => {
        this.url = `${API.baseUrl}/product`
        this.method = 'DELETE'
        this.headers = {
            Authorization: `Bearer ${token}`
        }
        this.body = {
            productId
        }
    }
}