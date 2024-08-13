import styled, { ThemeProvider } from "styled-components"
import { Box, Button, Flex, Group, Text, useMantineTheme } from "@mantine/core"
import SyncItImg from "@/assets/img/syncIt.png"
import { Link, useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"
import useAuth from "@/store/hooks/useAuth.ts"
import useLogout from "@/store/hooks/useLogout.ts"
import { useMediaQuery } from "@mantine/hooks"
import { useEffect, useState } from "react"

const Header = () => {
  const { isAuthenticated, email } = useAuth()
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
      document.body.style.overflowX = ""
    }

    return () => {
      document.body.style.overflowX = ""
    }
  }, [isMenuOpen])

  const handleLogout = () => {
    logoutHandler()
    navigate(routes.login.path, { state: { fromLogout: true } })
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <Group>
          <Text>{email}</Text>
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
          <MobileMenu>
            <Flex
              mt={"md"}
              direction={"column"}
              align={"center"}
              gap={theme.fontSizes.xs}>
              <LinkStyle to={routes.home.path} style={{ fontSize: "1.75rem" }}>
                Вакансии
              </LinkStyle>
              <LinkStyle
                to={routes.profile.path}
                style={{ fontSize: "1.75rem" }}>
                Профиль
              </LinkStyle>
              <LinkStyle to={routes.faq.path} style={{ fontSize: "1.75rem" }}>
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
          <LinkStyle to={routes.home.path}>Вакансии</LinkStyle>
          <LinkStyle to={routes.profile.path}>Профиль</LinkStyle>
          <LinkStyle to={routes.faq.path}>FAQ</LinkStyle>
        </Group>
        {renderAuthButtons()}
      </>
    )
  }

  return (
    <ThemeProvider theme={{ isMenuOpen }}>
      <Box mb="mb">
        <HeaderStyle>
          <Group justify="space-between" h="100%">
            <Link to={routes.home.path}>
              <LogoStyle src={SyncItImg} alt="syncIT" />
            </Link>
            {matches && renderMobileMenu()}
            {!matches && renderDesktopMenu()}
          </Group>
        </HeaderStyle>
      </Box>
    </ThemeProvider>
  )
}

const LogoStyle = styled.img`
  position: relative;
  top: 2px;
  width: 100px;
`

const LinkStyle = styled(Link)`
  font-size: 1.25rem;
  text-decoration: none;
  color: var(--mantine-color-dark-0);
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  &:hover {
    background-color: var(--mantine-color-dark-7);
  }
`

const HeaderStyle = styled.header`
  height: 60px;
  background-color: var(--mantine-color-dark-8);
  padding: 0 1rem;
`

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--mantine-color-dark-8);
  padding: 1rem;
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`

export default Header
