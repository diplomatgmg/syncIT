import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  isAuthenticated: boolean
  access: string | null
  refresh: string | null
}

interface TokenResponse {
  access: string
  refresh: string
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("accessToken") !== null,
  access: localStorage.getItem("accessToken"),
  refresh: localStorage.getItem("refreshToken"),
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
    logout: (state) => {
      state.isAuthenticated = false
      state.access = null
      state.refresh = null
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    },
  },
})

export const { setTokens, logout } = authSlice.actions
export default authSlice.reducer
