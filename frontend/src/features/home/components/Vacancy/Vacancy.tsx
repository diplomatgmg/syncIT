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
      <span style={{ display: "flex", justifyContent: "center" }}>
        Всего - {vacancies.length} вакансий. Просмотренных -{" "}
        {countUnViewedVacancies}
      </span>
      <VacancyList vacancies={vacancies} />
    </div>
  )
}

export default Vacancy
