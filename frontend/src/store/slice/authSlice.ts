import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RegisterResponse, TokenResponse } from "../api/authApi.ts"

interface AuthState {
  isAuthenticated: boolean
  access: string | null
  refresh: string | null
  email: string | null
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("accessToken") !== null,
  access: localStorage.getItem("accessToken"),
  refresh: localStorage.getItem("refreshToken"),
  email: localStorage.getItem("email"),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<TokenResponse>) => {
      const { access, refresh } = action.payload
      state.isAuthenticated = true
      state.access = access
      state.refresh = refresh
      localStorage.setItem("accessToken", access)
      localStorage.setItem("refreshToken", refresh)
    },
    setEmail: (state, action: PayloadAction<RegisterResponse>) => {
      const { email } = action.payload
      state.email = email
      localStorage.setItem("email", email)
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.access = null
      state.refresh = null
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    },
  },
})

export const { setTokens, setEmail, logout } = authSlice.actions
export default authSlice.reducer
