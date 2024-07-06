export interface LoginResponse {
  email: string
  token: {
    access: string
    refresh: string
  }
}

export interface RegisterResponse {
  email: string
}
