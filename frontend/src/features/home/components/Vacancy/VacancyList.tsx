import { FC, type ReactElement } from "react"
import { UserVacancyPreview } from "@/types/vacancyTypes.ts"
import VacancyItem from "@/features/home/components/Vacancy/VacancyItem.tsx"
import styled from "styled-components"

interface VacancyListProps {
  vacancies: UserVacancyPreview[]
}

const StyledVacancyList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
`

const VacancyList: FC<VacancyListProps> = ({ vacancies }): ReactElement => {
  return (
    <StyledVacancyList>
      {vacancies.map((vacancy) => (
        <VacancyItem
          key={vacancy.id}
          isViewed={vacancy.isViewed}
          vacancy={vacancy.vacancy}
          suitability={vacancy.suitability}
        />
      ))}
    </StyledVacancyList>
  )
}

export default VacancyList
