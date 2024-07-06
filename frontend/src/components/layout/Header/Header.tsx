import { type ReactElement } from "react"
import { HeaderStyle } from "./HeaderStyles.ts"
import HeaderLogo from "./HeaderLogo.tsx"
import HeaderNavigation from "./HeaderNavigation.tsx"

const Header = (): ReactElement => {
  return (
    <HeaderStyle>
      <HeaderLogo />
      <HeaderNavigation />
    </HeaderStyle>
  )
}

export default Header
