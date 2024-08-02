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
    <StyledPage>
      <Header />
      <ChildrenStyle>{children}</ChildrenStyle>
      <ToastContainer />
    </StyledPage>
  )
}

const StyledPage = styled.div`
  display: flex;
  position: relative;
  flex-direction: row-reverse;
  height: 100vh;
`
const ChildrenStyle = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export default CommonPage
