import { type ReactElement, type FormEvent, useState } from "react"
import { HARD_SKILLS } from "../../../constants.ts"
import xorBy from "lodash/xorBy"

const HardSkillListOld = (): ReactElement => {
  const [selected, setSelected] = useState<{ id: number; name: string }[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredSkills = HARD_SKILLS.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCheckboxChange = (id: number, name: string) => {
    setSelected((prevSelected) => xorBy(prevSelected, [{ id, name }], "id"))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(selected)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search hard skills"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredSkills.map(({ id, name }) => (
        <li key={id}>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(id, name)}
              checked={selected.some((item) => item.id === id)}
            />
            {name}
          </label>
        </li>
      ))}

      <button type="submit">Save</button>
    </form>
  )
}

export default HardSkillListOld
