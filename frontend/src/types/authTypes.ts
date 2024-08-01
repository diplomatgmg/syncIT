export interface LoginResponse {
  email: string
  token: {
    access: string
    refresh: string
  }
}

export interface LoginResponseError {
  status: number
  data: {
    detail: string
  }
}

export interface RegisterResponse {
  email: string
}

export interface TokenRefreshResponse {
  token: {
    access: string
    refresh: string
  }
}

export interface RegisterError {
  status: number
  data: {
    email?: string[]
    password?: string[]
  }
}
