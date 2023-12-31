// ** React Imports
import { Fragment, lazy } from "react"
import { Navigate } from "react-router-dom"

// ** Layouts
import BlankLayout from "@layouts/BlankLayout"
import VerticalLayout from "@src/layouts/VerticalLayout"
import HorizontalLayout from "@src/layouts/HorizontalLayout"
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper"

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute"
import PrivateRoute from '@components/routes/PrivateRoute'

// ** Utils
import { isObjEmpty } from "@utils"

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template"

// ** Default Route
const DefaultRoute = "/home"

const Home = lazy(() => import("../../views/Home"))

// Master
const User = lazy(() => import("../../views/master/user"))
const Product = lazy(() => import("../../views/master/product"))
// ** Mapping
const Mapping = lazy(() => import("../../views/master/mapping"))
const DetailMapping = lazy(() => import("../../views/master/mapping/DetailMapping"))
const ImageMapping = lazy(() => import("../../views/master/mapping/ImageMapping"))
const MappingSimulasi = lazy(() => import("../../views/master/mapping/Simulasi"))

const SecondPage = lazy(() => import("../../views/SecondPage"))
const ForgotPassword = lazy(() => import("../../views/ForgotPassword"))
const Error = lazy(() => import("../../views/Error"))

// Auth
const Login = lazy(() => import("../../views/Auth/Login"))
const Register = lazy(() => import("../../views/Auth/Register"))

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    exact: true,
    element: <Navigate replace to={DefaultRoute} />
  },
  {
    path: "/home",
    exact: true,
    element: <Home />,
    meta: {
      action: 'view',
      resource: 'HOME'
    }
  },
  // Master
  {
    path: "/master/user",
    exact: true,
    element: <User />,
    meta: {
      action: 'view',
      resource: 'USER_R'
    }
  },
  {
    path: "/master/product",
    exact: true,
    element: <Product />,
    meta: {
      action: 'view',
      resource: 'USER_R'
    }
  },
  // ** Mapping
  {
    path: "/master/mapping",
    exact: true,
    element: <Mapping />,
    meta: {
      action: 'view',
      resource: 'USER_R'
    }
  },
  {
    path: "/master/mapping/simulasi/:id",
    exact: true,
    element: <MappingSimulasi />,
    meta: {
      action: 'view',
      resource: 'USER_R'
    }
  },
  {
    path: "/master/mapping/detail/:id",
    exact: true,
    element: <DetailMapping />,
    meta: {
      action: 'view',
      resource: 'USER_R'
    }
  },
  {
    path: "/master/mapping/detail/:id",
    exact: true,
    element: <DetailMapping />,
    meta: {
      action: 'view',
      resource: 'USER_R'
    }
  },
  {
    path: "/master/mapping/image/:id",
    exact: true,
    element: <ImageMapping />,
    meta: {
      action: 'view',
      resource: 'USER_R'
    }
  }
  // {
  //   path: "/register",
  //   element: <Register />,
  //   meta: {
  //     layout: "blank"
  //   }
  // },
  // {
  //   path: "/forgot-password",
  //   element: <ForgotPassword />,
  //   meta: {
  //     layout: "blank"
  //   }
  // },
  // {
  //   path: "/error",
  //   element: <Error />,
  //   meta: {
  //     layout: "blank"
  //   }
  // }
]

const getRouteMeta = route => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter(route => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      ) {
        let RouteTag = PrivateRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = layout => {
  const defaultLayout = layout || 'vertical'
  const layouts = ['vertical', 'horizontal', 'blank']

  const AllRoutes = []

  layouts.forEach(layoutItem => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }
