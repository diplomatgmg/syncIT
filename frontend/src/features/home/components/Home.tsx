import { type ReactElement } from "react"
import {
  useGetProfileDataQuery,
  useGetProfileVacanciesQuery,
} from "@/store/api/profileApi.ts"
import { PreviewVacancy } from "@/types/vacancyTypes.ts"

// TODO Разделить компонент
const Home = (): ReactElement => {
  const { data: vacancies = [] } = useGetProfileVacanciesQuery()
  const { data: profileData } = useGetProfileDataQuery()

  const userHardSkills = profileData?.hardSkills ?? []

  const calcSuitable = (hardSkills: PreviewVacancy["hardSkills"]) => {
    const matchingSkillsCount = hardSkills.filter((skill) =>
      userHardSkills.find(({ id }) => id === skill.id)
    ).length

    const suitabilityPercentage =
      (matchingSkillsCount / hardSkills.length) * 100

    return Math.round(suitabilityPercentage)
  }

  const vacanciesWithSuitable = vacancies
    .map((vacancy) => ({
      ...vacancy,
      suitable: calcSuitable(vacancy.hardSkills),
    }))
    .filter(({ suitable }) => suitable > 60)
    .sort((a, b) => b.suitable - a.suitable)

  return (
    <div>
      <h3>Best vacancies:</h3>
      <ul>
        {vacanciesWithSuitable.map((vacancy) => (
          <li key={vacancy.id}>
            {vacancy.name}
            <p>
              <a href={vacancy.url} target="_blank" rel="noreferrer">
                Open
              </a>{" "}
              Подходит на {calcSuitable(vacancy.hardSkills)}%
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
