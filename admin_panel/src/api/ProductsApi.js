import {API} from "./API";

export class ProductsApi {
    getProducts = ({page}) => {
        this.url = `${API.baseUrl}/product`
        this.method = 'GET'
    }
}