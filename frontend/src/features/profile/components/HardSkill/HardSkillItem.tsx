import { HardSkill } from "@/types/hardSkillTypes.ts"
import { FC } from "react"
import HardSkillSelectable from "@/features/profile/components/HardSkill/HardSkillSelectable.tsx"

interface HardSkillItemProps {
  hardSkill: HardSkill
  userHardSkills: HardSkill[]
  selectedItems: HardSkill[]
  handleCheckboxChange: (skill: HardSkill) => void
}

const HardSkillItem: FC<HardSkillItemProps> = ({
  hardSkill,
  userHardSkills,
  selectedItems,
  handleCheckboxChange,
}) => {
  return (
    <li>
      {hardSkill.selectable && (
        <HardSkillSelectable
          hardSkill={hardSkill}
          isSelected={selectedItems.some((skill) => skill.id === hardSkill.id)}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
      {!hardSkill.selectable && hardSkill.name}
      {hardSkill.children.length > 0 && (
        <ul>
          {hardSkill.children.map((child) => (
            <HardSkillItem
              key={child.id}
              hardSkill={child}
              userHardSkills={userHardSkills}
              selectedItems={selectedItems}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default HardSkillItem
