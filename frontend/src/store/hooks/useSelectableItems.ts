import { useEffect, useState } from "react"
import xorBy from "lodash/xorBy"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import {
  setGrades,
  setHardSkills,
  setProfessions,
  setProfileIsChanged,
  setWorkFormats,
} from "@/store/slice/profileSlice.ts"
import { useGetProfileStatusQuery } from "@/store/api/profileApi.ts"

const useSelectableItems = <T extends { id: number; name: string }>(
  initialItems: T[],
  itemsName: "profession" | "workFormat" | "grade" | "hardSkill"
) => {
  const { refetch: refetchProfileStatus } = useGetProfileStatusQuery()
  const dispatch = useAppDispatch()
  const [selectedItems, setSelectedItems] = useState(initialItems)

  useEffect(() => {
    refetchProfileStatus()
  }, [initialItems, refetchProfileStatus])

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
      case "hardSkill":
        dispatch(setHardSkills(updatedItems))
        break
      default:
        break
    }
  }

  return { selectedItems, handleCheckboxChange }
}

export default useSelectableItems
