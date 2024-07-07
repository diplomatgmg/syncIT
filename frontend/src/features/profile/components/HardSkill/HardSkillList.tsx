import { FC, FormEvent, ReactElement, useEffect, useState } from "react"
import { HardSkillTypes } from "@/types/hardSkillTypes.ts"
import xorBy from "lodash/xorBy"
import { useSetHardSkillsMutation } from "@/store/api/profileApi.ts"

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
    const skill = hardSkills.find((hardSkill) => hardSkill.id === id)

    if (skill) {
      setSelectedHardSkills((prevSelected) =>
        xorBy(prevSelected, [id], (item) => item)
      )
    }

    setSearchHardSkill("")
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await setHardSkills(selectedHardSkills).unwrap()
      setMessage("Hard skills successfully saved!")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      console.error("Ошибка входа: ", err)
    }
  }

  const filteredHardSkills = hardSkills.filter(({ name }) =>
    name.toLowerCase().includes(searchHardSkill.toLowerCase())
  )

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search hard skills"
        value={searchHardSkill}
        onChange={(e) => setSearchHardSkill(e.target.value)}
      />

      <ul>
        {filteredHardSkills.map(({ id, name }) => (
          <li key={id}>
            <label>
              <input
                type="checkbox"
                checked={selectedHardSkills.some((skillId) => skillId === id)}
                onChange={() => handleCheckboxChange(id)}
              />
              {name}
            </label>
          </li>
        ))}
      </ul>

      <button type="submit">Save</button>

      {message && <p>{message}</p>}
    </form>
  )
}

export default HardSkillList
