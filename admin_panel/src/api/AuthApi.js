import {API} from "./API";

export class AuthApi {
    validateToken = (token) => {
        this.url = `${API.baseUrl}/auth/admin/verify`
        this.method = 'POST'
        this.headers = {
            Authorization: `Bearer ${token}`
        }
    }

    login = (email, password) => {
        this.url = `${API.baseUrl}/auth/admin/login`
        this.method = 'POST'
        this.body = {
            email, password
        }
    }
}