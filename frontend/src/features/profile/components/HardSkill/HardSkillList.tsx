import { FC, FormEvent, ReactElement, useEffect, useState } from "react"
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

  const handleCheckboxChange = (id: number) => {
    const skill = hardSkills.find((hardSkill) => hardSkill.id === id)

    if (skill) {
      setSelectedHardSkills((prevSelected) =>
        xorBy(prevSelected, [skill], "id")
      )
    }
    setSearchHardSkill("") // TODO Возможно, пользователю не удобно сбрасывать input без авто сохранения
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await setHardSkills(selectedHardSkills).unwrap()
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
  }

  const filteredHardSkills = hardSkills.filter(({ name }) =>
    name.toLowerCase().includes(searchHardSkill.toLowerCase())
  )

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">Save</button>

      {message && <p>{message}</p>}
    </form>
  )
}

export default HardSkillList
