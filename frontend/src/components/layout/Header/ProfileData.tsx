import { type ReactElement, useEffect } from "react"
import {
  Button,
  Flex,
  Loader,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core"
import { Circle, CircleCheck, CircleX } from "tabler-icons-react"
import useAuth from "@/store/hooks/useAuth.ts"
import {
  useGetProfileStatusQuery,
  useSetProfileDataMutation,
} from "@/store/api/profileApi.ts"
import useProfile from "@/store/hooks/useProfile.ts"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import { setProfileIsChanged } from "@/store/slice/profileSlice.ts"
import { popup } from "@/utils/popup/popup.tsx"

const ProfileData = (): ReactElement => {
  const { email } = useAuth()
  const { data = undefined } = useGetProfileStatusQuery()
  const profile = useProfile()
  const [updateProfile, { isLoading, isSuccess }] = useSetProfileDataMutation()
  const dispatch = useAppDispatch()
  const { colors } = useMantineTheme()

  useEffect(() => {
    if (isSuccess && !profile.isChanged) {
      popup.success("Профиль успешно сохранен!")
    }
  }, [isSuccess, profile.isChanged])

  const handleSaveProfile = async () => {
    try {
      await updateProfile(profile).unwrap()
      dispatch(setProfileIsChanged(false))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Flex gap={"xs"} align={"center"}>
      {profile.isChanged && (
        <Button
          onClick={handleSaveProfile}
          w={"10rem"}
          mr={"xs"}
          loaderProps={{
            children: (
              <Flex align={"center"} gap={"xs"} pb={3}>
                <Loader size={"xs"} color={colors.blue[5]} />
                <span style={{ color: colors.blue[1] }}>Сохраняем...</span>
              </Flex>
            ),
          }}
          loading={isLoading}>
          Сохранить
        </Button>
      )}

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
