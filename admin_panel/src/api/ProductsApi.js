import {API} from "./API";

export class ProductsApi {
    getProducts = (page, limit = 6) => {
        this.url = `${API.baseUrl}/product?page=${page}&limit=${limit}`
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

    editProduct = (token, product) => {
        this.url = `${API.baseUrl}/product`
        this.method = 'PUT'
        this.headers = {
            Authorization: `Bearer ${token}`
        }
        this.body = product
    }

    addImages = (token, photoFiles, productId) => {
        const formData = new FormData()
        // for (let i = 0; i < photoFiles.length; i++) {
        //     formData.append('file', photoFiles[i])
        // }
        Array.from(photoFiles).forEach(file => {
            formData.append('file', file)
        })
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