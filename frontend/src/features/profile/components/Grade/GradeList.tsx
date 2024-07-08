import { FC, FormEvent, type ReactElement, useEffect, useState } from "react"
import { Grade } from "@/types/gradeTypes.ts"
import { useSetUserGradesMutation } from "@/store/api/profileApi.ts"
import xorBy from "lodash/xorBy"
import GradeCheckBox from "@/features/profile/components/Grade/GradeCheckBox.tsx"

interface GradeListProps {
  grades: Grade[]
  userGrades: Grade[]
}

const GradeList: FC<GradeListProps> = ({
  grades,
  userGrades,
}): ReactElement => {
  const [selectedGrades, setSelectedGrades] = useState(userGrades)
  const [setGrades] = useSetUserGradesMutation()
  const [message, setMessage] = useState("")

  useEffect(() => {
    setSelectedGrades(userGrades)
  }, [userGrades])

  const handleCheckboxChange = (id: number) => {
    const grade = grades.find((g) => g.id === id)

    if (grade) {
      setSelectedGrades((prevSelected) => xorBy(prevSelected, [grade], "id"))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await setGrades(selectedGrades).unwrap()
      setMessage("Грейды успешно сохранены")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      console.error("Ошибка входа: ", err)
      setMessage(
        "Ошибка при сохранении грейдов. " +
          "Связаться с разработчиком - undefined. " +
          "Шутка, я уже в курсе об ошибке <3"
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {grades.map(({ id, name }) => (
          <GradeCheckBox
            key={id}
            id={id}
            name={name}
            isSelected={selectedGrades.some((grade) => grade.id === id)}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </ul>

      <button type="submit">Save</button>

      {message && <p>{message}</p>}
    </form>
  )
}

export default GradeList
