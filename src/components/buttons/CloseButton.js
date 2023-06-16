// Components
import { Button } from "reactstrap"

// Icons
import { X } from "react-feather"

const CloseButton = ({ onClick }) => (
    <Button.Ripple
        // className='btn-icon'
        color='flat-danger'
        size='sm'
        onClick={onClick}
    >
        <X size={18} />
    </Button.Ripple>
)

export default CloseButton