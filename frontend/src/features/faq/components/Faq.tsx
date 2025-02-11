import { type ReactElement } from "react"
import { Accordion as _Accordion, Anchor, Container, Flex } from "@mantine/core"
import styled from "styled-components"

import TelegramSvg from "@/assets/svg/socials/telegram.svg"
import GitHubSvg from "@/assets/svg/socials/github.svg"

const Faq = (): ReactElement => {
  return (
    <WrappedContainer size="sm">
      <Accordion variant="separated">
        <Accordion.Item value="about">
          <Accordion.Control>Что это за проект?</Accordion.Control>
          <Accordion.Panel>
            Это сайт, который анализирует вакансии с различных источников и
            приводит их к единому формату. <br />
            Он помогает разработчикам и другим IT-специалистам находить
            вакансии, наиболее подходящие под их стек технологий и предпочтения.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="sources">
          <Accordion.Control>
            Какие источники вакансий используются?
          </Accordion.Control>
          <Accordion.Panel>
            На данный момент используется API hh.ru. <br />В будущем будут
            добавлены и другие источники, например, телеграм-каналы.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="vacancy-filter">
          <Accordion.Control>Можно ли фильтровать вакансии?</Accordion.Control>
          <Accordion.Panel>
            На данный момент нельзя. В будущем будет добавлена отдельная
            страница для поиска вакансий с возможностью фильтрации.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="contact">
          <Accordion.Control>Контакты</Accordion.Control>
          <Accordion.Panel>
            <Flex justify={"center"} gap={"md"}>
              <Anchor href="https://t.me/diplomatgmg" target={"_blank"}>
                <Flex align={"center"} gap={"xs"}>
                  <SocialIcon src={TelegramSvg} />
                </Flex>
              </Anchor>
              <Anchor href="https://github.com/diplomatgmg" target={"_blank"}>
                <Flex align={"center"} gap={"xs"}>
                  <SocialIcon src={GitHubSvg} />
                </Flex>
              </Anchor>
            </Flex>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </WrappedContainer>
  )
}

const WrappedContainer = styled(Container)`
  padding-top: calc(var(--mantine-spacing-xl) * 2);
  padding-bottom: calc(var(--mantine-spacing-xl) * 2);
  min-height: 650px;
`

const Accordion = styled(_Accordion)`
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
    scale: 1.2;
  }
`

export default Faq
