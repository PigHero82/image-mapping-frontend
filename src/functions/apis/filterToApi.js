const filterToApi = (data) => {
  let dataFilter = {}
  for (const key in data) {
    if (data[key]) {
      dataFilter = {
        ...dataFilter,
        [data[key].api_label]: data[key].api_value
      }
    }
  }

  return dataFilter
}

export default filterToApi