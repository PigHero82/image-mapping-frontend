const fileName = (value) => {
  const filename = value.split("/")
  const name = filename[filename.length - 1]

  if (name.length > 20) {
    return `${name.substring(0, 20)}...`
  } else {
    return name
  }
}

export default fileName