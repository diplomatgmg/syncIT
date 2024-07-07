import { ChangeEvent, FC, FormEvent, type ReactElement, useState } from "react"
import { HardSkillTypes } from "@/types/hardSkillTypes.ts"
import xorBy from "lodash/xorBy"

interface HardSkillListProps {
  hardSkills: HardSkillTypes[]
  userHardSkills: HardSkillTypes[]
}

const HardSkillList: FC<HardSkillListProps> = ({
  hardSkills,
  userHardSkills,
}): ReactElement => {
  const [selected, setSelected] = useState<HardSkillTypes[]>([
    ...userHardSkills,
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredSkills = hardSkills.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCheckboxChange = (id: number) => {
    setSelected((prevSelected) => xorBy(prevSelected, [{ id }], "id"))
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
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
              onChange={() => handleCheckboxChange(id)}
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

export default HardSkillList
