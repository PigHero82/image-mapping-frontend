// React-Select
import ReactAsync from "react-select/async"
import { components } from "react-select"

// Components
import { Button, Label } from "reactstrap"
import { Input } from "."

// Functions
import { selectThemeColors } from "utility/Utils"

// Icons
import { Plus } from "react-feather"

const Select = ({
  errors,
  id = Math.random().toString(36).substring(2, 7),
  label = "",
  options = [],
  placeholder = "Select...",
  loading,
  defaultValue,
  disabled = false,
  isMulti = false,
  noMargin = false,
  noLabel = false,
  noNewOption = false,
  onChange,
  onNewOption,
  ...rest
}) => {
  const filterColors = (inputValue) => {
    return options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
  }

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterColors(inputValue))
    }, 1000)
  }

  const CustomMenu = (props) => {
    return (
      <components.MenuList {...props}>
        {onNewOption && !noNewOption && (
          <Button block outline type="button" color="primary" className="rounded-0" onClick={onNewOption}>
            <Plus size={14} />
			      <span className='align-middle ms-25'>Tambah baru...</span>
          </Button>
        )}

        {props.children}
      </components.MenuList>
    )
  }

  return (
    <div className={`mb-${noMargin ? 0 : 1}`}>
      {!noLabel && (
        <Label className='form-label fw-bold' for={`select-${id}`}>
          {label}
        </Label>
      )}

      {loading ? (
        <Input
          noLabel
          id={`select-${id}`}
          disabled
          value="Please wait..."
        />
      ) : (
        <ReactAsync
          {...rest}
          id={`select-${id}`}
          isClearable={false}
          classNamePrefix="select"
          className="react-select"
          placeholder={placeholder}
          loadOptions={loadOptions}
          defaultOptions
          onChange={onChange}
          defaultValue={defaultValue}
          isDisabled={disabled}
          isMulti={isMulti}
          theme={selectThemeColors}
          components={{ MenuList: CustomMenu }}
          menuPortalTarget={document.body} 
          styles={{
            control: styles => ({
              ...styles,
              borderColor: errors ? 'red' : styles.borderColor,
              '&:hover': {
                borderColor: errors ? 'red' : styles['&:hover'].borderColor
              }
            }),
            menuPortal: base => ({ ...base, zIndex: 9999 })
          }}
        />
      )}

      {errors && <small className="text-danger">{errors}</small>}
    </div>
  )
}

export default Select