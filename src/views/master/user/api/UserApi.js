import { axios } from "@src/auth"

const base_url = "http://127.0.0.1:8000/api/master/user"
class UserApi {
  async index(params) {
    const res = await axios.get(base_url, {params})
    return res.data.data
  }

  show(id) {
    return axios.get(`${base_url}/${id}`)
  }

  roleList() {
    return axios.get(`${base_url}/role-list`, {})
  }
}

export default new UserApi()