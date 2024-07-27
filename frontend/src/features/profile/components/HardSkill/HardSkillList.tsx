import { HardSkill } from "@/types/hardSkillTypes.ts"
import { FC } from "react"
import HardSkillItem from "@/features/profile/components/HardSkill/HardSkillItem.tsx"
import {
  useGetProfileStatusQuery,
  useSetUserHardSkillsMutation,
} from "@/store/api/profileApi.ts"
import useSelectableItems from "@/store/hooks/useSelectableItems.ts"

interface HardSkillListProps {
  hardSkills: HardSkill[]
  userHardSkills: HardSkill[]
}

const HardSkillList: FC<HardSkillListProps> = ({
  hardSkills,
  userHardSkills,
}) => {
  const { refetch: refetchProfileStatus } = useGetProfileStatusQuery()
  const { selectedItems, message, handleCheckboxChange } = useSelectableItems(
    userHardSkills,
    useSetUserHardSkillsMutation,
    refetchProfileStatus
  )

  return (
    <ul>
      {hardSkills.map((hardSkill) => (
        <HardSkillItem
          key={hardSkill.id}
          hardSkill={hardSkill}
          userHardSkills={userHardSkills}
          selectedItems={selectedItems}
          handleCheckboxChange={handleCheckboxChange}
        />
      ))}
      {message && <p>{message}</p>}
    </ul>
  )
}

export default HardSkillList
