import { type ReactElement } from "react"
import useProfile from "@/store/hooks/useProfile.ts"
import { useSetProfileDataMutation } from "@/store/api/profileApi.ts"
import { popup } from "@/utils/popup/popup.tsx"
import { setProfileIsChanged } from "@/store/slice/profileSlice.ts"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import { Button, Flex, Loader, useMantineTheme } from "@mantine/core"

const SaveProfileButton = (): ReactElement => {
  const profile = useProfile()
  const [updateProfile, { isLoading }] = useSetProfileDataMutation()
  const dispatch = useAppDispatch()
  const { colors } = useMantineTheme()

  const handleSaveProfile = async () => {
    try {
      await updateProfile(profile).unwrap()
      dispatch(setProfileIsChanged(false))
      popup.success("Профиль успешно сохранен!")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Button
      onClick={handleSaveProfile}
      color={colors.green[9]}
      w={"9rem"}
      mr={"xs"}
      loaderProps={{
        children: (
          <Flex align={"center"} gap={"xs"} pb={3}>
            <Loader size={"xs"} color={colors.green[5]} />
            <span>Сохраняем...</span>
          </Flex>
        ),
      }}
      loading={isLoading}>
      Сохранить
    </Button>
  )
}

export default SaveProfileButton
