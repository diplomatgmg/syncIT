import { HardSkill } from "@/types/hardSkillTypes.ts"
import { FC, useEffect } from "react"
import HardSkillItem from "@/features/profile/components/HardSkill/HardSkillItem.tsx"
import {
  useGetProfileStatusQuery,
  useSetUserHardSkillsMutation,
} from "@/store/api/profileApi.ts"
import useSelectableList from "@/store/hooks/useSelectableList.ts"

interface HardSkillListProps {
  hardSkills: HardSkill[]
  userHardSkills: HardSkill[]
}

const HardSkillList: FC<HardSkillListProps> = ({
  hardSkills,
  userHardSkills,
}) => {
  const { refetch: refetchProfileStatus } = useGetProfileStatusQuery()
  const { selectedItems, setSelectedItems, message, handleCheckboxChange } =
    useSelectableList(userHardSkills, useSetUserHardSkillsMutation)

  useEffect(() => {
    setSelectedItems(userHardSkills)
    refetchProfileStatus()
  }, [userHardSkills, setSelectedItems, refetchProfileStatus])

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
