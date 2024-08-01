import { type ReactElement } from "react"
import Header from "@/components/layout/Header/Header.tsx"
import styled from "styled-components"
interface CommonPageProps {
  children: ReactElement
}
const StyledPage = styled.div`
  display: flex;
  position: relative;
  flex-direction: row-reverse;
`
const ChildrenStyle = styled.div`
  width: 100%;
`

const CommonPage = ({ children }: CommonPageProps): ReactElement => {
  return (
    <StyledPage>
      <Header />
      <ChildrenStyle>{children}</ChildrenStyle>
    </StyledPage>
  )
}

export default CommonPage
