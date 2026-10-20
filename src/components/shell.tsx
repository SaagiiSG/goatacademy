import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { WEBINAR_START } from "@/content"

export function Shell({ children, cta = false }: { children: ReactNode; cta?: boolean }) {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-transparent bg-paper/85 backdrop-blur-md">
        <div className="wrap flex h-16 items-center justify-between">
          <a href="/" className="text-[17px] font-extrabold tracking-[-0.03em] hover:text-ink">
            GOAT Academy
          </a>
          {cta && (
            <a href="#signup" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-4 font-semibold")}>
              Үнэгүй авах
            </a>
          )}
        </div>
      </header>
      <main>{children}</main>
      <footer className="wrap flex flex-wrap justify-between gap-2 py-10 text-[13px] font-medium text-muted-foreground">
        <span>© 2026 Goat Agent</span>
        <a href="mailto:hello@goatai.mn" className="text-muted-foreground">
          hello@goatai.mn
        </a>
      </footer>
    </>
  )
}

export function Reveal({ children, delay = 0, className, id }: { children: ReactNode; delay?: number; className?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current!
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        el.dataset.in = ""
        io.disconnect()
      },
      { rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} id={id} className={cn("reveal", className)} style={{ "--delay": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  )
}

const UNITS = ["өдөр", "цаг", "мин", "сек"]

export function Countdown({ dark = false }: { dark?: boolean }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const ms = WEBINAR_START.getTime() - now
  if (ms <= 0) return null
  const parts = [ms / 864e5, (ms / 36e5) % 24, (ms / 6e4) % 60, (ms / 1e3) % 60].map(Math.floor)
  return (
    <div role="timer" aria-label="Вэбинар эхлэх хүртэл">
      <p className={cn("eyebrow mb-3", dark && "text-orange-dark")}>Вэбинар эхлэхэд</p>
      <div className="flex gap-2">
        {parts.map((n, i) => (
          <div
            key={UNITS[i]}
            className={cn(
              "min-w-[62px] rounded-[14px] border px-3 py-2 text-center",
              dark ? "border-white/10 bg-white/[0.04]" : "bg-card"
            )}
          >
            <div className="text-[26px] leading-tight font-extrabold tracking-tight tabular-nums">{String(n).padStart(2, "0")}</div>
            <div className={cn("text-[11.5px] font-medium", dark ? "text-muted-dark" : "text-muted-foreground")}>{UNITS[i]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
