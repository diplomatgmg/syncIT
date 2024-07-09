import { FC, type ReactElement, useEffect, useState } from "react"
import { WorkFormat } from "@/types/workFormatTypes.ts"
import { useSetUserWorkFormatsMutation } from "@/store/api/profileApi.ts"
import xorBy from "lodash/xorBy"
import Checkbox from "@/components/common/Input/CheckBox.tsx"

interface WorkFormatProps {
  workFormats: WorkFormat[]
  userWorkFormats: WorkFormat[]
}

const WorkFormatList: FC<WorkFormatProps> = ({
  workFormats,
  userWorkFormats,
}): ReactElement => {
  const [selectedWorkFormats, setSelectedWorkFormats] = useState(workFormats)
  const [setWorkFormats] = useSetUserWorkFormatsMutation()
  const [message, setMessage] = useState("")

  useEffect(() => {
    setSelectedWorkFormats(userWorkFormats)
  }, [userWorkFormats])

  const handleCheckboxChange = async (id: number) => {
    const workFormat = workFormats.find((g) => g.id === id)

    if (!workFormat) return

    const updatedWorkFormats = xorBy(selectedWorkFormats, [workFormat], "id")
    setSelectedWorkFormats(updatedWorkFormats)

    try {
      await setWorkFormats(updatedWorkFormats).unwrap()
      setMessage("Форматы работы успешно сохранены")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      console.error("Ошибка входа: ", err)
      setMessage(
        "Ошибка при сохранении форматов работы.. " +
          "Связаться с разработчиком - undefined. " +
          "Шутка, я уже в курсе об ошибке <3"
      )
    }
  }

  return (
    <div>
      <ul>
        {workFormats.map(({ id, name }) => (
          <Checkbox
            key={id}
            id={id}
            name={name}
            isSelected={selectedWorkFormats.some(
              (workFormat) => workFormat.id === id
            )}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </ul>

      {message && <p>{message}</p>}
    </div>
  )
}

export default WorkFormatList
