// React
import { Fragment } from "react"

// Component
import { Row, Col, Label, Input, Button } from "reactstrap"
import { DataStatus } from "components/statuses"

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Filter, X } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

// Functions
import { pageNumber } from "functions"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { handleParam } from "redux/fetchParams"

const Datatable = ({
	input = {}, dataInput, data, page, columns, toggleFilter,
	exportTable, paramsKey
}) => {
	// Hooks
	const dispatch = useDispatch()
	const state = useSelector(state => state.fetchParams)

	// Variables
	const per_page = dataInput?.per_page ? parseInt(dataInput.per_page) : 0
	// ** DataFilter
	const dataFilter = {...state[paramsKey]}
	delete dataFilter.page
	delete dataFilter.rows_per_page
	delete dataFilter.search
	delete dataFilter.sort
	delete dataFilter.direction

	// ** Custom Pagination
	const CustomPagination = () => (
		<Row>
			<Col md='4' className="my-auto ms-auto text-end text-md-start pt-1 pt-md-0">
				<div className="mx-1">{dataInput?.current_page === 1 ? 1 : ((dataInput?.current_page - 1) * per_page) + 1} - {dataInput?.current_page * per_page < dataInput?.total ? dataInput?.current_page * per_page : dataInput?.total} of {dataInput?.total}</div>
			</Col>

			<Col md='8' className="text-center text-md-end">
				<ReactPaginate
					previousLabel={''}
					nextLabel={''}
					breakLabel='...'
					pageCount={dataInput?.last_page ?? 0}
					marginPagesDisplayed={2}
					pageRangeDisplayed={2}
					activeClassName='active'
					forcePage={input?.page ? input.page - 1 : 0}
					onPageChange={page => dispatch(handleParam({
            [paramsKey]: {
              ...state[paramsKey],
              page: page.selected + 1
            }
          }))}
					pageClassName='page-item'
					breakClassName='page-item'
					nextLinkClassName='page-link'
					pageLinkClassName='page-link'
					breakLinkClassName='page-link'
					previousLinkClassName='page-link'
					nextClassName='page-item next-item'
					previousClassName='page-item prev-item'
					containerClassName={
						'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
					}
				/>
			</Col>
		</Row>
	)

	const DataFilter = () => {
		const data = []
		for (const key in dataFilter) {
			if (dataFilter[key]) {
				data.push({
					...dataFilter[key],
					key
				})
			}
		}

		return data
	}

	return (
		<>
			{!page.status ? (
				<DataStatus>Data gagal dimuat, tidak dapat menampilkan data</DataStatus>
			) : (
				<>
					{Boolean(toggleFilter !== undefined || !exportTable) && (
						<>
							<Row className='mx-0 mt-1 mb-50'>
								<Col md='6'>
									<div className='d-flex align-items-center justify-content-md-start justify-content-center'>
										{!exportTable && (
											<Fragment>
												<Label for='sort-select'>Show :</Label>
												<Input
													className='dataTable-select'
													type='select'
													id='sort-select'
													style={{backgroundPosition: 'right 1rem center'}}
													value={input?.rows_per_page}
													onChange={e => dispatch(handleParam({
														[paramsKey]: {
															...state[paramsKey],
															page: 1,
															rows_per_page: e.target.value
														}
													}))}
												>
													<option value={10}>10</option>
													<option value={25}>25</option>
													<option value={50}>50</option>
													<option value={75}>75</option>
													<option value={100}>100</option>
												</Input>
												<Label for='sort-select' className={`${toggleFilter !== undefined && "me-1"}`}>Entries</Label>
											</Fragment>
										)}

										{toggleFilter !== undefined && (
											<Fragment>
												<Button.Ripple
													color='secondary'
													outline
													onClick={toggleFilter}
												>
													<div className="d-flex">
														<Filter size={14} />
														<span className="ms-50 d-sm-block d-none">Filter</span>
													</div>
												</Button.Ripple>
											</Fragment>
										)}
									</div>
								</Col>
								<Col className='d-flex align-items-center justify-content-md-end justify-content-center mt-md-0 mt-1' md='6'>
									{!exportTable && (
										<>
											<Label className='me-1' for='search-input'>
												Search
											</Label>
											<Input
												className='dataTable-filter'
												type='text'
												bsSize='sm'
												id='search-input'
												value={input?.search}
												onChange={e => dispatch(handleParam({
													[paramsKey]: {
														...state[paramsKey],
														page: 1,
														search: e.target.value
													}
												}))}
											/>
										</>
									)}
								</Col>
							</Row>

							{DataFilter().length > 0 && (
								<div>
									{DataFilter().map((val, index) => (
										<Button.Ripple
											key={index}
											color='primary'
											size='sm'
											className='mx-50 mb-50 round'
											outline
											onClick={() => dispatch(handleParam({
												[paramsKey] : {
													...state[paramsKey],
													[val.key]: undefined
												}
											}))}
										>
											{`${val.label}: ${val.value}`} <X size={12} />
										</Button.Ripple>
									))}
								</div>
							)}
						</>
					)}

					<div className='react-dataTable'>
						<DataTable
							noHeader
							pagination
							paginationServer={!exportTable}
							sortServer
							onSort={async (column, direction) => {
								dispatch(handleParam({
									[paramsKey]: {
										...state[paramsKey],
										sort: column.sortField,
										direction
									}
								}))
							}}
							className='react-dataTable'
							columns={[
								{
									name: 'No.',
									width: '80px',
									center: true,
									selector: row => row.no_input
								},
								...columns
							]}
							sortIcon={<ChevronDown size={10} />}
							paginationComponent={!exportTable && CustomPagination}
							data={data ? data.map((val, index) => {
								return {
									no_input: !exportTable ? pageNumber(dataInput?.current_page ?? 0, per_page, index + 1) : index + 1,
									...val
								}
							}) : []}
							noDataComponent={<DataStatus>No data available</DataStatus>}
							striped={true}
							progressPending={page.loading}
						/>
					</div>
				</>
			)}
		</>
	)
}

export default Datatable