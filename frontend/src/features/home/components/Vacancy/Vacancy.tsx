import { type ReactElement } from "react"
import { useGetVacanciesQuery } from "@/store/api/vacancyApi.ts"
import VacancyList from "@/features/home/components/Vacancy/VacancyList.tsx"
import styled from "styled-components"

const Vacancy = (): ReactElement => {
  const { data: vacancies = [], isLoading } = useGetVacanciesQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const countUnViewedVacancies = vacancies.reduce((acc, cur) => {
    if (!cur.isViewed) {
      return acc + 1
    }
    return acc
  }, 0)

  return (
    <>
      <VacanciesInfoContainer>
        <span>Всего - {vacancies.length} вакансий.</span>
        <span>Новых - {countUnViewedVacancies}</span>
      </VacanciesInfoContainer>
      <VacancyList vacancies={vacancies} />
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
