import { Route, Routes } from "react-router-dom"
import routes from "@/routes/routes.tsx"
import ProtectedRoute from "@/routes/ProtectedRoute.tsx"

const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.login.path} element={routes.login.element} />
      <Route path={routes.register.path} element={routes.register.element} />
      <Route path={routes.faq.path} element={routes.faq.element} />

      <Route element={<ProtectedRoute />}>
        <Route path={routes.profile.path} element={routes.profile.element} />
        <Route path={routes.home.path} element={routes.home.element} />
      </Route>
    </Routes>
  )
}

export default AppRouter
