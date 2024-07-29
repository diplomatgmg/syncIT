import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "@/store/slice/authSlice.ts"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"

const useLogout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return useCallback(() => {
    dispatch(logout())
    navigate(0) // Перезагружает текущую страницу
  }, [dispatch, navigate])
}

export default useLogout
