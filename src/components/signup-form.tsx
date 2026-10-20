import { useState, type FormEvent } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { normalizePhone, saveName, sendSignup } from "@/lib/signup"

type Errors = Partial<Record<"name" | "phone" | "email" | "form", string>>

const FIELDS = [
  { id: "name", label: "Нэр", type: "text", autoComplete: "given-name", placeholder: "Таны нэр" },
  { id: "phone", label: "Утасны дугаар", type: "tel", autoComplete: "tel", placeholder: "9911 2233", inputMode: "tel" },
  { id: "email", label: "И-мэйл (заавал биш)", type: "email", autoComplete: "email", placeholder: "name@gmail.com" },
] as const

export function SignupForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [pending, setPending] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get("name") ?? "").trim().slice(0, 80)
    const phone = normalizePhone(String(f.get("phone") ?? ""))
    const email = String(f.get("email") ?? "").trim().slice(0, 120)
    const errs: Errors = {}
    if (!name) errs.name = "Нэрээ бичнэ үү."
    if (!phone) errs.phone = "8 оронтой утасны дугаараа бичнэ үү."
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "И-мэйл хаяг буруу байна."
    setErrors(errs)
    if (Object.keys(errs).length) return

    setPending(true)
    try {
      await sendSignup({ name, phone: phone!, email })
      saveName(name)
      location.assign("/gift")
    } catch {
      setErrors({ form: "Интернэт холболтоо шалгаад дахин оролдоно уу." })
      setPending(false)
    }
  }

  return (
    <Card className="gap-0 rounded-[20px] p-6 shadow-[0_30px_70px_rgba(17,17,17,0.08)] ring-0 sm:p-8">
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
        {FIELDS.map((fld) => (
          <div key={fld.id} className="flex flex-col gap-2">
            <Label htmlFor={fld.id} className="text-[13.5px] font-semibold text-text-2">
              {fld.label}
            </Label>
            <Input
              id={fld.id}
              name={fld.id}
              type={fld.type}
              autoComplete={fld.autoComplete}
              placeholder={fld.placeholder}
              inputMode={"inputMode" in fld ? fld.inputMode : undefined}
              aria-invalid={!!errors[fld.id] || undefined}
              aria-describedby={errors[fld.id] ? `${fld.id}-err` : undefined}
              className="h-12 rounded-xl bg-white px-4 text-base md:text-base"
            />
            {errors[fld.id] && (
              <p id={`${fld.id}-err`} className="text-[13px] font-medium text-destructive">
                {errors[fld.id]}
              </p>
            )}
          </div>
        ))}
        <Button type="submit" size="cta" disabled={pending} className="mt-2 w-full">
          {pending ? "Түр хүлээнэ үү" : "Үнэгүй авах"}
          {!pending && <ArrowRight />}
        </Button>
        {errors.form && (
          <p role="alert" className="text-center text-[13.5px] font-medium text-destructive">
            {errors.form}
          </p>
        )}
        <p className="text-center text-[13px] font-medium text-muted-foreground">Төлбөргүй. 30 секунд.</p>
      </form>
    </Card>
  )
}
