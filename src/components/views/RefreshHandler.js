// Moment
import moment from "moment"
import 'moment/locale/id'

// Components
import { RefreshButton } from "components/buttons"

const RefreshHandler = ({ time, toggle }) => {
  // Variables
  moment.locale("id")

  return (
    <div className="d-flex justify-content-end">
      <div className="text-end d-md-block d-none">
        <div className="card-text font-small-3 me-25 mb-0 card-text">Update :</div>
        <div className="card-text font-small-3 me-25 mb-0 card-text">{moment(new Date(time).getTime()).fromNow()}</div>
      </div>
    
      <RefreshButton className="align-self-center" id="refresh" onClick={toggle} />
    </div>
  )
}

export default RefreshHandler