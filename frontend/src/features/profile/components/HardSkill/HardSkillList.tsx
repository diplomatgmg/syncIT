import { FC, type ReactElement } from "react"
import { HardSkill } from "../../../../types/hardSkill.ts"
import HardSkillItem from "./HardSkillItem.tsx"

interface HardSkillListProps {
  hardSkills: HardSkill[]
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
