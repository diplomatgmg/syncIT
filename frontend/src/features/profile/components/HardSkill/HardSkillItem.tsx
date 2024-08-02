import { HardSkill } from "@/types/hardSkillTypes.ts"
import { FC, useState } from "react"
import styled from "styled-components"
import ToggleIcon from "@/features/profile/components/HardSkill/ToggleIcon.tsx"
import Checkbox from "@/components/common/Input/Checkbox.tsx"

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
  const [isMenuOpen, setIsMenuOpen] = useState(
    hardSkill.selectable && hardSkill.children.length === 1
  )

  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState)

  return (
    <StyledSkillItem>
      {hardSkill.selectable ? (
        <Checkbox
          name={hardSkill.name}
          isSelected={selectedItems.some((skill) => skill.id === hardSkill.id)}
          handleCheckboxChange={() => handleCheckboxChange(hardSkill)}
        />
      ) : (
        <SkillContainer>
          <ToggleIcon isOpen={isMenuOpen} onClick={toggleMenu} />
          <SkillName onClick={toggleMenu}>{hardSkill.name}</SkillName>
        </SkillContainer>
      )}

      {hardSkill.children.length > 0 && isMenuOpen && (
        <ChildrenList>
          {hardSkill.children.map((child) => (
            <HardSkillItem
              key={child.id}
              hardSkill={child}
              userHardSkills={userHardSkills}
              selectedItems={selectedItems}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </ChildrenList>
      )}
    </StyledSkillItem>
  )
}

const StyledSkillItem = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
`

const SkillContainer = styled.div`
  display: flex;
  align-items: center;
`

const SkillName = styled.span`
  cursor: pointer;
`

const ChildrenList = styled.ul`
  padding-left: 24px;
`

export default HardSkillItem
