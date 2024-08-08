import { type ReactElement } from "react"
import { useGetVacanciesQuery } from "@/store/api/vacancyApi.ts"
import VacancyList from "@/features/home/components/Vacancy/VacancyList.tsx"
import styled from "styled-components"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"

const Vacancy = (): ReactElement => {
  const { data: vacancies = [], isLoading } = useGetVacanciesQuery()

  const countUnViewedVacancies = vacancies.reduce((acc, cur) => {
    if (!cur.isViewed) {
      return acc + 1
    }
    return acc
  }, 0)

  return (
    <>
      <VacanciesInfoContainer>
        {isLoading && (
          <CustomSkeleton width={"25%"} style={{ margin: "0 auto" }} />
        )}
        {!isLoading && (
          <>
            <span>Всего - {vacancies.length} вакансий.</span>
            <span>Новых - {countUnViewedVacancies}</span>
          </>
        )}
      </VacanciesInfoContainer>
      <VacancyList vacancies={vacancies} isLoading={isLoading} />
    </>
  )
}

export default Vacancy

const VacanciesInfoContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  white-space: nowrap;
  margin-bottom: 2rem;

  @media (max-width: 720px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`
