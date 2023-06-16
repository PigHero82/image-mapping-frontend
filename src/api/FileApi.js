import { axios } from "@src/auth"

const base_url = `${process.env.REACT_APP_BASE_URL_API}/file`
class FileApi {
  store(value) {
    return axios.post(base_url, value)
  }

  destroy(value) {
    return axios.post(`${base_url}/destroy`, value)
  }
}

export default new FileApi()