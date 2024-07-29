import { BrowserRouter } from "react-router-dom"
import Router from "@/routes/Router.tsx"
import GlobalStyles from "@/styles/global.ts"

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
        <GlobalStyles />
      </BrowserRouter>
    </>
  )
}

export default App
