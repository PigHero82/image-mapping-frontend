// React
import { Fragment } from "react"

// Components
import { Label, Input as ReactInput, InputGroup, InputGroupText } from "reactstrap"

// Third-Party Library
import PropTypes from "prop-types"

const NewInput = props => {
	return (
		<div className={`${props.noMargin ? 'mb-0' : 'mb-1'} ${props.className}`}>
			{!props.noLabel && (
				<Label className='fw-bold' for={`input-${props.id}`}>
					{props.label}
				</Label>
			)}
			{props.readable ? (
				<>
					{!props.noMargin && <br />}
					<div>{props.value ?? '-'}</div>
				</>
			) : (
				<Fragment>
					<InputGroup>
						{props.inputGroup?.start && (
							<InputGroupText>
								{props.inputGroup.start}
							</InputGroupText>
						)}

						<ReactInput
							rows={props.rows}
							name={props.name}
							type={props.type}
							invalid={Boolean(props.errors)}
							id={`input-${props.id}`}
							value={props.value}
							onChange={props.onChange}
							disabled={props.disabled}
							{...props}
						>
							{props.children}
						</ReactInput>

						{props.inputGroup?.end && (
							<InputGroupText>
								{props.inputGroup.end}
							</InputGroupText>
						)}

						{props.rightLabel && (
							<Label className='fw-bold ps-50' for={`input-${props.id}`}>
								{props.rightLabel}
							</Label>
						)}
					</InputGroup>
				</Fragment>
			)}
			{props.errors && <small className="text-danger">{props.errors}</small>}
		</div>
	)
}

NewInput.propTypes = {
	readable: PropTypes.bool,
	noMargin: PropTypes.bool,
	noLabel: PropTypes.bool,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	rightLabel: PropTypes.string,
	value: PropTypes.string,
	type: PropTypes.string,
	id: PropTypes.string,
	className: PropTypes.string,
	name: PropTypes.string,
	rows: PropTypes.number,
	errors: PropTypes.any,
	children: PropTypes.any,
	onChange: PropTypes.func,
	inputGroup: PropTypes.shape({
		start: PropTypes.string,
		end: PropTypes.string
	})
}

NewInput.defaultProps = {
	disabled: false,
	noLabel: false,
	noMargin: false,
	readable: false,
	type: "text",
	id: Math.random().toString(36).substring(2, 7),
	rows: 2
}

export default NewInput