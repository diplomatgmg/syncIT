import { type ReactElement } from "react"
import { useGetVacanciesQuery } from "@/store/api/vacancyApi.ts"
import VacancyList from "@/features/home/components/Vacancy/VacancyList.tsx"

const Vacancy = (): ReactElement => {
  const { data: vacancies = [], isLoading } = useGetVacanciesQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const countUnViewedVacancies = vacancies.reduce((acc, cur) => {
    if (cur.isViewed) {
      return acc + 1
    }
    return acc
  }, 0)

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <span>Всего - {vacancies.length} вакансий.</span>
        <span>Просмотренных - {countUnViewedVacancies}</span>
      </div>
      <VacancyList vacancies={vacancies} />
    </div>
  )
}

export default Vacancy
