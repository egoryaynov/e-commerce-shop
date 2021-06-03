import {API} from "./API";

export class CategoryApi {
    getCategories = () => {
        this.url = `${API.baseUrl}/category`
        this.method = 'GET'
    }

    deleteCategory = (categoryId, token) => {
        this.url = `${API.baseUrl}/category`
        this.method = 'DELETE'
        this.headers = {
            Authorization: `Bearer ${token}`
        }
        this.body = {
            categoryId
        }
    }

    createCategory = (name, token) => {
        this.url = `${API.baseUrl}/category`
        this.method = 'POST'
        this.headers = {
            Authorization: `Bearer ${token}`
        }
        this.body = {
            name
        }
    }

    changeCategory = (categoryId, name, token) => {
        this.url = `${API.baseUrl}/category`
        this.method = 'PUT'
        this.headers = {
            Authorization: `Bearer ${token}`
        }
        this.body = {
            categoryId,
            newCategoryName: name
        }
    }
}