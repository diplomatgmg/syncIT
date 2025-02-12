import { Fragment, type ReactElement } from "react"
import {
  Accordion,
  Anchor,
  Container,
  Flex,
  useMantineTheme,
} from "@mantine/core"
import styled from "styled-components"

import TelegramSvg from "@/assets/svg/socials/telegram.svg"
import GitHubSvg from "@/assets/svg/socials/github.svg"

const Faq = (): ReactElement => {
  const { colors } = useMantineTheme()

  return (
    <Container size="sm" pt="xl" pb="xl" style={{ minHeight: 650 }}>
      <StyledAccordion variant="separated">
        {faqData.map(({ value, title, content }) => (
          <AccordionItem key={value} value={value} bg={colors.dark[9]}>
            <AccordionControl bg={colors.dark[8]}>{title}</AccordionControl>
            <Accordion.Panel>
              {content.split("\n").map((line, index) => (
                <Fragment key={index}>
                  <Details>{line}</Details>
                </Fragment>
              ))}
            </Accordion.Panel>
          </AccordionItem>
        ))}

        <AccordionItem value="contact" bg={colors.dark[9]}>
          <AccordionControl bg={colors.dark[8]}>Контакты</AccordionControl>
          <Accordion.Panel>
            <Flex justify={"center"} gap={"md"}>
              {socialLinks.map(({ href, src, alt }) => (
                <Anchor key={href} href={href} target="_blank">
                  <Flex align="center" gap="xs">
                    <SocialIcon src={src} alt={alt} />
                  </Flex>
                </Anchor>
              ))}
            </Flex>
          </Accordion.Panel>
        </AccordionItem>
      </StyledAccordion>
    </Container>
  )
}
const faqData = [
  {
    value: "about",
    title: "Что это за проект?",
    content:
      "Это сайт, который анализирует вакансии с различных источников и помогает разработчикам и другим IT-специалистам находить вакансии, наиболее подходящие под их навыки.",
  },
  {
    value: "sources",
    title: "Какие источники вакансий используются?",
    content:
      "На данный момент используется API hh.ru.\nВ будущем будут добавлены и другие источники, например, телеграм-каналы.",
  },
  {
    value: "vacancy-filter",
    title: "Можно ли фильтровать вакансии?",
    content:
      "На данный момент нельзя.\nВ будущем будет добавлена отдельная страница для поиска вакансий с возможностью фильтрации.",
  },
  {
    value: "bad-skill",
    title: "Нет нужного навыка или профессии?",
    content:
      "Я регулярно расширяю базу данных навыков и профессий, ориентируясь на их популярность среди вакансий, чтобы сделать поиск релевантных вакансий максимально удобным и точным.\nЕсли вы не нашли нужный навык или он привязан к некорректной категории – свяжитесь со мной.",
  },
]

const socialLinks = [
  {
    href: "https://t.me/diplomatgmg",
    src: TelegramSvg,
    alt: "Telegram",
  },
  {
    href: "https://github.com/diplomatgmg",
    src: GitHubSvg,
    alt: "GitHub",
  },
]

const StyledAccordion = styled(Accordion)`
  margin-bottom: var(--mantine-spacing-lg);
  font-size: 1.15rem;
`

const SocialIcon = styled.img`
  margin-top: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  transition: 0.15s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`

const AccordionItem = styled(Accordion.Item)`
  border-radius: 4px;
`

const AccordionControl = styled(Accordion.Control)`
  border-radius: 4px;
`

const Details = styled.p`
  &:first-child {
    margin-top: 0.5rem;
  }
  &:last-child {
    margin-bottom: 0;
  }
`

export default Faq
