// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import toastAlert from "react-hot-toast"

// Icons
import { Check, AlertTriangle, Info } from 'react-feather'

const toast = (status, message, children) => {
  const Icon = ({ status }) => {
    if (status === 'success') {
      return <Check size={14} />
    } else if (status === 'info') {
      return <Info size={14} />
    } else {
      return <AlertTriangle size={14} />
    }
  }

  return toastAlert(
    t => (
      <div className='w-100 d-flex align-items-center justify-content-between' onClick={() => toastAlert.dismiss(t.id)}>
        <div className='d-flex align-items-center me-1'>
          <Avatar color={status} icon={<Icon status={status} />} className='me-1' />

          <div>
          <h5 className={`fw-bold ${!children && 'mb-0'}`}>{message}</h5>
            {children}
          </div>
        </div>
      </div>
    ),
    { duration: 3000 }
  )
}

export default toast