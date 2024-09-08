import { HardSkill } from "@/types/hardSkillTypes.ts"
import { FC } from "react"
import HardSkillItem from "@/features/profile/components/HardSkill/HardSkillItem.tsx"
import useSelectableItems from "@/store/hooks/useSelectableItems.ts"
import styled, { ThemeProvider } from "styled-components"
import { transitionsSpeed } from "@/styles/theme.ts"
import { rgba, useMantineTheme } from "@mantine/core"

interface HardSkillListProps {
  hardSkills: HardSkill[]
  userHardSkills: HardSkill[]
}

const HardSkillList: FC<HardSkillListProps> = ({
  hardSkills,
  userHardSkills,
}) => {
  const { selectedItems, handleCheckboxChange } = useSelectableItems(
    userHardSkills,
    "hardSkill"
  )
  const theme = useMantineTheme()

  return (
    <ThemeProvider theme={theme}>
      <List>
        {hardSkills.map((hardSkill) => (
          <HardSkillItem
            key={hardSkill.id}
            hardSkill={hardSkill}
            userHardSkills={userHardSkills}
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

export default HardSkillList
