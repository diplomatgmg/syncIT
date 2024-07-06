import { ReactElement } from "react"
import HomePage from "../pages/HomePage.tsx"
import LoginPage from "../pages/LoginPage.tsx"
import RegisterPage from "../pages/RegisterPage.tsx"
import ProfilePage from "../pages/ProfilePage.tsx"

export enum RouteKeys {
  HOME = "home",
  LOGIN = "login",
  REGISTER = "register",
  PROFILE = "profile",
}

export interface Route {
  path: string
  element: ReactElement
}

export type Routes = {
  [key in RouteKeys]: Route
}

const routes: Routes = {
  [RouteKeys.HOME]: {
    path: "/",
    element: <HomePage />,
  },
  [RouteKeys.LOGIN]: {
    path: "/login",
    element: <LoginPage />,
  },
  [RouteKeys.REGISTER]: {
    path: "/register",
    element: <RegisterPage />,
  },
  [RouteKeys.PROFILE]: {
    path: "/profile",
    element: <ProfilePage />,
  },
}

export default routes
