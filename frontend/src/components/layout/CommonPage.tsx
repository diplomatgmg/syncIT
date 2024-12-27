import { type ReactElement } from "react"
import Header from "@/components/layout/Header/Header.tsx"
import styled from "styled-components"
import usePopupHandler from "@/store/hooks/usePopupHandler.tsx"
import { ToastContainer } from "react-toastify"
import { useSetTitle } from "@/utils/hooks/useTitle.tsx"

interface CommonPageProps {
  children: ReactElement
  title: string
}

const CommonPage = ({ children, title }: CommonPageProps): ReactElement => {
  usePopupHandler()
  useSetTitle(title)

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
