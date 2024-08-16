import { FC, type ReactElement } from "react"
import { HardSkill } from "@/types/hardSkillTypes.ts"
import HardSkillItem from "@/features/home/components/HardSkill/HardSkillItem.tsx"
import { Flex } from "@mantine/core"

interface HardSkillListProps {
  hardSkills: HardSkill[]
}

const HardSkillList: FC<HardSkillListProps> = ({
  hardSkills,
}): ReactElement => {
  return (
    <Flex gap={"xs"} wrap={"wrap"}>
      {hardSkills.map(({ id, name }) => (
        <HardSkillItem key={id} skillName={name} />
      ))}
    </Flex>
  )
}

export default HardSkillList
