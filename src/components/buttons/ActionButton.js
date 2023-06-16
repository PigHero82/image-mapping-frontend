// React
import { Fragment } from "react"

// Components
import { Button, Spinner, UncontrolledTooltip } from "reactstrap"

// Third-party Library
import classnames from "classnames"

const ActionButton = ({ children, loading, block, id, tooltipText, ...rest }) => (
	<Fragment>
		<Button {...rest} block={block} disabled={loading} id={id}>
			{loading && (
				<Spinner
					className={classnames({
						"position-relative": true,
						"button-style": !block,
						visible: loading,
						invisible: !loading
					})}
					size="sm"
				/>
			)}
			{!loading && (
				<span
					className={classnames({
						invisible: loading,
						visible: !loading,
						"span-style": !block
					})}
				>
					{children ?? "Submit"}
				</span>
			)}
		</Button>

		{tooltipText && (
			<UncontrolledTooltip placement='top' target={id}>
				{tooltipText}
			</UncontrolledTooltip>
		)}
	</Fragment>
)
export default ActionButton
