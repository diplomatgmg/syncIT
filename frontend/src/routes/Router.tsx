import { Route, Routes } from "react-router-dom"
import routes from "./routes"
import ProtectedRoute from "./ProtectedRoute.tsx"

const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.home.path} element={routes.home.element} />
      <Route path={routes.login.path} element={routes.login.element} />
      <Route path={routes.register.path} element={routes.register.element} />

      <Route element={<ProtectedRoute />}>
        <Route path={routes.profile.path} element={routes.profile.element} />
      </Route>
    </Routes>
  )
}

export default AppRouter
