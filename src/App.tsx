import { ReactLenis } from "lenis/react"
import { SignupPage } from "@/pages/signup"
import { GiftPage } from "@/pages/gift"
import { AcademyPage } from "@/pages/academy"
import { TelegramPage } from "@/pages/telegram"
import { savedName } from "@/lib/signup"

const PAGES = { "/": SignupPage, "/gift": GiftPage, "/academy": AcademyPage, "/telegram": TelegramPage }
const path = location.pathname.replace(/\/+$/, "") || "/"

// Soft gate: the gift page sends people who never signed up back to the form.
// Skipped when the browser blocks storage (savedName() === null) so real sign-ups never loop.
if (path === "/gift" && savedName() === "") location.replace("/")

export default function App() {
  const Page = PAGES[path as keyof typeof PAGES] ?? SignupPage
  return (
    <>
      <ReactLenis root options={{ anchors: { offset: -88 } }} />
      <Page />
    </>
  )
}
