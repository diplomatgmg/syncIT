import { FC, type ReactElement, useId, useState } from "react"
import { Vacancy } from "@/types/vacancyTypes.ts"
import { useUpdateVacancyViewStatusMutation } from "@/store/api/vacancyApi.ts"
import HardSkillList from "@/features/home/components/HardSkill/HardSkillList.tsx"
import { ThemeProvider } from "styled-components"
import { Link } from "react-router-dom"
import UnWatchIcon from "@/assets/svg/unwatch.svg"
import getSalary from "@/features/home/utils/getSalary.ts"
import {
  Company,
  Experience,
  Format,
  JobCard,
  JobDescription,
  JobDetails,
  JobHeader,
  JobHeaderContainer,
  JobTitle,
  Profession,
  Relevance,
  Salary,
  ToggleDescription,
  ToggleLabel,
  UnWatch,
  Watched,
} from "@/features/home/components/Vacancy/VacancyItemStyles.ts"

interface VacancyItemProps {
  isViewed: boolean
  suitability: number
  vacancy: Vacancy
}

const VacancyItem: FC<VacancyItemProps> = ({
  isViewed,
  suitability,
  vacancy,
}): ReactElement | null => {
  const [isOpenedDescription, setIsOpenedDescription] = useState(false)
  const id = useId()
  const [updateVacancyViewStatus] = useUpdateVacancyViewStatusMutation()
  const [isHidden, setIsHidden] = useState(false)

  const handleOpenVacancySource = (vacancy_id: number) => async () => {
    try {
      setIsHidden(true)
      setTimeout(() => setIsHidden(false), 3000)
      await updateVacancyViewStatus({ vacancy: vacancy_id }).unwrap()
    } catch (err) {
      console.error("Ошибка входа: ", err)
    }
  }
  const salary = getSalary(
    vacancy.currency,
    vacancy.salaryFrom,
    vacancy.salaryTo
  )

  if (isHidden) return null

  return (
    <ThemeProvider theme={{ isViewed }}>
      <JobCard>
        <JobHeaderContainer>
          <JobHeader>
            <JobTitle>
              <Link to={vacancy.url} target={"_blank"}>
                {vacancy.name}
              </Link>
            </JobTitle>
            <Company>{vacancy.company.name}</Company>
          </JobHeader>
          {!isViewed && (
            <UnWatch
              alt={"Unwatch"}
              title={"Отметить просмотренным"}
              src={UnWatchIcon}
              onClick={handleOpenVacancySource(vacancy.id)}
            />
          )}
          {isViewed && <Watched>Просмотрено</Watched>}
        </JobHeaderContainer>

        <JobDetails>
          <Format>
            {vacancy.workFormats.map(({ name }) => name).join(", ")}
          </Format>
          <Profession>{vacancy.profession.name}</Profession>
          <Experience>{vacancy.experience}</Experience>
        </JobDetails>

        <JobDetails>
          <Relevance>Релевантность: {suitability}%</Relevance>
          <Salary>Зарплата: {salary}</Salary>
        </JobDetails>

        <HardSkillList hardSkills={vacancy.hardSkills} />

        <ToggleDescription id={id} />
        <ToggleLabel
          htmlFor={id}
          onClick={() => setIsOpenedDescription(!isOpenedDescription)}>
          {isOpenedDescription ? "Свернуть" : "Развернуть"}
        </ToggleLabel>

        <JobDescription>
          <pre>{vacancy.description}</pre>
        </JobDescription>
      </JobCard>
    </ThemeProvider>
  )
}

export default VacancyItem
