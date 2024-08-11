import { BrowserRouter } from "react-router-dom"
import Router from "@/routes/Router.tsx"
import { MantineProvider } from "@mantine/core"
import GlobalStyles from "@/styles/global.ts"
import "react-loading-skeleton/dist/skeleton.css"
import "@mantine/core/styles.css"

const App = () => (
  <MantineProvider defaultColorScheme={"dark"}>
    <BrowserRouter>
      <Router />
      <GlobalStyles />
    </BrowserRouter>
  </MantineProvider>
)

export default App
