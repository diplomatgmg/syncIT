import { FC, type ReactElement, useEffect, useState } from "react"
import { Grade } from "@/types/gradeTypes.ts"
import { useSetUserGradesMutation } from "@/store/api/profileApi.ts"
import xorBy from "lodash/xorBy"
import Checkbox from "@/components/common/Input/CheckBox.tsx"

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

  const handleCheckboxChange = async (id: number) => {
    const grade = grades.find((g) => g.id === id)

    if (!grade) return

    const updatedGrades = xorBy(selectedGrades, [grade], "id")
    setSelectedGrades(updatedGrades)

    try {
      await setGrades(updatedGrades).unwrap()
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
    <div>
      <ul>
        {grades.map(({ id, name }) => (
          <Checkbox
            key={id}
            id={id}
            name={name}
            isSelected={selectedGrades.some((grade) => grade.id === id)}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </ul>

      {message && <p>{message}</p>}
    </div>
  )
}

export default GradeList
