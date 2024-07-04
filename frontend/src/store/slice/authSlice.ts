import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RegisterResponse, LoginResponse } from "../api/authApi.ts"

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
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      const { email, token } = action.payload
      state.isAuthenticated = true
      state.email = email
      state.token = token
      localStorage.setItem("email", email)
      localStorage.setItem("accessToken", token.access)
      localStorage.setItem("refreshToken", token.refresh)
    },
    setEmail: (state, action: PayloadAction<RegisterResponse>) => {
      const { email } = action.payload
      state.email = email
      localStorage.setItem("email", email)
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token.access = null
      state.token.refresh = null
      localStorage.removeItem("email")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      window.location.reload() // TODO мб можно лучше сделать
    },
  },
})

export const { setCredentials, setEmail, logout } = authSlice.actions
export default authSlice.reducer
