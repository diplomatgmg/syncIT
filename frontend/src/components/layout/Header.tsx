import styled from "styled-components"
import { Box, Button, Group, Text } from "@mantine/core"
import SyncItImg from "@/assets/img/syncIt.png"
import { Link, useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"
import useAuth from "@/store/hooks/useAuth.ts"
import useLogout from "@/store/hooks/useLogout.ts"

const Header = () => {
  const { isAuthenticated, email } = useAuth()
  const logoutHandler = useLogout()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutHandler()
    navigate(routes.login.path, { state: { fromLogout: true } })
  }

  return (
    <Box pb="mb">
      <HeaderStyle>
        <Group justify="space-between" h="100%">
          <Link to={routes.home.path}>
            <LogoStyle src={SyncItImg} alt="syncIT" />
          </Link>

          <Group h="100%">
            <LinkStyle to={routes.home.path}>Вакансии</LinkStyle>
            <LinkStyle to={routes.profile.path}>Профиль</LinkStyle>
            <LinkStyle to={routes.faq.path}>FAQ</LinkStyle>
          </Group>

          {!isAuthenticated && (
            <Group visibleFrom="sm">
              <Button component={Link} to={routes.login.path}>
                Войти
              </Button>
              <Button
                variant="default"
                component={Link}
                to={routes.register.path}>
                Регистрация
              </Button>
            </Group>
          )}

          {isAuthenticated && (
            <Group visibleFrom="sm">
              <Text>{email}</Text>
              <Button color={"red"} onClick={handleLogout}>
                Выйти
              </Button>
            </Group>
          )}
        </Group>
      </HeaderStyle>
    </Box>
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
  background-color: var(--mantine-color-dark-6);
  padding: 0 1rem;
`

export default Header
