import { Modal, ModalHeader } from "reactstrap"

const FilterModal = ({children, toggle}) => (
  <Modal isOpen={true} toggle={toggle}>
    <ModalHeader toggle={toggle}>
      Filter
    </ModalHeader>

    {children}
  </Modal>
)

export default FilterModal