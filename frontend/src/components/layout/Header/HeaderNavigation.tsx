import { type ReactElement } from "react"
import routes from "../../../routes/routes.tsx"
import {
  HeaderItemStyle,
  HeaderLinkStyle,
  HeaderListStyle,
} from "./HeaderStyles.ts"
import useAuth from "../../../store/hooks/useAuth.ts"
import useAppDispatch from "../../../store/hooks/useAppDispatch.ts"
import { logout } from "../../../store/slice/authSlice.ts"

const HeaderNavigation = (): ReactElement => {
  const { isAuthenticated } = useAuth()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <HeaderListStyle style={{ margin: "0" }}>
      <HeaderItemStyle>
        <HeaderLinkStyle href={routes.home.path}>Home</HeaderLinkStyle>
      </HeaderItemStyle>

      {isAuthenticated && (
        <HeaderItemStyle>
          <HeaderLinkStyle href={routes.profile.path}>Profile</HeaderLinkStyle>
        </HeaderItemStyle>
      )}

      {isAuthenticated && (
        <HeaderItemStyle>
          <button onClick={handleLogout}>Logout</button>
        </HeaderItemStyle>
      )}

      {!isAuthenticated && (
        <HeaderItemStyle>
          <HeaderLinkStyle href={routes.login.path}>Login</HeaderLinkStyle>
        </HeaderItemStyle>
      )}

      {!isAuthenticated && (
        <HeaderItemStyle>
          <HeaderLinkStyle href={routes.register.path}>
            Register
          </HeaderLinkStyle>
        </HeaderItemStyle>
      )}
    </HeaderListStyle>
  )
}

export default HeaderNavigation
