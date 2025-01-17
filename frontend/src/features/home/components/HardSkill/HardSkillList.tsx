import { FC, type ReactElement } from "react"
import { HardSkill } from "@/types/hardSkillTypes.ts"
import HardSkillItem from "@/features/home/components/HardSkill/HardSkillItem.tsx"
import { Flex, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"
import some from "lodash/some"

interface HardSkillListProps {
  hardSkills: HardSkill[]
}

const HardSkillList: FC<HardSkillListProps> = ({
  hardSkills,
}): ReactElement => {
  const { data: profileData, isFetching } = useGetProfileDataQuery()
  const { breakpoints } = useMantineTheme()
  const matchesSm = useMediaQuery(`(max-width: ${breakpoints.sm})`)
  const matchesXs = useMediaQuery(`(max-width: ${breakpoints.xs})`)

  const profileHardSkills = profileData?.hardSkills ?? []

  const sortedHardSkills = [...hardSkills].sort((a, b) => {
    const isSelectedA = some(profileHardSkills, { name: a.name })
    const isSelectedB = some(profileHardSkills, { name: b.name })

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
      {sortedHardSkills.map(({ id, name }) => (
        <HardSkillItem
          key={id}
          skillName={name}
          isSkillSelected={isFetching || some(profileHardSkills, { name })}
        />
      ))}
    </Flex>
  )
}

export default HardSkillList
