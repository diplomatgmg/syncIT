import { FC, ReactElement, useEffect, useState } from "react"
import xorBy from "lodash/xorBy"
import HardSkillSearchInput from "@/features/profile/components/HardSkill/HardSkillSearchInput.tsx"
import { HardSkill } from "@/types/hardSkillTypes.ts"
import { useSetUserHardSkillsMutation } from "@/store/api/profileApi.ts"
import Checkbox from "@/components/common/Input/CheckBox.tsx"

interface HardSkillListProps {
  hardSkills: HardSkill[]
  userHardSkills: HardSkill[]
}

const HardSkillList: FC<HardSkillListProps> = ({
  hardSkills,
  userHardSkills,
}): ReactElement => {
  const [selectedHardSkills, setSelectedHardSkills] = useState(userHardSkills)
  const [searchHardSkill, setSearchHardSkill] = useState("")
  const [setHardSkills] = useSetUserHardSkillsMutation()
  const [message, setMessage] = useState("")

  useEffect(() => {
    setSelectedHardSkills(userHardSkills)
  }, [userHardSkills])

  const handleCheckboxChange = async (id: number) => {
    const skill = hardSkills.find((hardSkill) => hardSkill.id === id)

    if (!skill) return

    const updatedSkills = xorBy(selectedHardSkills, [skill], "id")
    setSelectedHardSkills(updatedSkills)

    try {
      await setHardSkills(updatedSkills).unwrap()
      setMessage("Хард скиллы успешно сохранены")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      console.error("Ошибка входа: ", err)
      setMessage(
        "Ошибка при сохранении хард скиллов. " +
          "Связаться с разработчиком - undefined. " +
          "Шутка, я уже в курсе об ошибке <3"
      )
    }

    setSearchHardSkill("")
  }

  const filteredHardSkills = hardSkills.filter(({ name }) =>
    name.toLowerCase().includes(searchHardSkill.toLowerCase())
  )

  return (
    <div>
      <HardSkillSearchInput
        searchHardSkill={searchHardSkill}
        setSearchHardSkill={setSearchHardSkill}
      />

      <ul>
        {filteredHardSkills.map(({ id, name }) => (
          <Checkbox
            key={id}
            id={id}
            name={name}
            isSelected={selectedHardSkills.some((skill) => skill.id === id)}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </ul>

      {message && <p>{message}</p>}
    </div>
  )
}

export default HardSkillList
