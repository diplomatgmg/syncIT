import { type ReactElement } from "react"
import useAuth from "@/store/hooks/useAuth.ts"
import routes from "@/routes/routes.tsx"
import Button from "@/components/common/Button.tsx"
import Link from "@/components/common/Link.tsx"
import { colors } from "@/styles/theme.ts"
import useLogout from "@/store/hooks/useLogout.ts"
import styled, { ThemeProvider } from "styled-components"
import { useLocation } from "react-router-dom"

const HeaderNavigation = (): ReactElement => {
  const { isAuthenticated } = useAuth()
  const logoutHandler = useLogout()
  const location = useLocation()

  const renderLink = (to: string, label: string, disabled?: boolean) => {
    return (
      <ThemeProvider theme={{ isActive: location.pathname === to }}>
        <HeaderItemStyle>
          <Link to={to} disabled={disabled} backgroundColor={colors.accent}>
            {label}
          </Link>
        </HeaderItemStyle>
      </ThemeProvider>
    )
  }

  return (
    <HeaderListStyle>
      {renderLink(routes.home.path, "Вакансии", !isAuthenticated)}

      {renderLink(routes.profile.path, "Профиль", !isAuthenticated)}

      {renderLink(routes.faq.path, "FAQ")}

      {isAuthenticated && (
        <AuthButtonContainer>
          <Button
            style={{
              paddingTop: "1.075rem",
              paddingBottom: "1.075rem",
              width: "100%",
            }}
            onClick={logoutHandler}
            borderRadius="0"
            backgroundColor={colors.danger}>
            Выйти
          </Button>
        </AuthButtonContainer>
      )}

      {!isAuthenticated && (
        <AuthButtonContainer>
          {renderLink(routes.login.path, "Вход")}
          {renderLink(routes.register.path, "Регистрация")}
        </AuthButtonContainer>
      )}
    </HeaderListStyle>
  )
}

interface HeaderItemProps {
  theme: {
    isActive: boolean
  }
}

const HeaderListStyle = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 100%;
  background-color: ${colors.background};
  margin: 0;
  width: 180px;

  @media (max-width: 1200px) {
    width: 100vw;
    overflow-x: auto;
    flex-direction: row;
    height: min-content;
  }
`

const HeaderItemStyle = styled.div<HeaderItemProps>`
  position: relative;
  min-width: 140px;
  background-color: ${({ theme }) =>
    theme.isActive ? colors.accent : colors.background};

  & > * {
    font-size: 1rem;
  }

  a {
    padding: 1.25rem;
  }
`

const AuthButtonContainer = styled(HeaderItemStyle)`
  margin-top: auto;

  @media (max-width: 1200px) {
    margin-left: auto;
    display: flex;
  }
`

export default HeaderNavigation
