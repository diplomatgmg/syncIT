import { HardSkill } from "@/types/hardSkillTypes.ts"
import { FC } from "react"
import HardSkillItem from "@/features/profile/components/HardSkill/HardSkillItem.tsx"
import {
  useGetProfileStatusQuery,
  useSetUserHardSkillsMutation,
} from "@/store/api/profileApi.ts"
import useSelectableItems from "@/store/hooks/useSelectableItems.ts"
import styled from "styled-components"
import { colors, transitionsSpeed } from "@/styles/theme.ts"

interface HardSkillListProps {
  hardSkills: HardSkill[]
  userHardSkills: HardSkill[]
}

const HardSkillList: FC<HardSkillListProps> = ({
  hardSkills,
  userHardSkills,
}) => {
  const { refetch: refetchProfileStatus } = useGetProfileStatusQuery()
  const { selectedItems, handleCheckboxChange } = useSelectableItems(
    userHardSkills,
    useSetUserHardSkillsMutation,
    refetchProfileStatus
  )

  return (
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
  )
}

const List = styled.ul`
  margin: 0;
  padding: 0;

  & > li {
    padding: 1rem;

    border-bottom: 1px solid ${colors.textSecondary};
    transition: ease ${transitionsSpeed.fast};

    &:hover {
      background-color: ${colors.backgroundSecondary};
    }

    &:last-child {
      border: none;
    }
  }
`

export default HardSkillList
