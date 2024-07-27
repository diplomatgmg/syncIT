import { ReactElement, useEffect } from "react"
import useSelectableList from "@/store/hooks/useSelectableList.ts"
import Checkbox from "@/components/common/Input/CheckBox.tsx"
import { useGetProfileStatusQuery } from "@/store/api/profileApi.ts"

interface SelectableListProps<T> {
  items: T[]
  userItems: T[]
  mutation: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

const SelectableList = <T extends { id: number; name: string }>({
  items,
  userItems,
  mutation,
}: SelectableListProps<T>): ReactElement => {
  const { refetch: refetchProfileStatus } = useGetProfileStatusQuery()
  const { selectedItems, setSelectedItems, message, handleCheckboxChange } =
    useSelectableList(userItems, mutation)

  useEffect(() => {
    setSelectedItems(userItems)
    refetchProfileStatus()
  }, [userItems, setSelectedItems, refetchProfileStatus])

  return (
    <div>
      <ul>
        {items.map((item) => (
          <Checkbox
            key={item.id}
            id={item.id}
            name={item.name}
            isSelected={selectedItems.some(
              (selectedItem) => selectedItem.id === item.id
            )}
            handleCheckboxChange={() => handleCheckboxChange(item)}
          />
        ))}
      </ul>
      {message && <p>{message}</p>}
    </div>
  )
}

export default SelectableList
