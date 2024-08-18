import styled, { ThemeProvider } from "styled-components"
import { Button, Flex, Group, useMantineTheme } from "@mantine/core"
import SyncItImg from "@/assets/img/syncIt.png"
import { Link, useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"
import useAuth from "@/store/hooks/useAuth.ts"
import useLogout from "@/store/hooks/useLogout.ts"
import { useMediaQuery } from "@mantine/hooks"
import { type MouseEvent, useEffect, useState } from "react"
import ProfileData from "@/components/layout/Header/ProfileData.tsx"

const Header = () => {
  const { isAuthenticated } = useAuth()
  const logoutHandler = useLogout()
  const navigate = useNavigate()
  const theme = useMantineTheme()
  const matches = useMediaQuery("(max-width: 1024px)")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Отключение скролла при открытом меню
    if (isMenuOpen) {
      document.body.style.position = "fixed"
    } else {
      document.body.style.position = "static"
    }
  }, [isMenuOpen])

  const handleLogout = () => {
    logoutHandler()
    navigate(routes.login.path, { state: { fromLogout: true } })
  }

  const handleClickLink = (e: MouseEvent<HTMLAnchorElement>) => {
    !isAuthenticated && e.preventDefault()
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <Group>
          <ProfileData />
          <Button color={"red"} onClick={handleLogout}>
            Выйти
          </Button>
        </Group>
      )
    }
    return (
      <Flex wrap={"wrap"} justify={"center"} gap={"md"}>
        <Button
          component={Link}
          to={routes.login.path}
          onClick={() => setIsMenuOpen(false)}>
          Войти
        </Button>
        <Button
          variant="default"
          component={Link}
          to={routes.register.path}
          onClick={() => setIsMenuOpen(false)}>
          Регистрация
        </Button>
      </Flex>
    )
  }

  const renderMobileMenu = () => {
    return (
      <>
        <Flex align={"center"} gap={"sm"} wrap={"nowrap"}>
          <Button onClick={toggleMenu} w={"50px"}>
            {isMenuOpen ? "✕" : "☰"}
          </Button>
        </Flex>
        {isMenuOpen && (
          <MobileMenu style={{ backgroundColor: theme.colors.dark[9] }}>
            <Flex
              w={"fit-content"}
              mt={"md"}
              direction={"column"}
              align={"center"}>
              <LinkStyle
                to={routes.home.path}
                style={{
                  fontSize: "1.75rem",
                  padding: "1rem 1.75rem",
                  width: "100%",
                  placeContent: "center",
                }}
                disabled={!isAuthenticated}
                onClick={handleClickLink}>
                Вакансии
              </LinkStyle>
              <LinkStyle
                to={routes.profile.path}
                style={{
                  fontSize: "1.75rem",
                  padding: "1rem 1.75rem",
                  width: "100%",
                  placeContent: "center",
                }}
                disabled={!isAuthenticated}
                onClick={handleClickLink}>
                Профиль
              </LinkStyle>
              <LinkStyle
                to={routes.faq.path}
                style={{
                  fontSize: "1.75rem",
                  padding: "1rem 1.75rem",
                  width: "100%",
                  placeContent: "center",
                }}
                onClick={() => setIsMenuOpen(false)}>
                FAQ
              </LinkStyle>
            </Flex>
            <Flex justify={"center"}>{renderAuthButtons()}</Flex>
          </MobileMenu>
        )}
      </>
    )
  }

  const renderDesktopMenu = () => {
    return (
      <>
        <Group h="100%">
          <LinkStyle
            to={routes.home.path}
            disabled={!isAuthenticated}
            onClick={handleClickLink}>
            Вакансии
          </LinkStyle>
          <LinkStyle
            to={routes.profile.path}
            disabled={!isAuthenticated}
            onClick={handleClickLink}>
            Профиль
          </LinkStyle>
          <LinkStyle to={routes.faq.path} onClick={() => setIsMenuOpen(false)}>
            FAQ
          </LinkStyle>
        </Group>
        {renderAuthButtons()}
      </>
    )
  }

  return (
    <ThemeProvider theme={{ isMenuOpen }}>
      <HeaderStyle style={{ backgroundColor: theme.colors.dark[9] }}>
        <Group justify="space-between" h="100%">
          <Link to={routes.home.path}>
            <LogoStyle src={SyncItImg} alt="syncIT" />
          </Link>
          {matches && renderMobileMenu()}
          {!matches && renderDesktopMenu()}
        </Group>
      </HeaderStyle>
    </ThemeProvider>
  )
}

const LogoStyle = styled.img`
  position: relative;
  top: 2px;
  width: 100px;
`

const LinkStyle = styled(Link)<{ disabled?: boolean }>`
  font-size: 1.25rem;
  text-decoration: none;
  color: var(--mantine-color-dark-0);
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  opacity: ${(props) => (props.disabled ? "0.25" : "1")};

  &:hover {
    background-color: var(--mantine-color-dark-7);
  }
`

const HeaderStyle = styled.header`
  width: 100%;
  height: 60px;
  padding: 0 1rem;
`

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  position: fixed;
  align-items: center;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`

export default Header
