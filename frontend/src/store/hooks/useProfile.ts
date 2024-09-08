import { RootState } from "@/store/store.ts"
import useAppSelector from "@/store/hooks/useAppSelector.ts"

const useProfile = (): RootState["profile"] => {
  return useAppSelector((state: RootState) => state.profile)
}

export default useProfile
