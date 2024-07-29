import { type ReactElement } from "react"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"
import { UserVacancyPreview, VacancyPreview } from "@/types/vacancyTypes.ts"
import {
  useGetVacanciesQuery,
  useUpdateVacancyViewStatusMutation,
} from "@/store/api/vacancyApi.ts"

// TODO Разделить компонент
const Home = (): ReactElement => {
  const { data: vacancies = [] } = useGetVacanciesQuery()
  const { data: profileData } = useGetProfileDataQuery()
  const [updateVacancyViewStatus] = useUpdateVacancyViewStatusMutation()

  const userHardSkills = profileData?.hardSkills ?? []

  // TODO Лучше вынести вычисления на бекенд
  const calcSuitable = (hardSkills: VacancyPreview["hardSkills"]) => {
    const matchingSkillsCount = hardSkills.filter((skill) =>
      userHardSkills.find(({ id }) => id === skill.id)
    ).length

    const suitabilityPercentage =
      (matchingSkillsCount / hardSkills.length) * 100

    return Math.round(suitabilityPercentage)
  }

  const vacanciesWithSuitable: UserVacancyPreview[] = vacancies
    .map((vacancy) => ({
      ...vacancy,
      suitable: calcSuitable(vacancy.vacancy.hardSkills),
    }))
    .filter(({ suitable }) => suitable > 60)
    .sort((a, b) => b.suitable - a.suitable)

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
        {vacanciesWithSuitable.map(({ id, isViewed, vacancy }) => (
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
              | Подходит на {calcSuitable(vacancy.hardSkills)}%
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
