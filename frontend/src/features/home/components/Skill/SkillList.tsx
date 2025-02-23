import { FC, type ReactElement } from "react"
import { Skill } from "@/types/skillTypes.ts"
import SkillItem from "@/features/home/components/Skill/SkillItem.tsx"
import { Flex, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import some from "lodash/some"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"

interface SkillListProps {
  skills: Skill[]
}

const SkillList: FC<SkillListProps> = ({ skills }): ReactElement => {
  const { data: profileData, isFetching } = useGetProfileDataQuery()
  const { breakpoints } = useMantineTheme()
  const matchesSm = useMediaQuery(`(max-width: ${breakpoints.sm})`)
  const matchesXs = useMediaQuery(`(max-width: ${breakpoints.xs})`)

  const profileSkills = profileData?.skills ?? []

  const sortedSkills = [...skills].sort((a, b) => {
    const isSelectedA = some(profileSkills, { name: a.name })
    const isSelectedB = some(profileSkills, { name: b.name })

    // Сначала по isSelected (true идет раньше false)
    if (isSelectedA !== isSelectedB) {
      return Number(isSelectedB) - Number(isSelectedA)
    }

    // Затем по алфавиту
    return a.name.localeCompare(b.name)
  })

  return (
    <Flex
      gap={"xs"}
      wrap={"wrap"}
      justify={matchesXs ? "center" : matchesSm ? "end" : "start"}
      h={"fit-content"}>
      {sortedSkills.map(({ id, name }) => (
        <SkillItem
          key={id}
          skillName={name}
          isSkillSelected={isFetching || some(profileSkills, { name })}
        />
      ))}
    </Flex>
  )
}

export default SkillList
