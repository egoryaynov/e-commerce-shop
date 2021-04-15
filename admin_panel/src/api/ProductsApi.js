import {API} from "./API";

export class ProductsApi {
    getProducts = (page) => {
        this.url = `${API.baseUrl}/product?page=${page}`
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

    getProductById = (productId) => {
        this.url = `${API.baseUrl}/product/${productId}`
        this.method = 'GET'
    }

    addImages = (token, photoFiles, productId) => {
        const formData = new FormData()
        for (let i = 0; i < photoFiles.length; i++) {
            formData.append('file', photoFiles[i])
        }
        formData.append('productId', productId)

        this.url = `${API.baseUrl}/product/image`
        this.method = 'POST'
        this.isFormData = true
        this.contentType = null
        this.headers = {
            Authorization: `Bearer ${token}`
        }
        this.body = formData
    }
}