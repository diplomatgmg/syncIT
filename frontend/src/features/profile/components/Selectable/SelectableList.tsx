import { ReactElement } from "react"
import useSelectableItems from "@/store/hooks/useSelectableItems.ts"
import styled from "styled-components"
import Checkbox from "@/components/common/Checkbox.tsx"

interface SelectableListProps<T> {
  items: T[]
  userItems: T[]
  itemsName: "profession" | "workFormat" | "grade" | "hardSkill"
}

const SelectableList = <T extends { id: number; name: string }>({
  items,
  userItems,
  itemsName,
}: SelectableListProps<T>): ReactElement => {
  const { selectedItems, handleCheckboxChange } = useSelectableItems(
    userItems,
    itemsName
  )

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          <Checkbox
            name={item.name}
            isSelected={selectedItems.some(
              (selectedItem) => selectedItem.id === item.id
            )}
            handleCheckboxChange={() => handleCheckboxChange(item)}
          />
        </ListItem>
      ))}
    </List>
  )
}

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`

const ListItem = styled.li`
  white-space: nowrap;
`

export default SelectableList
