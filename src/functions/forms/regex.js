const regex = (value) => {
  return {
    required: {
      label: "Field is required"
    },
    email: {
      label: "Wajib diisi dengan format email"
    },
    min: {
      value,
      label: `Wajib diisi minimal ${value} karakter`
    },
    typeError: {
      label: "Wrong field format"
    }
  }
}

export default regex