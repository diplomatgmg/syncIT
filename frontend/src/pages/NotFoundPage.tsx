import { type ReactElement } from "react"
import CommonPage from "@/components/layout/CommonPage.tsx"
import { Button, Container, Group, Text, Title as _Title } from "@mantine/core"
import NotFoundSvg from "@/assets/svg/404.svg"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"

const NotFoundPage = (): ReactElement => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate(routes.home.path)
  }

  return (
    <CommonPage>
      <RootContainer>
        <Inner>
          <Image src={NotFoundSvg} />
          <Content>
            <Title>Как вы тут оказались?</Title>
            <Description>
              Страница, на которую вы попали - не существует. Возможно, данная
              страница была удалена.
            </Description>
            <Group justify="center">
              <Button onClick={handleButtonClick}>На главную</Button>
            </Group>
          </Content>
        </Inner>
      </RootContainer>
    </CommonPage>
  )
}

const RootContainer = styled(Container)`
  padding-top: 80px;
  padding-bottom: 80px;
`

const Inner = styled.div`
  position: relative;
`

const Image = styled.img`
  position: absolute;
  inset: 0;
  opacity: 0.75;
`

const Content = styled.div`
  padding-top: 10vh;
  position: relative;
  z-index: 1;

  @media (max-width: $mantine-breakpoint-sm) {
    padding-top: 120px;
  }
`

const Title = styled(_Title)`
  text-align: center;
  font-weight: 900;
  font-size: 38px;

  @media (max-width: $mantine-breakpoint-sm) {
    font-size: 32px;
  }
`

const Description = styled(Text)`
  max-width: 540px;
  margin: var(--mantine-spacing-xl) auto calc(var(--mantine-spacing-xl) * 1.5);
  text-align: center;
  font-size: var(--mantine-font-size-lg);
  color: var(--mantine-color-dimmed);
`

export default NotFoundPage
