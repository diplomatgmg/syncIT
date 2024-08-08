import { type ReactElement, useMemo } from "react"
import {
  Company,
  Experience,
  Format,
  JobCard,
  JobDetails,
  JobHeader,
  JobHeaderContainer,
  JobTitle,
  Profession,
  Relevance,
  Salary,
  ToggleLabel,
  Watched,
} from "@/features/home/components/Vacancy/VacancyItemStyles.ts"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"
import random from "lodash/random"
import sample from "lodash/sample"
import styled from "styled-components"

const VacancyItemSkeleton = (): ReactElement => {
  const titleWidth = useMemo(() => random(340, 600), [])
  const companyWidth = useMemo(() => random(100, 300), [])
  const formatWidth = useMemo(() => sample([100, 200]), [])
  const professionWidth = useMemo(() => random(200, 350), [])
  const experienceWidth = useMemo(() => sample([140, 200]), [])
  const salaryWidth = useMemo(() => random(200, 350), [])
  const hardSkillsCount = useMemo(() => random(5, 8), [])

  const hardSkillsSkeletons = useMemo(
    () => (
      <HardSKillContainer>
        {Array.from({ length: hardSkillsCount }).map((_, index) => (
          <CustomSkeleton
            key={index}
            height={30}
            width={random(60, 160)}
            containerClassName={""}
          />
        ))}
      </HardSKillContainer>
    ),
    [hardSkillsCount]
  )

  return (
    <JobCard>
      <JobHeaderContainer>
        <JobHeader>
          <JobTitle>
            <CustomSkeleton width={titleWidth} />
          </JobTitle>
          <Company>
            <CustomSkeleton width={companyWidth} />
          </Company>
        </JobHeader>

        <Watched>
          <CustomSkeleton
            width={50}
            height={50}
            borderRadius={"50%"}
            containerClassName={""}
          />
        </Watched>
      </JobHeaderContainer>

      <JobDetails>
        <Format>
          <CustomSkeleton width={formatWidth} />
        </Format>
        <Profession>
          <CustomSkeleton width={professionWidth} />
        </Profession>
        <Experience>
          <CustomSkeleton width={experienceWidth} containerClassName={""} />
        </Experience>
      </JobDetails>

      <JobDetails>
        <Relevance>
          <CustomSkeleton width={220} />
        </Relevance>
        <Salary>
          <CustomSkeleton
            width={salaryWidth}
            containerClassName={"vacancy-item-salary-skeleton"}
          />
        </Salary>
      </JobDetails>

      {hardSkillsSkeletons}

      <ToggleLabel>
        <CustomSkeleton width={160} containerClassName={""} />
      </ToggleLabel>
    </JobCard>
  )
}

const HardSKillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin-top: 0.75rem;
  gap: 0.75rem;
`

export default VacancyItemSkeleton
