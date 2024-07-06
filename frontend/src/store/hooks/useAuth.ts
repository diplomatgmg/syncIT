import { RootState } from "@/store/store.ts"
import useAppSelector from "@/store/hooks/useAppSelector.ts"

const useAuth = (): RootState["auth"] => {
  return useAppSelector((state: RootState) => state.auth)
}

export default useAuth
