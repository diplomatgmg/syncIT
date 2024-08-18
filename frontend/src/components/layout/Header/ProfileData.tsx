import { type ReactElement } from "react"
import { Flex, Text, Tooltip } from "@mantine/core"
import { Circle, CircleCheck, CircleX } from "tabler-icons-react"
import useAuth from "@/store/hooks/useAuth.ts"
import { useGetProfileStatusQuery } from "@/store/api/profileApi.ts"

const ProfileData = (): ReactElement => {
  const { email } = useAuth()
  const { data = undefined } = useGetProfileStatusQuery()

  return (
    <Flex gap={"xs"} align={"center"}>
      <Text>{email}</Text>
      {data === undefined && (
        <Tooltip label="Получение профиля...">
          <Flex>
            <Circle size={24} />
          </Flex>
        </Tooltip>
      )}
      {data?.isCompleted && (
        <Tooltip label="Профиль заполнен">
          <Flex>
            <CircleCheck size={24} color={"green"} />
          </Flex>
        </Tooltip>
      )}
      {data?.isCompleted === false && (
        <Tooltip label="Профиль не заполнен">
          <Flex>
            <CircleX size={24} color={"red"} />
          </Flex>
        </Tooltip>
      )}
    </Flex>
  )
}

export default ProfileData
