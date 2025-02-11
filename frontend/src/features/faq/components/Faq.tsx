import { Fragment, type ReactElement } from "react"
import { Accordion as _Accordion, Anchor, Container, Flex } from "@mantine/core"
import styled from "styled-components"

import TelegramSvg from "@/assets/svg/socials/telegram.svg"
import GitHubSvg from "@/assets/svg/socials/github.svg"

const Faq = (): ReactElement => {
  return (
    <Container size="sm" pt="xl" pb="xl" style={{ minHeight: 650 }}>
      <StyledAccordion variant="separated">
        {faqData.map(({ value, title, content }) => (
          <_Accordion.Item key={value} value={value}>
            <_Accordion.Control>{title}</_Accordion.Control>
            <_Accordion.Panel>
              {content.split("\n").map((line, index) => (
                <Fragment key={index}>
                  <Details>{line}</Details>
                </Fragment>
              ))}
            </_Accordion.Panel>
          </_Accordion.Item>
        ))}

        <_Accordion.Item value="contact">
          <_Accordion.Control>Контакты</_Accordion.Control>
          <_Accordion.Panel>
            <Flex justify={"center"} gap={"md"}>
              {socialLinks.map(({ href, src, alt }) => (
                <Anchor key={href} href={href} target="_blank">
                  <Flex align="center" gap="xs">
                    <SocialIcon src={src} alt={alt} />
                  </Flex>
                </Anchor>
              ))}
            </Flex>
          </_Accordion.Panel>
        </_Accordion.Item>
      </StyledAccordion>
    </Container>
  )
}
const faqData = [
  {
    value: "about",
    title: "Что это за проект?",
    content:
      "Это сайт, который анализирует вакансии с различных источников и приводит их к единому формату.\nОн помогает разработчикам и другим IT-специалистам находить вакансии, наиболее подходящие под их стек технологий и предпочтения.",
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
      "На данный момент нельзя. В будущем будет добавлена отдельная страница для поиска вакансий с возможностью фильтрации.",
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

const StyledAccordion = styled(_Accordion)`
  border-radius: var(--mantine-radius-md);
  margin-bottom: var(--mantine-spacing-lg);
  font-size: 1.15rem;
`

const SocialIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  transition: 0.15s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`

const Details = styled.p`
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`

export default Faq
