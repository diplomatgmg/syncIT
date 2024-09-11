import { type ReactElement, useCallback, useEffect, useReducer } from "react"
import { useGetVacanciesQuery } from "@/store/api/vacancyApi.ts"
import VacancyList from "@/features/home/components/Vacancy/VacancyList.tsx"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"
import InfiniteScroll from "react-infinite-scroll-component"
import { UserVacancyResult } from "@/types/vacancyTypes.ts"
import { Flex, Text } from "@mantine/core"

const Vacancy = (): ReactElement => {
  const [page, setPage] = useReducer((state) => state + 1, 1)
  const [vacancies, setVacancies] = useReducer(
    (state: UserVacancyResult[], action: UserVacancyResult[]) => [
      ...state,
      ...action,
    ],
    []
  )
  const { data, isLoading, isFetching } = useGetVacanciesQuery({ page })

  useEffect(() => {
    if (data?.results) {
      setVacancies(data.results)
    }
  }, [data])

  const loadMoreVacancies = useCallback(() => {
    if (!isFetching && data?.next) {
      setPage()
    }
  }, [isFetching, data?.next])

  if (!data && !isLoading) {
    return <h1 style={{ textAlign: "center" }}>Вакансий нет.</h1>
  }

  return (
    <Flex direction={"column"} gap={"lg"}>
      <Flex justify={"center"}>
        {isLoading && (
          <CustomSkeleton
            width={"15rem"}
            height={30}
            style={{ margin: "0 auto" }}
          />
        )}
        {!isLoading && <Text fz={"xl"}>Всего - {data!.count} вакансий</Text>}
      </Flex>
      <InfiniteScroll
        scrollThreshold={0.5}
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
