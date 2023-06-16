import { axios } from "@src/auth"

const base_url = `${process.env.REACT_APP_BASE_URL_API}/master/product`
class Api {
  async index(params) {
    const res = await axios.get(base_url, {params})
    return res.data.data
  }

  store(value) {
    return axios.post(base_url, value)
  }
}

export default new Api()