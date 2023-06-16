// Component
import { Button } from "reactstrap"

// Icon
import { Plus } from "react-feather"

const AddButton = ({ onClick }) => (
	<Button color='primary' onClick={onClick}>
		<Plus size={14} /> Add
	</Button>
)

export default AddButton