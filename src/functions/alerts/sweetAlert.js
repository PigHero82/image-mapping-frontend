// SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const sweetAlert = (title, icon, text) => {
	const MySwal = withReactContent(Swal)

	return MySwal.fire({
		title: title ?? 'Are you sure?',
		text,
		icon: icon ?? 'warning',
		showCancelButton: true,
		confirmButtonText: 'Yes',
		cancelButtonText: 'No',
		customClass: {
			confirmButton: 'btn btn-primary',
			cancelButton: 'btn btn-outline-danger ms-1'
		},
		buttonsStyling: false
	})
}

export default sweetAlert