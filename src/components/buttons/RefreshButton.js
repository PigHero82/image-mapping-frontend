// Component
import { Button, UncontrolledTooltip } from "reactstrap"

// Icon
import { RotateCw } from "react-feather"

const RefreshButton = ({ onClick, id, className }) => (
	<>
		<Button.Ripple 
			className={`btn-icon ${className}`}
			color='warning'
			onClick={onClick}
			id={`refreshbutton-${id}`}
			size="sm"
		>
			<RotateCw size={14} />
		</Button.Ripple>

		<UncontrolledTooltip placement='top' target={`refreshbutton-${id}`}>
			Muat Ulang Data
		</UncontrolledTooltip>
	</>
)

export default RefreshButton