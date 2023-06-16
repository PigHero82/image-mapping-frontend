export default (error, setErrors) => {
	setErrors(error?.errors ?? {})
}