import { type ReactElement } from "react"
import { HeaderStyle } from "@/components/layout/Header/HeaderStyles.ts"
import HeaderLogo from "@/components/layout/Header/HeaderLogo.tsx"
import HeaderNavigation from "@/components/layout/Header/HeaderNavigation.tsx"

const Header = (): ReactElement => {
  return (
    <HeaderStyle>
      <HeaderLogo />
      <HeaderNavigation />
    </HeaderStyle>
  )
}

export default Header
