import { axios } from "@src/auth"

const base_url = `${process.env.REACT_APP_BASE_URL_API}/master/detail-mapping`
class DetailApi {
  store(value) {
    return axios.post(base_url, value)
  }

  async show(id) {
    const res = await axios.get(`${base_url}/${id}`)
    return res.data.data
  }

  store_detail(id, value) {
    return axios.post(`${base_url}/detail/${id}`, value)
  }

  update_default(id) {
    return axios.patch(`${base_url}/update-default/${id}`)
  }
}

export default new DetailApi()