import { type ReactElement } from "react"
import routes from "../../../routes/routes.tsx"
import {
  HeaderItemStyle,
  HeaderLinkStyle,
  HeaderListStyle,
  HeaderLogoStyle,
  HeaderStyle,
} from "./HeaderStyles.ts"

const Header = (): ReactElement => {
  return (
    <HeaderStyle>
      <HeaderLogoStyle>Header Logo</HeaderLogoStyle>
      <HeaderListStyle style={{ margin: "0" }}>
        <HeaderItemStyle>
          <HeaderLinkStyle href={routes.home.path}>Home</HeaderLinkStyle>
        </HeaderItemStyle>
        <HeaderItemStyle>
          <HeaderLinkStyle href={routes.login.path}>Login</HeaderLinkStyle>
        </HeaderItemStyle>
        <HeaderItemStyle>
          <HeaderLinkStyle href={routes.register.path}>
            Register
          </HeaderLinkStyle>
        </HeaderItemStyle>
        <HeaderItemStyle>
          <HeaderLinkStyle href={routes.profile.path}>Profile</HeaderLinkStyle>
        </HeaderItemStyle>
      </HeaderListStyle>
    </HeaderStyle>
  )
}

export default Header
