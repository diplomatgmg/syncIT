import { type ReactElement } from "react"
import Footer from "../components/layout/Footer/Footer.tsx"
import Header from "../components/layout/Header/Header.tsx"
import Home from "../features/home/components/Home.tsx"

const HomePage = (): ReactElement => {
  return (
    <>
      <Header />
      <h3>Home</h3>
      <Home />
      <Footer />
    </>
  )
}

export default HomePage
