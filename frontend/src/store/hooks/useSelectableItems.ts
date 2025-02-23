import { useState } from "react"
import xorBy from "lodash/xorBy"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import {
  setGrades,
  setProfessions,
  setProfileIsChanged,
  setSkills,
  setWorkFormats,
} from "@/store/slice/profileSlice.ts"

const useSelectableItems = <T extends { id: number; name: string }>(
  initialItems: T[],
  itemsName: "profession" | "workFormat" | "grade" | "skill"
) => {
  const dispatch = useAppDispatch()
  const [selectedItems, setSelectedItems] = useState(initialItems)

  const handleCheckboxChange = async (item: T) => {
    dispatch(setProfileIsChanged(true))
    const updatedItems = xorBy(selectedItems, [item], "id")
    setSelectedItems(updatedItems)

    switch (itemsName) {
      case "profession":
        dispatch(setProfessions(updatedItems))
        break
      case "workFormat":
        dispatch(setWorkFormats(updatedItems))
        break
      case "grade":
        dispatch(setGrades(updatedItems))
        break
      case "skill":
        dispatch(setSkills(updatedItems))
        break
      default:
        break
    }
  }

  return { selectedItems, handleCheckboxChange }
}

export default useSelectableItems
