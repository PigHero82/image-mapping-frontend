import { axios } from "@src/auth"

const base_url = process.env.REACT_APP_BASE_URL_API
class AuthApi {
  login(...args) {
    return axios.post(`${base_url}/login`, ...args)
  }
}

export default new AuthApi()