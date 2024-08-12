import { HardSkill } from "@/types/hardSkillTypes.ts"
import { FC, useState } from "react"
import styled from "styled-components"
import Checkbox from "@/components/common/Input/Checkbox.tsx"
import { ChevronDown, ChevronRight } from "tabler-icons-react"
import { ThemeIcon } from "@mantine/core"

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
  const [isMenuOpen, setIsMenuOpen] = useState(hardSkill.selectable)
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
        <SkillContainer onClick={toggleMenu} style={{ gap: "0.5rem" }}>
          <ThemeIcon variant="outline" size={25} bd={"none"}>
            {isMenuOpen ? <ChevronDown /> : <ChevronRight />}
          </ThemeIcon>
          <SkillName>{hardSkill.name}</SkillName>
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
  width: fit-content;
`

const SkillContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const SkillName = styled.span`
  cursor: pointer;
  user-select: none;
`

const ChildrenList = styled.ul`
  padding-left: 2.5rem;
`

export default HardSkillItem
