// ** React Imports
import { Navigate } from "react-router-dom"
import { useContext, Suspense } from "react"

// ** Context Imports
import { AbilityContext } from "@src/utility/context/Can"

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const ability = useContext(AbilityContext)
  const user = JSON.parse(localStorage.getItem("userData"))

  if (route) {
    let action = null
    let resource = null
    let restrictedRoute = false

    if (route.meta) {
      action = route.meta.action
      resource = route.meta.resource
      restrictedRoute = route.meta.restricted
    }
    if (!user) {
      console.log('this')
      return <Navigate to="/login" />
    }
    if (user && restrictedRoute) {
      console.log('this')
      return <Navigate to="/" />
    }
    if (user && !ability.can(action || "read", resource)) {
      console.log('this')
      return <Navigate to="/misc/not-authorized" replace />
    }
    if (user && restrictedRoute) {
      console.log('this')
      return <Navigate to="/access-control" />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
