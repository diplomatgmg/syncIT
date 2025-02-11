import { toast, ToastOptions, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./styles.css"
import { ReactElement } from "react"

const baseConfig: ToastOptions = {
  position: "bottom-left",
  autoClose: 4000,
  closeOnClick: true,
  pauseOnHover: false,
  theme: "dark",
  transition: Zoom,
  closeButton: false,
}

export const popup = {
  error: (msg: string | ReactElement, config?: ToastOptions) => {
    toast.error(msg, { ...baseConfig, ...config })
  },
  warn: (msg: string | ReactElement, config?: ToastOptions) => {
    toast.warn(msg, { ...baseConfig, ...config })
  },
  success: (msg: string | ReactElement, config?: ToastOptions) => {
    toast.success(msg, { ...baseConfig, ...config })
  },
}
