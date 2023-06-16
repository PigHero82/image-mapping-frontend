import { Users } from "react-feather"

const CustomRoleRadio = ({ id, label, checked, onChange }) => (
  <>
    <input
      type='radio'
      id={id}
      checked={checked}
      className='custom-option-item-check'
      onChange={onChange}
    />
    <label
      htmlFor={id}
      className='custom-option-item d-flex align-items-center flex-column flex-md-row px-3 py-2 mb-2'
    >
      <span>
        <Users className='font-large-2 me-md-2 mb-2 mb-sm-0' />
      </span>
      <span>
        <span className='custom-option-item-title d-block h4 m-0 text-capitalize'>{label}</span>
      </span>
    </label>
  </>
)

export default CustomRoleRadio