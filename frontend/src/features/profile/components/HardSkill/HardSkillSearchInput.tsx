import { FC } from "react"

interface HardSkillSearchInputProps {
  searchHardSkill: string
  setSearchHardSkill: (value: string) => void
}

const HardSkillSearchInput: FC<HardSkillSearchInputProps> = ({
  searchHardSkill,
  setSearchHardSkill,
}) => {
  return (
    <input
      type="text"
      placeholder="Search hard skills"
      value={searchHardSkill}
      onChange={(e) => setSearchHardSkill(e.target.value)}
    />
  )
}

export default HardSkillSearchInput
