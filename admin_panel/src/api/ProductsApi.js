import {API} from "./API";

export class ProductsApi {
    getProducts = ({page}) => {
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
}