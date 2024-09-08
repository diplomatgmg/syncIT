import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { popup } from "@/utils/popup/popup.tsx"

type LocationState = {
  fromRegister?: boolean
  fromProtectedRoute?: boolean
  fromLogin?: boolean
  fromLogout?: boolean
  fromActivate?: boolean
  isSuccess?: boolean
  isError?: boolean
}

// После редиректов со state вызывает popup
const usePopupHandler = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const { state, pathname } = location
    if (state as LocationState) {
      switch (true) {
        case state.fromRegister:
          popup.warn("Необходимо подтвердить почту для активации аккаунта!")
          break

        case state.fromProtectedRoute:
          popup.error("Необходимо авторизоваться!")
          break

        case state.fromLogin:
          popup.success("Вы успешно авторизованы!")
          break

        case state.fromLogout:
          popup.success("Вы успешно вышли!")
          break

        case state.fromActivate:
          if (state.isSuccess) {
            popup.success("Аккаунт успешно активирован!")
          } else if (state.isError) {
            popup.error("Не удалось активировать аккаунт!")
          }
          break

        case state.fromProfileSave:
          popup.success("Профиль успешно сохранен!")
          break

        default:
          return
      }

      navigate(pathname, { replace: true, state: {} })
    }
  }, [location, navigate])
}

export default usePopupHandler
