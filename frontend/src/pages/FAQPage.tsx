import { type ReactElement } from "react"
import CommonPage from "@/components/layout/CommonPage.tsx"
import Faq from "@/features/faq/components/Faq.tsx"

const FAQPage = (): ReactElement => {
  return (
    <CommonPage title={"FAQ"}>
      <Faq />
    </CommonPage>
  )
}

export default FAQPage
