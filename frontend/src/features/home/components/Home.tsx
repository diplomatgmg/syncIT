import { type ReactElement } from "react"
import {
  useGetVacanciesQuery,
  useUpdateVacancyViewStatusMutation,
} from "@/store/api/vacancyApi.ts"

// TODO Разделить компонент
const Home = (): ReactElement => {
  const { data: vacancies = [] } = useGetVacanciesQuery()
  const [updateVacancyViewStatus] = useUpdateVacancyViewStatusMutation()

  const handleReferVacancy = async (vacancy_id: number) => {
    try {
      await updateVacancyViewStatus({ vacancy: vacancy_id }).unwrap()
    } catch (err) {
      console.error("Ошибка входа: ", err)
    }
  }

  return (
    <div>
      <h3>Best vacancies:</h3>
      <ul>
        {vacancies.map(({ id, isViewed, suitability, vacancy }) => (
          <li key={id}>
            {vacancy.name}
            <br />
            Просмотрена - {String(isViewed)}
            <p>
              <a
                href={vacancy.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => handleReferVacancy(vacancy.id)}>
                К источнику
              </a>{" "}
              |{" "}
              <a href="#" onClick={() => handleReferVacancy(vacancy.id)}>
                Подробнее
              </a>{" "}
              | Подходит на {suitability}%
              <br />
              {vacancy.hardSkills.map(({ name }) => name).join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
