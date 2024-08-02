import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { popup } from "@/utils/popup/popup.tsx"

const usePopupHandler = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state?.fromRegister) {
      popup.success("Регистрация прошла успешно! Теперь вы можете войти")
      navigate(location.pathname, { replace: true, state: {} })
    } else if (location.state?.fromProtectedRoute) {
      popup.error("Необходимо авторизоваться!")
    } else if (location.state?.fromLogin) {
      popup.success("Вы успешно авторизованы!")
      navigate(location.pathname, { replace: true, state: {} })
    } else if (location.state?.fromLogout) {
      popup.success("Вы успешно вышли!")
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.pathname, location.state, navigate])
}

export default usePopupHandler
