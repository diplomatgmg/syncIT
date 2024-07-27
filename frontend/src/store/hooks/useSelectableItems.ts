import { useState, useEffect } from "react"
import xorBy from "lodash/xorBy"

const useSelectableItems = <T extends { id: number }>(
  initialItems: T[],
  mutation: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  refetch: () => void
) => {
  const [selectedItems, setSelectedItems] = useState(initialItems)
  const [message, setMessage] = useState("")
  const [setItems] = mutation()

  useEffect(() => {
    setSelectedItems(initialItems)
    refetch()
  }, [initialItems, refetch])

  const handleCheckboxChange = async (item: T) => {
    const updatedItems = xorBy(selectedItems, [item], "id")
    setSelectedItems(updatedItems)

    try {
      await setItems(updatedItems).unwrap()
      setMessage("Изменения успешно сохранены")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      console.error("Ошибка: ", err)
      setMessage(
        "Ошибка при сохранении изменений. Пожалуйста, попробуйте позже."
      )
    }
  }

  return { selectedItems, message, handleCheckboxChange }
}

export default useSelectableItems
