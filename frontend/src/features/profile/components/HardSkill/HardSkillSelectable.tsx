import { FC, type ReactElement } from "react"
import { HardSkill } from "@/types/hardSkillTypes.ts"

interface HardSkillSelectableProps {
  hardSkill: HardSkill
  isSelected: boolean
  handleCheckboxChange: (skill: HardSkill) => void
}

const HardSkillSelectable: FC<HardSkillSelectableProps> = ({
  hardSkill,
  isSelected,
  handleCheckboxChange,
}): ReactElement => {
  return (
    <label>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => handleCheckboxChange(hardSkill)}
      />
      {hardSkill.name}
    </label>
  )
}

export default HardSkillSelectable
