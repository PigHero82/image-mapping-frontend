import { Box, Globe, Home, User } from "react-feather"

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
    action: "view",
    resource: "HOME"
  },
  {
    header: "Master",
    action: "view",
    resource: "MISC"
  },
  {
    id: "user",
    title: "User",
    icon: <User size={20} />,
    navLink: "/master/user",
    action: "view",
    resource: "USER_R"
  },
  {
    id: "product",
    title: "Product",
    icon: <Box size={20} />,
    navLink: "/master/product",
    action: "view",
    resource: "USER_R"
  },
  {
    id: "mapping",
    title: "Mapping",
    icon: <Globe size={20} />,
    navLink: "/master/mapping",
    action: "view",
    resource: "USER_R"
  }
]
