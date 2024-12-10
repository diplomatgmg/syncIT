import { toast, ToastOptions, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./styles.css"
import { ReactElement } from "react"

const baseConfig: ToastOptions = {
  position: "bottom-left",
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: false,
  theme: "dark",
  transition: Zoom,
  closeButton: false,
}

export const popup = {
  error: (msg: string | ReactElement) => {
    toast.error(msg, { ...baseConfig })
  },
  warn: (msg: string | ReactElement) => {
    toast.warn(msg, { ...baseConfig })
  },
  success: (msg: string | ReactElement) => {
    toast.success(msg, { ...baseConfig })
  },
}
