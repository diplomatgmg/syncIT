import { FC, type ReactElement } from "react"
import { HardSkill } from "@/types/hardSkillTypes.ts"
import HardSkillItem from "@/features/home/components/HardSkill/HardSkillItem.tsx"
import { Flex, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"

interface HardSkillListProps {
  hardSkills: HardSkill[]
}

const HardSkillList: FC<HardSkillListProps> = ({
  hardSkills,
}): ReactElement => {
  const { breakpoints } = useMantineTheme()
  const matchesSm = useMediaQuery(`(max-width: ${breakpoints.sm})`)

  return (
    <Flex
      gap={"xs"}
      wrap={"wrap"}
      justify={matchesSm ? "end" : "start"}
      h={"fit-content"}>
      {hardSkills.map(({ id, name }) => (
        <HardSkillItem key={id} skillName={name} />
      ))}
    </Flex>
  )
}

export default HardSkillList
