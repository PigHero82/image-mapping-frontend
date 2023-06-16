// Components
import { DataStatus } from "components"

const FetchingStatus = ({loading}) => (
  <DataStatus loading={loading}>{loading ? "Loading..." : "Retrieve data failed"}</DataStatus>
)

export default FetchingStatus