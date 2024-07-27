import { ReactElement } from "react"
import useSelectableItems, {
  Mutation,
} from "@/store/hooks/useSelectableItems.ts"
import Checkbox from "@/components/common/Input/Checkbox.tsx"
import { useGetProfileStatusQuery } from "@/store/api/profileApi.ts"

interface SelectableListProps<T> {
  items: T[]
  userItems: T[]
  mutation: Mutation
}

const SelectableList = <T extends { id: number; name: string }>({
  items,
  userItems,
  mutation,
}: SelectableListProps<T>): ReactElement => {
  const { refetch: refetchProfileStatus } = useGetProfileStatusQuery()
  const { selectedItems, message, handleCheckboxChange } = useSelectableItems(
    userItems,
    mutation,
    refetchProfileStatus
  )

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Checkbox
              id={item.id}
              name={item.name}
              isSelected={selectedItems.some(
                (selectedItem) => selectedItem.id === item.id
              )}
              handleCheckboxChange={() => handleCheckboxChange(item)}
            />
          </li>
        ))}
      </ul>
      {message && <p>{message}</p>}
    </div>
  )
}

export default SelectableList
