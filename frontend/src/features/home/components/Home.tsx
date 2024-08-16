import { type ReactElement } from "react"
import Vacancy from "@/features/home/components/Vacancy/Vacancy.tsx"
import { Flex } from "@mantine/core"

const Home = (): ReactElement => {
  return (
    <Flex direction={"column"} mt={"xl"}>
      <Vacancy />
    </Flex>
  )
}

export default Home
