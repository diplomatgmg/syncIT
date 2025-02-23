import { FC, useState } from "react"
import styled from "styled-components"
import Checkbox from "@/components/common/Checkbox.tsx"
import { ChevronDown, ChevronRight } from "tabler-icons-react"
import { ThemeIcon } from "@mantine/core"
import { Skill } from "@/types/skillTypes.ts"

interface SkillItemProps {
  skill: Skill
  userSkills: Skill[]
  selectedItems: Skill[]
  handleCheckboxChange: (skill: Skill) => void
}

const SkillItem: FC<SkillItemProps> = ({
  skill,
  userSkills,
  selectedItems,
  handleCheckboxChange,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(skill.selectable)
  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState)

  return (
    <StyledSkillItem>
      {skill.selectable ? (
        <Checkbox
          name={skill.name}
          isSelected={selectedItems.some((s) => skill.id === s.id)}
          handleCheckboxChange={() => handleCheckboxChange(skill)}
        />
      ) : (
        <SkillContainer onClick={toggleMenu} style={{ gap: "0.5rem" }}>
          <ThemeIcon variant="outline" size={25} bd={"none"}>
            {isMenuOpen ? <ChevronDown /> : <ChevronRight />}
          </ThemeIcon>
          <SkillName>{skill.name}</SkillName>
        </SkillContainer>
      )}

      {skill.children.length > 0 && isMenuOpen && (
        <ChildrenList>
          {skill.children.map((child) => (
            <SkillItem
              key={child.id}
              skill={child}
              userSkills={userSkills}
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

export default SkillItem
