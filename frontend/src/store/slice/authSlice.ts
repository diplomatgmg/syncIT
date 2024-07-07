import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  LoginResponse,
  RegisterResponse,
  TokenRefreshResponse,
} from "@/types/authTypes.ts"

interface AuthState {
  isAuthenticated: boolean
  email: string | null
  token: {
    access: string | null
    refresh: string | null
  }
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("accessToken") !== null,
  email: localStorage.getItem("email"),
  token: {
    access: localStorage.getItem("accessToken"),
    refresh: localStorage.getItem("refreshToken"),
  },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<LoginResponse | TokenRefreshResponse>
    ) => {
      const { token } = action.payload
      state.isAuthenticated = true
      state.token.access = token.access
      state.token.refresh = token.refresh
      localStorage.setItem("accessToken", token.access)
      localStorage.setItem("refreshToken", token.refresh)
    },
    setEmail: (
      state,
      action: PayloadAction<RegisterResponse | LoginResponse>
    ) => {
      const { email } = action.payload
      state.email = email
      localStorage.setItem("email", email)
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.email = null
      state.token.access = null
      state.token.refresh = null
      localStorage.removeItem("email")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    },
  },
})

export const { setTokens, setEmail, logout } = authSlice.actions
export default authSlice.reducer
