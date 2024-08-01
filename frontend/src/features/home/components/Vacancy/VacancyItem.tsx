import { FC, type ReactElement, useId, useState } from "react"
import { VacancyPreview } from "@/types/vacancyTypes.ts"
import { useUpdateVacancyViewStatusMutation } from "@/store/api/vacancyApi.ts"
import HardSkillList from "@/features/home/components/HardSkill/HardSkillList.tsx"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { colors } from "@/styles/theme.ts"

interface VacancyItemProps {
  suitability: number
  vacancy: VacancyPreview
}

const VacancyItem: FC<VacancyItemProps> = ({
  suitability,
  vacancy,
}): ReactElement => {
  const [isOpenedDescription, setIsOpenedDescription] = useState(false)
  const id = useId()
  const [updateVacancyViewStatus] = useUpdateVacancyViewStatusMutation()

  const handleOpenVacancySource = (vacancy_id: number) => async () => {
    try {
      await updateVacancyViewStatus({ vacancy: vacancy_id }).unwrap()
    } catch (err) {
      console.error("Ошибка входа: ", err)
    }
  }

  const salaryFrom = vacancy.salaryFrom ? `${vacancy.salaryFrom}₽` : "?₽"
  const salaryTo = vacancy.salaryTo ? `${vacancy.salaryTo}₽` : "?₽"
  const salary =
    !vacancy.salaryFrom && !vacancy.salaryTo
      ? "Неизвестно"
      : `${salaryFrom} - ${salaryTo}`

  return (
    <JobCard>
      <JobHeader>
        <JobTitle>
          <Link
            to={vacancy.url}
            target={"_blank"}
            onClick={handleOpenVacancySource(vacancy.id)}>
            {vacancy.name}
          </Link>
        </JobTitle>
        <Company>{vacancy.company.name}</Company>
      </JobHeader>

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
  )
}

export default VacancyItem

const JobCard = styled.div`
  border: 1px solid ${colors.textSecondary};
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1024px;
  background-color: black;

  @media (max-width: 768px) {
    padding: 15px;
  }
`

const JobHeader = styled.div`
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`

const JobTitle = styled.h3`
  margin: 0;
  font-size: 2rem;

  a {
    text-decoration: none;
    color: #6d7eec;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const Company = styled.p`
  margin: 5px 0 0;
  font-size: 1.25rem;
  color: ${colors.textSecondary};
`

const JobDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 1.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 1rem;
  }
`

const Format = styled.p`
  display: flex;
  white-space: nowrap;
  color: ${colors.textSecondary};
  width: 30%;
  margin: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const Profession = styled.p`
  display: flex;
  white-space: nowrap;
  color: ${colors.textSecondary};
  width: 30%;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const Experience = styled.p`
  display: flex;
  white-space: nowrap;
  color: ${colors.textSecondary};
  width: 30%;
  margin: 0;
  justify-content: flex-end;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`

const Relevance = styled.p`
  display: flex;
  white-space: nowrap;
  color: ${colors.textSecondary};
  width: 30%;
  margin: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const Salary = styled.p`
  display: flex;
  white-space: nowrap;
  color: ${colors.textSecondary};
  width: 30%;
  margin: 0;
  justify-content: flex-end;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`

const ToggleDescription = styled.input.attrs({ type: "checkbox" })`
  display: none;
`

const ToggleLabel = styled.label`
  display: block;
  margin-top: 1.5rem;
  color: ${colors.accent};
  cursor: pointer;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const JobDescription = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;

  pre {
    white-space: pre-wrap;
    font-size: 1rem;
    font-family: Nunito, sans-serif;
    line-height: 1.15rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  ${ToggleDescription}:checked ~ & {
    max-height: 600px;
    transition: max-height 0.3s ease-in;
  }
`
