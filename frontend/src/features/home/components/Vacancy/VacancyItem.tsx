import { FC, type ReactElement } from "react"
import { VacancyPreview } from "@/types/vacancyTypes.ts"
import { useUpdateVacancyViewStatusMutation } from "@/store/api/vacancyApi.ts"

interface VacancyItemProps {
  isViewed: boolean
  suitability: number
  vacancy: VacancyPreview
}

const VacancyItem: FC<VacancyItemProps> = ({
  isViewed,
  suitability,
  vacancy,
}): ReactElement => {
  const [updateVacancyViewStatus] = useUpdateVacancyViewStatusMutation()

  const handleOpenVacancySource = async (vacancy_id: number) => {
    try {
      await updateVacancyViewStatus({ vacancy: vacancy_id }).unwrap()
    } catch (err) {
      console.error("Ошибка входа: ", err)
    }
  }

  return (
    <li>
      <h3>
        <b>{vacancy.name}</b> - ({vacancy.company.name})
      </h3>
      <p>
        Подходит на {suitability}% | Просмотрена - {String(isViewed)}
      </p>
      <p>{vacancy.hardSkills.map(({ name }) => name).join(", ")}</p>
      <a
        href={vacancy.url}
        target="_blank"
        onClick={() => handleOpenVacancySource(vacancy.id)}
        rel="noreferrer">
        Открыть источник
      </a>
      <span> | </span>
      <a href="#" onClick={() => handleOpenVacancySource(vacancy.id)}>
        Подробнее
      </a>
    </li>
  )
}

export default VacancyItem
