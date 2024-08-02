import { FC, type ReactElement, useId, useState } from "react"
import { VacancyPreview } from "@/types/vacancyTypes.ts"
import { useUpdateVacancyViewStatusMutation } from "@/store/api/vacancyApi.ts"
import HardSkillList from "@/features/home/components/HardSkill/HardSkillList.tsx"
import styled, { ThemeProvider } from "styled-components"
import { Link } from "react-router-dom"
import { colors } from "@/styles/theme.ts"
import UnWatchIcon from "@/assets/svg/unwatch.svg"

interface VacancyItemProps {
  isViewed: boolean
  suitability: number
  vacancy: VacancyPreview
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

  const salaryFrom = vacancy.salaryFrom ? `${vacancy.salaryFrom}₽` : "?₽"
  const salaryTo = vacancy.salaryTo ? `${vacancy.salaryTo}₽` : "?₽"
  const salary =
    !vacancy.salaryFrom && !vacancy.salaryTo
      ? "Неизвестно"
      : `${salaryFrom} - ${salaryTo}`

  if (isHidden) return null

  return (
    <ThemeProvider theme={{ isViewed }}>
      <JobCard>
        <JobHeaderContainer>
          <JobHeader>
            <JobTitle>
              <Link to={vacancy.url} target={"_blank"}>
                {vacancy.name} - {String(isViewed)}
              </Link>
            </JobTitle>
            <Company>{vacancy.company.name}</Company>
          </JobHeader>
          {!isViewed && (
            <UnWatch
              alt={"Unwatch"}
              src={UnWatchIcon}
              onClick={handleOpenVacancySource(vacancy.id)}
            />
          )}
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

interface Styles {
  theme: {
    isViewed: boolean
  }
}

const JobCard = styled.div<Styles>`
  border: 1px solid ${colors.textSecondary};
  border-radius: 5px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  background-color: ${({ theme }) =>
    theme.isViewed ? colors.background : colors.primary};
  margin-bottom: 4rem;

  @media (max-width: 1200px) {
    border: none;
    border-bottom: 1px solid ${colors.textSecondary};
    border-top: 1px solid ${colors.textSecondary};
    border-radius: 0;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`

const JobHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`

const JobHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const JobTitle = styled.h3`
  margin: 0;
  font-size: 2rem;

  a {
    text-decoration: none;
    color: #6d7eec;
  }

  @media (max-width: 1200px) {
    font-size: 1.5rem;
  }
`

const UnWatch = styled.img`
  align-self: start;
  width: 2.5rem;
  &:hover {
    cursor: pointer;
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
    margin-bottom: 0;
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
