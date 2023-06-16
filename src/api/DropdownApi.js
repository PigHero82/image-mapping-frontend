import { axios } from "@src/auth"

const base_url = `${process.env.REACT_APP_BASE_URL_API}/dropdown`
class DropdownApi {
  async detail_mapping() {
    const res = await axios.get(`${base_url}/detail-mapping`)
    return res.data.data
  }

  async mapping_action() {
    const res = await axios.get(`${base_url}/mapping-action`)
    return res.data.data
  }

  async product() {
    const res = await axios.get(`${base_url}/product`)
    return res.data.data
  }
}

export default new DropdownApi()