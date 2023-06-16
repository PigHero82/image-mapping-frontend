// Component
import { Button } from "reactstrap"

// Icon
import { ChevronLeft } from "react-feather"

const BackButton = ({ onClick }) => (
	<Button color='outline-secondary' onClick={onClick}>
		<ChevronLeft size={14} /> Back
	</Button>
)

export default BackButton