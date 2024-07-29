import { FC, type ReactElement } from "react"
import { UserVacancyPreview } from "@/types/vacancyTypes.ts"
import VacancyItem from "@/features/home/components/Vacancy/VacancyItem.tsx"

interface VacancyListProps {
  vacancies: UserVacancyPreview[]
}

const VacancyList: FC<VacancyListProps> = ({ vacancies }): ReactElement => {
  return (
    <div>
      <h3>Best vacancies:</h3>
      <ul>
        {vacancies.map((vacancy) => (
          <VacancyItem
            key={vacancy.id}
            vacancy={vacancy.vacancy}
            suitability={vacancy.suitability}
            isViewed={vacancy.isViewed}
          />
        ))}
      </ul>
    </div>
  )
}

export default VacancyList
