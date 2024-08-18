import { FC, type ReactElement, useId, useState } from "react"
import { Vacancy } from "@/types/vacancyTypes.ts"
import { useUpdateVacancyViewStatusMutation } from "@/store/api/vacancyApi.ts"
import HardSkillList from "@/features/home/components/HardSkill/HardSkillList.tsx"
import { ThemeProvider } from "styled-components"
import UnWatchIcon from "@/assets/svg/unwatch.svg"
import getSalary from "@/features/home/utils/getSalary.ts"
import {
  JobDescription,
  ToggleDescription,
  ToggleLabel,
  UnWatch,
  Watched,
} from "@/features/home/components/Vacancy/VacancyItemStyles.ts"
import { Anchor, Flex, Text, Title, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"

interface VacancyItemProps {
  isViewed: boolean
  suitability: number
  vacancy: Vacancy
}

const VacancyItem: FC<VacancyItemProps> = ({
  isViewed,
  suitability,
  vacancy,
}): ReactElement | null => {
  const [isOpenedDescription, setIsOpenedDescription] = useState(false)
  const id = useId()
  const [updateVacancyViewStatus] = useUpdateVacancyViewStatusMutation()
  const [isHidden, setIsHidden] = useState(false)
  const { breakpoints, colors, fontSizes } = useMantineTheme()
  const matchesSm = useMediaQuery(`(max-width: ${breakpoints.sm})`)
  const matchesXs = useMediaQuery(`(max-width: ${breakpoints.xs})`)
  console.log(matchesXs)
  // TODO Сделать column (типа десктоп версию) если matcherXs
  const handleOpenVacancySource = (vacancy_id: number) => async () => {
    try {
      setIsHidden(true)
      setTimeout(() => setIsHidden(false), 3000)
      await updateVacancyViewStatus({ vacancy: vacancy_id }).unwrap()
    } catch (err) {
      console.error("Ошибка входа: ", err)
    }
  }
  const salary = getSalary(
    vacancy.currency,
    vacancy.salaryFrom,
    vacancy.salaryTo
  )

  if (isHidden) return null

  return (
    <ThemeProvider theme={{ isViewed }}>
      <Flex
        p={"md"}
        w={"100%"}
        gap={"xs"}
        direction={"column"}
        bg={colors.dark[9]}
        style={{
          maxWidth: "1200px",
          borderRadius: fontSizes.xs,
        }}>
        <Flex
          align={"center"}
          justify={"space-between"}
          style={{ borderBottom: `1px solid ${colors.dark[6]}` }}>
          <Flex direction={"column"} gap={"xs"} pb={"md"}>
            <Anchor
              href={vacancy.url}
              target="_blank"
              style={{ textDecoration: "none" }}>
              <Title order={matchesSm ? 2 : 1}>{vacancy.name}</Title>
            </Anchor>
            <Flex align={"center"} gap={"xl"}>
              <Title order={matchesSm ? 4 : 3}>{vacancy.company.name}</Title>
            </Flex>
          </Flex>
          <Flex style={{ alignSelf: "center" }}>
            {!isViewed && (
              <UnWatch
                alt={"Unwatch"}
                title={"Отметить просмотренным"}
                src={UnWatchIcon}
                onClick={handleOpenVacancySource(vacancy.id)}
              />
            )}
            {isViewed && <Watched>Просмотрено</Watched>}
          </Flex>
        </Flex>
        <Flex
          direction={matchesXs ? "column" : matchesSm ? "row" : "column"}
          justify={"space-between"}
          gap={matchesSm ? "xs" : "0"}>
          <Flex
            direction={"column"}
            gap={"0.35rem"}
            style={{ textWrap: "nowrap" }}
            h={"fit-content"}>
            <Flex
              justify={"space-between"}
              wrap={"wrap"}
              direction={matchesSm ? "column" : "row"}
              gap={"0.35rem"}
              flex={matchesSm ? 1 : 2}
              mt={"xs"}>
              <Text c={colors.dark[3]} fz={matchesSm ? "md" : "xl"}>
                {vacancy.workFormats.map(({ name }) => name).join(", ")}
              </Text>
              <Text c={colors.dark[3]} fz={matchesSm ? "md" : "xl"}>
                {vacancy.profession.name}
              </Text>
              <Text c={colors.dark[3]} fz={matchesSm ? "md" : "xl"}>
                {vacancy.experience}
              </Text>
            </Flex>

            <Flex
              justify={"space-between"}
              wrap={"wrap"}
              direction={matchesSm ? "column" : "row"}
              gap={"0.35rem"}
              flex={matchesSm ? 1 : 2}>
              <Text c={colors.dark[3]} fz={matchesSm ? "md" : "xl"}>
                Релевантность: {suitability}%
              </Text>
              <Text c={colors.dark[3]} fz={matchesSm ? "md" : "xl"}>
                Зарплата: {salary}
              </Text>
            </Flex>
          </Flex>

          <Flex
            justify={matchesXs ? "start" : matchesSm ? "end" : "start"}
            mt={matchesSm ? "xs" : "md"}>
            <HardSkillList hardSkills={vacancy.hardSkills} />
          </Flex>
        </Flex>

        <ToggleDescription id={id} />
        <ToggleLabel
          htmlFor={id}
          onClick={() => setIsOpenedDescription(!isOpenedDescription)}>
          {isOpenedDescription ? "Свернуть" : "Развернуть"}
        </ToggleLabel>

        <JobDescription>
          <pre>{vacancy.description}</pre>
        </JobDescription>
      </Flex>
    </ThemeProvider>
  )
}

export default VacancyItem
