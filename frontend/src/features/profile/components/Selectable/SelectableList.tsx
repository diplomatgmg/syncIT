import { ReactElement, useEffect } from "react"
import useSelectableList from "@/store/hooks/useSelectableList.ts"
import Checkbox from "@/components/common/Input/CheckBox.tsx"

interface SelectableListProps<T> {
  items: T[]
  userItems: T[]
  mutation: any // eslint-disable-line @typescript-eslint/no-explicit-any
  searchComponent?: ReactElement
}

const SelectableList = <T extends { id: number; name: string }>({
  items,
  userItems,
  mutation,
  searchComponent,
}: SelectableListProps<T>): ReactElement => {
  const { selectedItems, setSelectedItems, message, handleCheckboxChange } =
    useSelectableList(userItems, mutation)

  useEffect(() => {
    setSelectedItems(userItems)
  }, [userItems, setSelectedItems])

  return (
    <div>
      {searchComponent}
      <ul>
        {items.map(({ id, name }) => (
          <Checkbox
            key={id}
            id={id}
            name={name}
            isSelected={selectedItems.some((item) => item.id === id)}
            handleCheckboxChange={(id: number) =>
              handleCheckboxChange(id, items)
            }
          />
        ))}
      </ul>
      {message && <p>{message}</p>}
    </div>
  )
}

export default SelectableList
