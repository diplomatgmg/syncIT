import { useState } from "react"
import xorBy from "lodash/xorBy"

interface Item {
  id: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSelectableList = (initialItems: Item[], mutation: any) => {
  const [selectedItems, setSelectedItems] = useState(initialItems)
  const [message, setMessage] = useState("")
  const [setItems] = mutation()

  const handleCheckboxChange = async (id: number, items: Item[]) => {
    const item = items.find((i) => i.id === id)

    if (!item) return

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

  return { selectedItems, setSelectedItems, message, handleCheckboxChange }
}

export default useSelectableList
