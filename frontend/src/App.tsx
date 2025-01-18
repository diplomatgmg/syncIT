import { BrowserRouter } from "react-router-dom"
import Router from "@/routes/Router.tsx"
import { createTheme, MantineProvider } from "@mantine/core"
import GlobalStyles from "@/styles/global.ts"
import "react-loading-skeleton/dist/skeleton.css"
import "@mantine/core/styles.css"
import { ToastContainer } from "react-toastify"

const theme = createTheme({
  fontFamily: "Nunito, sans-serif",
})

const App = () => (
  <MantineProvider defaultColorScheme={"dark"} theme={theme}>
    <BrowserRouter>
      <ToastContainer />
      <Router />
      <GlobalStyles />
    </BrowserRouter>
  </MantineProvider>
)

export default App
