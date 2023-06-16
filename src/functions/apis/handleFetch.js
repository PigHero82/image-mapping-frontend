const handleFetch = (data = {}, params) => {
  const { page, rows_per_page, search, sort, direction, ...rest } = data

  let dataFilter = {}
  for (const key in rest) {
    if (data[key]) {
      dataFilter = {
        ...dataFilter,
        [data[key].api_label]: data[key].api_value
      }
    }
  }

  return {
    page: page ?? 1,
    rows_per_page: rows_per_page ?? 10,
    search: search && search !== "" ? search : undefined,
    sort,
    direction,
    ...dataFilter,
    ...params
  }
}

export default handleFetch