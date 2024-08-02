import { useEffect, useState } from "react"
import xorBy from "lodash/xorBy"

// Не нашел в документации нужный тип для useMutation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Mutation = () => any

const useSelectableItems = <T extends { id: number }>(
  initialItems: T[],
  mutation: Mutation,
  refetch: () => void
) => {
  const [selectedItems, setSelectedItems] = useState(initialItems)
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
    } catch (err) {
      console.error("Ошибка: ", err)
    }
  }

  return { selectedItems, handleCheckboxChange }
}

export default useSelectableItems
