// Component
import { Button, UncontrolledTooltip } from "reactstrap"

// Icon
import { Edit2 } from "react-feather"

const EditButton = ({ onClick, id }) => (
	<>
		<Button.Ripple
			className='btn-icon'
			color='warning'
			onClick={onClick}
			id={`editbutton-${id}`}
			size="sm"
		>
			<Edit2 size={14} />
		</Button.Ripple>

		<UncontrolledTooltip placement='top' target={`editbutton-${id}`}>
			Ubah Data
		</UncontrolledTooltip>
	</>
)

export default EditButton