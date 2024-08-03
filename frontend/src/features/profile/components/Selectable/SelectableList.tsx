import { ReactElement } from "react"
import useSelectableItems, {
  Mutation,
} from "@/store/hooks/useSelectableItems.ts"
import Checkbox from "@/components/common/Input/Checkbox.tsx"
import { useGetProfileStatusQuery } from "@/store/api/profileApi.ts"
import styled from "styled-components"

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
  const { selectedItems, handleCheckboxChange } = useSelectableItems(
    userItems,
    mutation,
    refetchProfileStatus
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
  height: 100%;
  list-style: none;
`

const ListItem = styled.li`
  padding-bottom: 0.5rem;

  @media (max-width: 1200px) {
    &:last-child {
      padding-bottom: 0;
    }

    margin-bottom: 0;
    padding-bottom: 0;
  }
`

export default SelectableList
