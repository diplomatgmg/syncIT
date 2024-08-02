import { HardSkill } from "@/types/hardSkillTypes.ts"
import { FC } from "react"
import HardSkillItem from "@/features/profile/components/HardSkill/HardSkillItem.tsx"
import {
  useGetProfileStatusQuery,
  useSetUserHardSkillsMutation,
} from "@/store/api/profileApi.ts"
import useSelectableItems from "@/store/hooks/useSelectableItems.ts"
import styled from "styled-components"
import { colors } from "@/styles/theme.ts"

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
  padding: 0;
  margin: 0;

  & > li {
    margin-bottom: 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid ${colors.textSecondary};

    &:last-child {
      border: none;
      padding-bottom: 0;
    }
  }
`

export default HardSkillList
