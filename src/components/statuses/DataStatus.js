import { Spinner } from 'reactstrap'

const DataStatus = ({children, loading, noMargin}) => {
  return (
    <div className={`d-flex justify-content-center align-items-center ${noMargin ? 'my-0' : 'my-5'}`}>
      {loading && (
        <div className="me-1">
          <Spinner />
        </div>
      )}
      <span>{children}</span>
    </div>
  )
}

export default DataStatus
