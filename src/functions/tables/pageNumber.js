const pageNumber = (page, dataLength, index) => {
	const number = (page * dataLength) + index - dataLength
	return number
}

export default pageNumber