import {API} from "./API";

export class CategoryApi {
    getCategories = () => {
        this.url = `${API.baseUrl}/category`
        this.method = 'GET'
    }
}