import { type ReactElement } from "react"
import Header from "@/components/layout/Header/Header.tsx"
import Home from "@/features/home/components/Home.tsx"
import Footer from "@/components/layout/Footer/Footer.tsx"

const HomePage = (): ReactElement => {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  )
}

export default HomePage
