import { Route, Routes } from "react-router-dom"
import routes from "./routes"
import map from "lodash/map"

const AppRouter = () => {
  return (
    <Routes>
      {map(routes, ({ path, element }) => (
        <Route path={path} element={element} />
      ))}
    </Routes>
  )
}

export default AppRouter
