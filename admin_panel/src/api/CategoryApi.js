import {API} from "./API";

export class CategoryApi {
    getCategories = () => {
        this.url = `${API.baseUrl}/category`
        this.method = 'GET'
    }

    deleteCategory = (categoryId) => {
        this.url = `${API.baseUrl}/category`
        this.method = 'DELETE'
        this.body = {
            categoryId
        }
    }
}