import { Skill } from "@/types/skillTypes.ts"
import { FC } from "react"
import SkillItem from "@/features/profile/components/Skill/SkillItem.tsx"
import useSelectableItems from "@/store/hooks/useSelectableItems.ts"
import styled, { ThemeProvider } from "styled-components"
import { transitionsSpeed } from "@/styles/theme.ts"
import { rgba, useMantineTheme } from "@mantine/core"

interface SkillListProps {
  skills: Skill[]
  userSkills: Skill[]
}

const SkillList: FC<SkillListProps> = ({ skills, userSkills }) => {
  const { selectedItems, handleCheckboxChange } = useSelectableItems(
    userSkills,
    "skill"
  )
  const theme = useMantineTheme()

  return (
    <ThemeProvider theme={theme}>
      <List>
        {skills.map((skill) => (
          <SkillItem
            key={skill.id}
            skill={skill}
            userSkills={userSkills}
            selectedItems={selectedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </List>
    </ThemeProvider>
  )
}

const List = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  place-self: start;

  & > li {
    padding: 0.75rem;
    transition: ease ${transitionsSpeed.fast};
    width: 100%;

    &:hover {
      background-color: ${({ theme }) => rgba(theme.colors.dark[8], 0.25)};
    }

    &:last-child {
      border: none;
    }
  }
`

export default SkillList
