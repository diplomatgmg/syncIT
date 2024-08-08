import { type ReactElement, useEffect, useState } from "react"
import { useGetVacanciesQuery } from "@/store/api/vacancyApi.ts"
import VacancyList from "@/features/home/components/Vacancy/VacancyList.tsx"
import styled from "styled-components"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"
import InfiniteScroll from "react-infinite-scroll-component"
import { UserVacancyResult } from "@/types/vacancyTypes.ts"

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
    <>
      <VacanciesInfoContainer>
        {isLoading && (
          <CustomSkeleton width={"15rem"} style={{ margin: "0 auto" }} />
        )}
        {!isLoading && <span>Всего - {data!.count} вакансий</span>}
      </VacanciesInfoContainer>
      <InfiniteScroll
        dataLength={vacancies.length * 10}
        next={loadMoreVacancies}
        hasMore={!!data?.next}
        loader={<VacancyList vacancies={vacancies} isLoading={!isLoading} />}
        endMessage={
          <p style={{ textAlign: "center" }}>Вакансий больше нет :(</p>
        }>
        <VacancyList vacancies={vacancies} isLoading={isLoading} />
      </InfiniteScroll>
    </>
  )
}

export default Vacancy

const VacanciesInfoContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  white-space: nowrap;
  margin-bottom: 2rem;

  @media (max-width: 720px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`
