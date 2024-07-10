import { HardSkill } from "@/types/hardSkillTypes.ts"
import { FC, useState } from "react"
import SelectableList from "@/features/profile/components/Selectable/SelectableList.tsx"
import { useSetUserHardSkillsMutation } from "@/store/api/profileApi.ts"
import HardSkillSearchInput from "@/features/profile/components/HardSkill/HardSkillSearchInput.tsx"

interface HardSkillListProps {
  hardSkills: HardSkill[]
  userHardSkills: HardSkill[]
}

const HardSkillList: FC<HardSkillListProps> = ({
  hardSkills,
  userHardSkills,
}) => {
  const [searchHardSkill, setSearchHardSkill] = useState("")

  const filteredHardSkills = hardSkills.filter(({ name }) =>
    name.toLowerCase().includes(searchHardSkill.toLowerCase())
  )

  return (
    <SelectableList
      items={filteredHardSkills}
      userItems={userHardSkills}
      mutation={useSetUserHardSkillsMutation}
      searchComponent={
        <HardSkillSearchInput
          searchHardSkill={searchHardSkill}
          setSearchHardSkill={setSearchHardSkill}
        />
      }
    />
  )
}
export default HardSkillList
