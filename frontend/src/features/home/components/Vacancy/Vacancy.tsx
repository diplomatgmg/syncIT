import { type ReactElement, useCallback, useEffect, useReducer } from "react"
import { useGetVacanciesQuery } from "@/store/api/vacancyApi.ts"
import VacancyList from "@/features/home/components/Vacancy/VacancyList.tsx"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"
import InfiniteScroll from "react-infinite-scroll-component"
import { UserVacancyResult } from "@/types/vacancyTypes.ts"
import { Flex, Text } from "@mantine/core"
import { useGetProfileStatusQuery } from "@/store/api/profileApi.ts"
import declineVacancy from "@/features/home/utils/declineVacancy.ts"

const Vacancy = (): ReactElement => {
  const { data: profileStatus } = useGetProfileStatusQuery()

  const [page, setPage] = useReducer((state) => state + 1, 1)
  const [vacancies, setVacancies] = useReducer(
    (state: UserVacancyResult[], action: UserVacancyResult[]) => [
      ...state,
      ...action,
    ],
    []
  )
  const { data, isLoading, isFetching } = useGetVacanciesQuery({
    page,
  })

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

  if (profileStatus?.isCompleted === false) {
    return (
      <h3 style={{ textAlign: "center", marginTop: "0" }}>
        Заполните профиль <br />
        чтобы увидеть вакансии.
      </h3>
    )
  }

  return (
    <Flex direction={"column"} gap={"lg"}>
      <Flex justify={"center"} h={40}>
        {isLoading && (
          <CustomSkeleton
            width={"15rem"}
            height={30}
            style={{ margin: "0 auto" }}
          />
        )}
        {/*FIXME Изменить. Всего - <total> вакансий. Скрытых - <hidden> вакансий*/}
        {(!isFetching || !isLoading) && !data?.count && profileStatus && (
          <Text fz={"xl"} style={{ textAlign: "center" }} mx={"md"}>
            Не найдено подходящих вакансий. <br />
            Укажите больше навыков в профиле или зайдите позже.
          </Text>
        )}
        {(!isFetching || !isLoading) && data?.count !== 0 && (
          <Flex justify={"center"} align={"center"} mx={"md"} ta={"center"}>
            <Text fz={"xl"}>
              Из {data!.totalVacancies} {declineVacancy(data!.totalVacancies)} в
              базе вам подходят {data!.count}.
            </Text>
          </Flex>
        )}
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
