import { FC, type ReactElement } from "react"
import { UserVacancy } from "@/types/vacancyTypes.ts"
import VacancyItem from "@/features/home/components/Vacancy/VacancyItem.tsx"
import styled from "styled-components"
import VacancyItemSkeleton from "@/features/home/components/Vacancy/VacancyItemSkeleton/VacancyItemSkeleton.tsx"

interface VacancyListProps {
  vacancies: UserVacancy[]
  isLoading: boolean
}

const StyledVacancyList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
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
