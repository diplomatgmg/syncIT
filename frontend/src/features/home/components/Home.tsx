import { type ReactElement } from "react"
import {
  useGetProfileDataQuery,
  useGetProfileVacanciesQuery,
} from "@/store/api/profileApi.ts"
import { VacancyPreview, UserVacancyPreview } from "@/types/vacancyTypes.ts"

// TODO Разделить компонент
const Home = (): ReactElement => {
  const { data: vacancies = [] } = useGetProfileVacanciesQuery()
  const { data: profileData } = useGetProfileDataQuery()

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
              <a href={vacancy.url} target="_blank" rel="noreferrer">
                Open
              </a>{" "}
              Подходит на {calcSuitable(vacancy.hardSkills)}%
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
