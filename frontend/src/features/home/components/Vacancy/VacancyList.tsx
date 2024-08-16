import { FC, type ReactElement } from "react"
import { UserVacancyResult } from "@/types/vacancyTypes.ts"
import VacancyItem from "@/features/home/components/Vacancy/VacancyItem.tsx"
import uniqueId from "lodash/uniqueId"
import { Flex, useMantineTheme } from "@mantine/core"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"
import range from "lodash/range"

interface VacancyListProps {
  vacancies: UserVacancyResult[]
  isLoading: boolean
}

const VacancyList: FC<VacancyListProps> = ({
  vacancies,
  isLoading,
}): ReactElement => {
  const { radius } = useMantineTheme()

  return (
    <Flex direction={"column"} align={"center"} gap={"4rem"} m={"md"}>
      {isLoading && (
        <Flex direction={"column"} gap={"4rem"}>
          {range(5).map(() => (
            <CustomSkeleton
              key={uniqueId()}
              height={320}
              width={1200}
              style={{ borderRadius: radius.lg }}
            />
          ))}
        </Flex>
      )}

      {!isLoading &&
        vacancies.map((vacancy) => (
          <VacancyItem
            key={uniqueId()}
            isViewed={vacancy.isViewed}
            vacancy={vacancy.vacancy}
            suitability={vacancy.suitability}
          />
        ))}
    </Flex>
  )
}

export default VacancyList
