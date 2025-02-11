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
          popup.warn(
            <span>
              <b>Необходимо подтвердить почту!</b>
              <br />
              <span style={{ fontSize: "0.9rem" }}>
                Не забудьте проверить папку <b>спам</b>
              </span>
            </span>,
            {
              autoClose: 10000,
            }
          )
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
          console.log(state.isSuccess, state.isRecentlyActivated)
          if (state.isSuccess) {
            popup.success("Аккаунт активирован! Авторизуйтесь.")
          } else if (state.isError) {
            popup.error("Не удалось активировать аккаунт!")
          } else if (state.isRecentlyActivated) {
            popup.warn("Аккаунт уже активирован! Авторизуйтесь.")
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
