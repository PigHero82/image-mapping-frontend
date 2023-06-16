// Components
import { Label, Input, FormFeedback } from "reactstrap"

const FormInput = ({
	label,
	errors,
	children,
	register,
	name,
	value,
	readable,
	onChange,
	type,
	id,
	noMargin,
	noLabel,
	className,
	...rest
}) => {
	const idRef = id ?? Math.random().toString(36).substring(2, 7)
	const handleRegister = register ? register(name) : null

	return (
		<div className={`${noMargin ? 'mb-0' : 'mb-1'} ${className}`}>
			{!noLabel && (
				<Label className='form-label' for={`input-${id}`}>
					{label}
				</Label>
			)}
			{readable ? (
				<>
					<br />
					<b>{value ?? '-'}</b>
				</>
			) : (
				<Input
					{...rest}
					type={type}
					innerRef={register ? handleRegister.ref : null}
					onChange={register ? handleRegister.onChange : onChange}
					name={register ? handleRegister.name : name}
					invalid={Boolean(errors)}
					id={`input-${idRef}`}
					defaultValue={value}
				>
					{children}
				</Input>
			)}
			{errors ? <FormFeedback>{errors.message}</FormFeedback> : <></>}
		</div>
	)
}

export default FormInput
