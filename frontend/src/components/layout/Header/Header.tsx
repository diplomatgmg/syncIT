import { type ReactElement } from "react"
import HeaderNavigation from "@/components/layout/Header/HeaderNavigation.tsx"
import styled from "styled-components"

const HeaderStyle = styled.header`
  display: flex;
  justify-content: end;
  position: fixed;
  height: 100%;
  z-index: 1;

  @media (max-width: 1200px) {
    position: relative;
    height: fit-content;
  }
`

const Header = (): ReactElement => {
  return (
    <HeaderStyle>
      <HeaderNavigation />
    </HeaderStyle>
  )
}

export default Header
