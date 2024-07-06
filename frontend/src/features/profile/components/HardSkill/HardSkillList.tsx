import { FC, type ReactElement } from "react"
import { HardSkillTypes } from "@/types/hardSkillTypes.ts"
import HardSkillItem from "@/features/profile/components/HardSkill/HardSkillItem.tsx"

interface HardSkillListProps {
  hardSkills: HardSkillTypes[]
}

const HardSkillList: FC<HardSkillListProps> = ({
  hardSkills,
}): ReactElement => {
  return (
    <ul>
      {hardSkills.map(({ id, name }) => (
        <HardSkillItem key={id} name={name} />
      ))}
    </ul>
  )
}

export default HardSkillList
