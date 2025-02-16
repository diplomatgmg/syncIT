import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { popup } from "@/utils/popup/popup.tsx"
import useAppSelector from "@/store/hooks/useAppSelector.ts"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import { setIsFirstLogin } from "@/store/slice/authSlice.ts"

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
  const { isAuthenticated, isFirstLogin } = useAppSelector(
    (state) => state.auth
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAuthenticated && isFirstLogin) {
      popup.error(
        <span>
          <b>Обязательно прочитайте FAQ!</b>
        </span>,
        {
          autoClose: 15000,
        }
      )
      dispatch(setIsFirstLogin(false))
    }

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
  }, [location, navigate, dispatch, isAuthenticated, isFirstLogin])
}

export default usePopupHandler
