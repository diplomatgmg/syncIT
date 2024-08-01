import { type ReactElement } from "react"
import Vacancy from "@/features/home/components/Vacancy/Vacancy.tsx"
import styled from "styled-components"

const StyledHome = styled.div`
  margin-top: 3rem;
`

const Home = (): ReactElement => {
  return (
    <StyledHome>
      <Vacancy />
    </StyledHome>
  )
}

export default Home
