import { type ReactElement } from "react"
import { Flex, Text, Tooltip, useMantineTheme } from "@mantine/core"
import { Circle, CircleCheck, CircleX } from "tabler-icons-react"
import useAuth from "@/store/hooks/useAuth.ts"
import { useGetProfileStatusQuery } from "@/store/api/profileApi.ts"

const ProfileData = (): ReactElement => {
  const { email } = useAuth()
  const { data = undefined } = useGetProfileStatusQuery()
  const { colors } = useMantineTheme()

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
            <CircleCheck size={24} color={colors.green[9]} />
          </Flex>
        </Tooltip>
      )}
      {data?.isCompleted === false && (
        <Tooltip
          label="Заполните профиль для получения новых вакансий"
          style={{ maxWidth: "240px", textWrap: "wrap", textAlign: "center" }}>
          <Flex>
            <CircleX size={24} color={colors.red[9]} />
          </Flex>
        </Tooltip>
      )}
    </Flex>
  )
}

export default ProfileData
