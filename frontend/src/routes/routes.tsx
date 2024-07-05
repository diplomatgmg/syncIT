import { ReactElement } from "react"
import HomePage from "../pages/Home/HomePage.tsx"
import LoginPage from "../pages/Login/LoginPage.tsx"
import RegisterPage from "../pages/Register/RegisterPage.tsx"

export enum RouteKeys {
  HOME = "home",
  LOGIN = "login",
  REGISTER = "register",
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
}

export default routes
