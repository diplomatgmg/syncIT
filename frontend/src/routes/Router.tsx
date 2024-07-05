import { Route, Routes } from "react-router-dom"
import routes from "./routes"

const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.home.path} element={routes.home.element} />
      <Route path={routes.login.path} element={routes.login.element} />
      <Route path={routes.register.path} element={routes.register.element} />
    </Routes>
  )
}

export default AppRouter
