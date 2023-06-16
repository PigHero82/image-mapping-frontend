// Component
import { Button, UncontrolledTooltip } from "reactstrap"

// Icon
import { Trash2 } from "react-feather"

export const DeleteButton = ({ onClick, id }) => (
	<>
		<Button.Ripple
			className='btn-icon'
			color='danger'
			onClick={onClick}
			id={`deletebutton-${id}`}
			size="sm"
		>
			<Trash2 size={14} className="text-light" />
		</Button.Ripple>

		<UncontrolledTooltip placement='top' target={`deletebutton-${id}`}>
			Hapus Data
		</UncontrolledTooltip>
	</>
)