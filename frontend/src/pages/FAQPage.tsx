import { type ReactElement } from "react"
import CommonPage from "@/components/layout/CommonPage.tsx"

const FAQPage = (): ReactElement => {
  return (
    <CommonPage>
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}>
        Скоро будет...
      </h2>
    </CommonPage>
  )
}

export default FAQPage
