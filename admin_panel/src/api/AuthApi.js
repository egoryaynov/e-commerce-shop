import {API} from "./API";

export class AuthApi {
    validateToken = (token) => {
        this.url = `${API.baseUrl}/auth/admin/verify`
        this.method = 'POST'
        this.headers = {
            Authorization: token
        }
    }
}