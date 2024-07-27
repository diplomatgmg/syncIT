import { HardSkill } from "@/types/hardSkillTypes.ts"
import { FC } from "react"
import HardSkillItem from "@/features/profile/components/HardSkill/HardSkillItem.tsx"
import {
  useGetProfileStatusQuery,
  useSetUserHardSkillsMutation,
} from "@/store/api/profileApi.ts"
import useSelectableItems from "@/store/hooks/useSelectableItems.ts"
import "./style.css"

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
    <ul
      className={"categories"}
      style={{
        listStyle: "none",
        fontWeight: "bold",
        color: "#8c8c8c",
        paddingLeft: "10px",
      }}>
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
