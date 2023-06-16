// React
import { Fragment } from "react"

// Component
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, UncontrolledTooltip } from "reactstrap"

// Icon
import PropTypes from "prop-types"

const DropdownButton = props => (
	<Fragment>
		<UncontrolledButtonDropdown>
			<DropdownToggle
				caret={props.caret}
				className={props.className}
				color='primary'
				size={props.size}
				id={`dropdownbutton-${props.id}`}
			>
				{props.children ? props.children : props.icon ? <props.icon size={14} className="text-light" /> : ""}
			</DropdownToggle>
			<DropdownMenu container="body">
				{props.item.map((val, key) => (
					<DropdownItem
						key={key}
						href="#"
						tag='a'
						onClick={e => {
							e.preventDefault()
							val.onClick()
						}}
					>
						{val.label}
					</DropdownItem>
				))}
			</DropdownMenu>
		</UncontrolledButtonDropdown>

		{props.toolTip && (
			<UncontrolledTooltip placement='top' target={`dropdownbutton-${props.id}`}>
				{props.toolTip}
			</UncontrolledTooltip>
		)}
	</Fragment>
)

DropdownButton.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  toolTip: PropTypes.string,
	caret: PropTypes.bool,
	icon: PropTypes.element,
	children: PropTypes.any,
	item: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			onClick: PropTypes.func
		})
	)
}

DropdownButton.defaultProps = {
	size: "md",
  id: Math.random().toString(36).substring(2, 7)
}

export { DropdownButton }