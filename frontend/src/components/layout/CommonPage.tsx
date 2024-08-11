import { type ReactElement } from "react"
import Header from "@/components/layout/Header/Header.tsx"
import styled from "styled-components"
import usePopupHandler from "@/store/hooks/usePopupHandler.tsx"
import { ToastContainer } from "react-toastify"

interface CommonPageProps {
  children: ReactElement
}

const CommonPage = ({ children }: CommonPageProps): ReactElement => {
  usePopupHandler()

  return (
    <>
      <Header />
      <ChildrenStyle>{children}</ChildrenStyle>
      <ToastContainer />
    </>
  )
}

const ChildrenStyle = styled.div``

export default CommonPage
