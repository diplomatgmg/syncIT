import { BrowserRouter } from "react-router-dom"
import Router from "@/routes/Router.tsx"
import GlobalStyles from "@/styles/global.ts"
import "react-loading-skeleton/dist/skeleton.css"

const App = () => (
  <BrowserRouter>
    <Router />
    <GlobalStyles />
  </BrowserRouter>
)

export default App
