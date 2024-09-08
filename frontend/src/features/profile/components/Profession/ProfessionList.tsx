import SelectableList from "@/features/profile/components/Selectable/SelectableList.tsx"
import { FC } from "react"
import { Profession } from "@/types/professionTypes.ts"

interface ProfessionListProps {
  professions: Profession[]
  userProfessions: Profession[]
}

const ProfessionList: FC<ProfessionListProps> = ({
  professions,
  userProfessions,
}) => (
  <SelectableList
    items={professions}
    userItems={userProfessions}
    itemsName={"profession"}
  />
)

export default ProfessionList
