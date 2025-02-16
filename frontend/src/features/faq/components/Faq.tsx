import { type ReactElement } from "react"
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
            <AccordionPanel>{content}</AccordionPanel>
          </AccordionItem>
        ))}

        <AccordionItem value="contact" bg={colors.dark[9]}>
          <AccordionControl bg={colors.dark[8]}>Контакты</AccordionControl>
          <AccordionPanel>
            <Flex justify={"center"} gap={"md"}>
              {socialLinks.map(({ href, src, alt }) => (
                <Anchor key={href} href={href} target="_blank">
                  <Flex align="center" gap="xs">
                    <SocialIcon src={src} alt={alt} />
                  </Flex>
                </Anchor>
              ))}
            </Flex>
          </AccordionPanel>
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
    value: "how-it-works",
    title: "Как получить более релевантные вакансии?",
    content: (
      <>
        <p>
          Всё просто: чем полнее ваш профиль, тем точнее система подбирает для
          вас варианты. Вот как это работает:
        </p>
        <p>
          <b>
            <i>Укажите все свои навыки, даже базовые. </i>
          </b>
          Например, если вы backend-разработчик на Python, добавьте не только
          основные технологии (Python, Django), но и смежные: Docker, Git,
          PostgreSQL, ООП, REST API.
        </p>
        <p>
          <b>
            <i>
              Даже если вы немного знакомы с инструментом — смело включайте его
              в список.
            </i>
          </b>
        </p>
        <p>
          Система сравнивает навыки из вашего профиля с требованиями вакансий.
          Чем больше совпадений, тем выше шанс, что подходящая вакансия
          попадется вам в поиске.
          <br />
          Даже 2–3 дополнительных навыка могут увеличить количество релевантных
          предложений.
        </p>
      </>
    ),
  },
  {
    value: "sources",
    title: "Какие источники вакансий используются?",
    content: (
      <>
        <p>На данный момент используется API hh.ru.</p>
        <p>
          В будущем будут добавлены и другие источники, например,
          телеграм-каналы.
        </p>
      </>
    ),
  },
  {
    value: "vacancy-filter",
    title: "Можно ли фильтровать вакансии?",
    content: (
      <>
        <p>На данный момент нельзя.</p>
        <p>
          В будущем будет добавлена отдельная страница для поиска вакансий с
          возможностью фильтрации.
        </p>
      </>
    ),
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
  font-size: 1.15rem;
`

const SocialIcon = styled.img`
  margin-top: 0.25rem;
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

const AccordionPanel = styled(Accordion.Panel)`
  padding-top: 0.5rem;

  * > p:first-of-type {
    margin-top: 0;
  }
  * > p:last-child {
    margin-bottom: 0;
  }
`

export default Faq
