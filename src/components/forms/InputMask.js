// Components
import { Label, FormFeedback } from "reactstrap"

// Third-Party Library
import Cleave from "cleave.js/react"

const InputMask = ({
	label,
	type,
	errors,
	value,
	readable,
	onChange,
	id,
	noMargin,
	noLabel,
	className,
	...rest
}) => {
	const idRef = id ?? Math.random().toString(36).substring(2, 7)
	let options = { numeral: true, numeralThousandsGroupStyle: 'thousand' }

	if (type === 'numeralFormatting') {
		options = { numeral: true, numeralThousandsGroupStyle: 'thousand' }
	}

	return (
		<div className={`${noMargin ? 'mb-0' : 'mb-1'} ${className}`}>
			{!noLabel && (
				<Label className='form-label' for={`inputMask-${idRef}`}>
					{label}
				</Label>
			)}
			{readable ? (
				<>
					<br />
					<b>{value ?? '-'}</b>
				</>
			) : (
				<Cleave
					{...rest}
					className={`form-control ${errors && 'is-invalid'}`}
					id={`inputMask-${idRef}`}
					options={options}
					value={value}
					onChange={onChange}
				/>
			)}
			{errors ? <FormFeedback>{errors.message}</FormFeedback> : <></>}
		</div>
	)
}

export default InputMask
