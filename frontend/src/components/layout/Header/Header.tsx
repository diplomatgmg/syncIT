import { type ReactElement } from "react"
import HeaderNavigation from "@/components/layout/Header/HeaderNavigation.tsx"
import styled from "styled-components"

const HeaderStyle = styled.header`
  display: flex;
  justify-content: end;
  padding-left: 200px;
`

const Header = (): ReactElement => {
  return (
    <HeaderStyle>
      <HeaderNavigation />
    </HeaderStyle>
  )
}

export default Header
