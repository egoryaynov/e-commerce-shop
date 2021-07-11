import {API} from "./API";

export class OrdersApi {
    getOrders = (token) => {
        this.url = `${API.baseUrl}/order`
        this.method = 'GET'
        this.headers = {
            Authorization: `Bearer ${token}`
        }
    }
}