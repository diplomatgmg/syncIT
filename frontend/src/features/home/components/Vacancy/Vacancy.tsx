import { type ReactElement } from "react"
import { useGetVacanciesQuery } from "@/store/api/vacancyApi.ts"
import VacancyList from "@/features/home/components/Vacancy/VacancyList.tsx"

const Vacancy = (): ReactElement => {
  const { data: vacancies = [], isLoading } = useGetVacanciesQuery()
  // TODO Отсортировать вакансии на бекенде по isViewed > suitability

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <VacancyList vacancies={vacancies} />
}

export default Vacancy
