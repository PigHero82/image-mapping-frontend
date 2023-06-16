import { sweetAlert, toast } from "./alerts"
import { filterToApi, handleFetch } from "./apis"
import { errorValidation, regex } from "./forms"
import { pageNumber } from "./tables"
import fileName from "./fileName"
import numberFormat from "./numberFormat"

export {
  // alerts
  sweetAlert, toast,

  // apis
  filterToApi, handleFetch,

  // forms
  regex, errorValidation,

  // tables
  pageNumber,

  fileName, numberFormat
}