import { type ReactElement } from "react"
import Vacancy from "@/features/home/components/Vacancy/Vacancy.tsx"
import styled from "styled-components"

const StyledHome = styled.div`
  margin: 2rem 5rem;
  width: 100%;

  @media (max-width: 1200px) {
    width: 100%;
    margin: 2rem 0;
  }
`

const Home = (): ReactElement => {
  return (
    <StyledHome>
      <Vacancy />
    </StyledHome>
  )
}

export default Home
