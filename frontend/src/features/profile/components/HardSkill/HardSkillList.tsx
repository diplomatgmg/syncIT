import { FC, FormEvent, ReactElement, useEffect, useState } from "react"
import { HardSkillTypes } from "@/types/hardSkillTypes.ts"
import xorBy from "lodash/xorBy"
import { useSetHardSkillsMutation } from "@/store/api/profileApi.ts"
import HardSkillSearchInput from "@/features/profile/components/HardSkill/HardSkillSearchInput.tsx"
import HardSkillCheckbox from "@/features/profile/components/HardSkill/HardSkillCheckbox.tsx"

interface HardSkillListProps {
  hardSkills: HardSkillTypes[]
  userHardSkills: HardSkillTypes["id"][]
}

const HardSkillList: FC<HardSkillListProps> = ({
  hardSkills,
  userHardSkills,
}): ReactElement => {
  const [selectedHardSkills, setSelectedHardSkills] = useState(userHardSkills)
  const [searchHardSkill, setSearchHardSkill] = useState("")
  const [setHardSkills] = useSetHardSkillsMutation()
  const [message, setMessage] = useState("")

  useEffect(() => {
    setSelectedHardSkills(userHardSkills)
  }, [userHardSkills])

  const handleCheckboxChange = (id: number) => {
    setSelectedHardSkills((prevSelected) =>
      xorBy(prevSelected, [id], (item) => item)
    )
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
          <HardSkillCheckbox
            key={id}
            id={id}
            name={name}
            isSelected={selectedHardSkills.includes(id)}
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
