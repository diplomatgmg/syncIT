import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "@/store/slice/authSlice.ts"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import routes from "@/routes/routes.tsx"

const useLogout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return useCallback(() => {
    dispatch(logout())
    navigate(routes.login.path)
  }, [dispatch, navigate])
}

export default useLogout
