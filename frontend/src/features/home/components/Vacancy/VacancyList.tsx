import { FC, type ReactElement } from "react"
import { UserVacancyResult } from "@/types/vacancyTypes.ts"
import VacancyItem from "@/features/home/components/Vacancy/VacancyItem.tsx"
import styled from "styled-components"
import VacancyItemSkeleton from "@/features/home/components/Vacancy/VacancyItemSkeleton/VacancyItemSkeleton.tsx"
import uniqueId from "lodash/uniqueId"

interface VacancyListProps {
  vacancies: UserVacancyResult[]
  isLoading: boolean
}

const StyledVacancyList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
`

const VacancyList: FC<VacancyListProps> = ({
  vacancies,
  isLoading,
}): ReactElement => {
  if (isLoading) {
    return (
      <StyledVacancyList>
        <VacancyItemSkeleton />
        <VacancyItemSkeleton />
        <VacancyItemSkeleton />
        <VacancyItemSkeleton />
        <VacancyItemSkeleton />
        <VacancyItemSkeleton />
      </StyledVacancyList>
    )
  }

  return (
    <StyledVacancyList>
      {vacancies.map((vacancy) => (
        <VacancyItem
          key={uniqueId()}
          isViewed={vacancy.isViewed}
          vacancy={vacancy.vacancy}
          suitability={vacancy.suitability}
        />
      ))}
    </StyledVacancyList>
  )
}

export default VacancyList
