import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Хук для установки title документа с учетом префикса "syncIT | <title>"
export const useSetTitle = (title: string) => {
  const location = useLocation()

  useEffect(() => {
    document.title = `syncIT | ${title}`
  }, [location, title])
}
