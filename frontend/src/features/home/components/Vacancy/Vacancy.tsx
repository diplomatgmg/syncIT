import { type ReactElement, useEffect, useState } from "react"
import { useGetVacanciesQuery } from "@/store/api/vacancyApi.ts"
import VacancyList from "@/features/home/components/Vacancy/VacancyList.tsx"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"
import InfiniteScroll from "react-infinite-scroll-component"
import { UserVacancyResult } from "@/types/vacancyTypes.ts"
import { Flex, Text } from "@mantine/core"

const Vacancy = (): ReactElement => {
  const [page, setPage] = useState(1)
  const [vacancies, setVacancies] = useState<UserVacancyResult[]>([])
  const { data, isLoading, isFetching } = useGetVacanciesQuery({ page })

  useEffect(() => {
    if (data?.results) {
      setVacancies((prevVacancies) => [...prevVacancies, ...data.results])
    }
  }, [data])

  const loadMoreVacancies = () => {
    if (!isFetching && data?.next) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  if (!data && !isLoading) {
    return (
      <h1 style={{ textAlign: "center" }}>
        Вакансий нет.
        <br />
        Заполните профиль и немного подождите.
      </h1>
    )
  }

  return (
    <Flex direction={"column"} gap={"xl"}>
      <Flex justify={"center"}>
        {isLoading && (
          <CustomSkeleton width={"15rem"} style={{ margin: "0 auto" }} />
        )}
        {!isLoading && <Text fz={"xl"}>Всего - {data!.count} вакансий</Text>}
      </Flex>
      <InfiniteScroll
        dataLength={vacancies.length * 10}
        next={loadMoreVacancies}
        hasMore={!!data?.next}
        loader={<VacancyList vacancies={vacancies} isLoading={!isLoading} />}>
        <VacancyList vacancies={vacancies} isLoading={isLoading} />
      </InfiniteScroll>
    </Flex>
  )
}

export default Vacancy
