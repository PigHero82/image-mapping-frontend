// Component
import { DataStatus } from "components/statuses"

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const SimpleDatatable = ({
	data, page, columns
}) => (
	<div className='react-dataTable'>
		<DataTable
			noHeader
			pagination
			className='react-dataTable'
			sortIcon={<ChevronDown size={10} />}
			data={data}
			columns={columns}
			noDataComponent={<DataStatus>No data available</DataStatus>}
			striped={true}
			progressPending={page.loading}
		/>
	</div>
)

export default SimpleDatatable