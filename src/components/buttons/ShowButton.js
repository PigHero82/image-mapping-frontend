// Component
import { Button, UncontrolledTooltip } from "reactstrap"

// Icon
import { Eye } from "react-feather"

const ShowButton = ({ onClick, id }) => (
	<>
		<Button.Ripple
			className='btn-icon'
			color='info'
			onClick={onClick}
			id={`readbutton-${id}`}
			size="sm"
		>
			<Eye size={14} />
		</Button.Ripple>

		<UncontrolledTooltip placement='top' target={`readbutton-${id}`}>
			Detail Data
		</UncontrolledTooltip>
	</>
)

export default ShowButton