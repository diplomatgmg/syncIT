import { type ReactElement } from "react"
import Vacancy from "@/features/home/components/Vacancy/Vacancy.tsx"
import styled from "styled-components"

const StyledHome = styled.div`
  margin: 2rem 5rem;

  @media (max-width: 1200px) {
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
