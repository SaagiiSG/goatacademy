import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Reveal, Shell } from "@/components/shell"
import { SKOOL_URL } from "@/content"

const INSIDE = [
  ["Бизнесийн суурь", "10 хичээл"],
  ["Meta Ads Hack", "5 хичээл"],
  ["Content System", "13 хичээл"],
  ["AI Mastery", "Claude Code-оор бизнесээ ажиллуулах"],
  ["GOAT Vault", "Нэмэлт курсууд"],
  ["AI Agents", "Шинээр нэмэгдэж байна"],
  ["Бямба, Ням гарагийн workshop", "Энэ амралтын өдөр, live"],
]

const JOIN_LABEL = "GOAT Academy-д нэгдэх"

export function AcademyPage() {
  return (
    <Shell>
      <section className="section pt-10 md:pt-16">
        <div className="wrap">
          <Reveal>
            <Badge variant="pill">Вэбинараас өмнө</Badge>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="h-hero mt-6 max-w-[18ch]">
              Бизнесээ <span className="text-primary">AI-аар</span> өсгөх бүх хичээл нэг дор
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead mt-6 max-w-[48ch]">
              GOAT Academy бол Одкогийн Skool community. Бямба гарагаас өмнө нэгдвэл энэ амралтын өдрийн 2 workshop-д орно.
            </p>
          </Reveal>

          <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <Reveal>
              <ol className="border-t">
                {INSIDE.map(([title, meta], i) => (
                  <li key={title} className="flex items-baseline gap-5 border-b py-5">
                    <span className="num-outline w-12 shrink-0 text-[36px]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <span className="text-[19px] font-extrabold tracking-[-0.02em]">{title}</span>
                      <span className="text-[14px] font-medium text-muted-foreground">{meta}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={100} className="lg:sticky lg:top-24">
              <Card className="gap-0 rounded-[20px] p-7 shadow-[0_30px_70px_rgba(17,17,17,0.08)] ring-0 sm:p-8">
                <p className="eyebrow">GOAT Academy</p>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="text-[64px] leading-none font-extrabold tracking-[-0.05em]">$33</span>
                  <span className="text-[17px] font-semibold text-muted-foreground">/ сар</span>
                </p>
                <div className="mt-6 rounded-[14px] border border-orange-line bg-orange-tint p-4 text-[14.5px] leading-relaxed text-text-2">
                  Хүссэн үедээ цуцална. Гишүүд нэмэгдэхийн хэрээр үнэ өснө.
                </div>
                {SKOOL_URL ? (
                  <a href={SKOOL_URL} target="_blank" rel="noopener" className={cn(buttonVariants({ size: "cta" }), "mt-6 w-full")}>
                    {JOIN_LABEL} <ArrowUpRight />
                  </a>
                ) : (
                  <Button size="cta" disabled className="mt-6 w-full">
                    {JOIN_LABEL}
                  </Button>
                )}
              </Card>
            </Reveal>
          </div>

          <p className="mt-16 text-center">
            <a href="/telegram" className="text-[13px] font-medium text-muted-foreground underline underline-offset-4">
              Алгасаад Telegram группын линк авах
            </a>
          </p>
        </div>
      </section>
    </Shell>
  )
}
