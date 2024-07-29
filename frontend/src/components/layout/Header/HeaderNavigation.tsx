import { type ReactElement } from "react"
import useAuth from "@/store/hooks/useAuth.ts"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import { logout } from "@/store/slice/authSlice.ts"
import {
  HeaderItemStyle,
  HeaderLinkStyle,
  HeaderListStyle,
} from "@/components/layout/Header/HeaderStyles.ts"
import routes from "@/routes/routes.tsx"
import Button from "@/components/common/Button.tsx"
import Link from "@/components/common/Link.tsx"
import { colors } from "@/styles/theme.ts"

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
          <Button onClick={handleLogout} borderRadius={"0"}>
            Logout
          </Button>
        </HeaderItemStyle>
      )}

      {!isAuthenticated && (
        // <HeaderItemStyle>
        //   <HeaderLinkStyle href={routes.login.path}>Login</HeaderLinkStyle>
        // </HeaderItemStyle>
        <Link to={routes.login.path} backgroundColor={colors.accent}>
          Login
        </Link>
      )}

      {!isAuthenticated && (
        <Link to={routes.register.path} backgroundColor={colors.accent}>
          Register
        </Link>
      )}
    </HeaderListStyle>
  )
}

export default HeaderNavigation
