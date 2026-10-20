import { ArrowRight, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Reveal, Shell } from "@/components/shell"
import { GIFTS } from "@/content"
import { savedName } from "@/lib/signup"

const NEXT = (
  <a href="/academy" className={cn(buttonVariants({ size: "cta" }))}>
    Вэбинарт суудлаа баталгаажуулах <ArrowRight />
  </a>
)

export function GiftPage() {
  const name = savedName()
  return (
    <Shell>
      <section className="section pt-10 md:pt-16">
        <div className="wrap">
          <Reveal>
            <Badge variant="pill">Бэлэг тань бэлэн</Badge>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="h-hero mt-6 max-w-[16ch]">
              {name ? `${name}, энэ` : "Энэ"} таны <span className="text-primary">бэлэг</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead mt-6 max-w-[44ch]">
              Видеог үзээд skill-ээ татаарай. Баасан гарагийн вэбинарт суудлаа одоо баталгаажуулаарай.
            </p>
          </Reveal>
          <Reveal delay={180} className="mt-8">
            {NEXT}
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {GIFTS.map((g, i) => (
              <Reveal key={g.title} delay={i * 80}>
                <Card className="gap-5 rounded-[20px] border p-3 ring-0 sm:p-4">
                  <div className="aspect-video overflow-hidden rounded-[16px] bg-ink shadow-[0_30px_70px_rgba(17,17,17,0.18)]">
                    {g.youtubeId ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${g.youtubeId}?rel=0`}
                        title={g.title}
                        loading="lazy"
                        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                        className="size-full"
                      />
                    ) : (
                      <div className="grid size-full place-items-center text-[14px] text-muted-dark">Видео удахгүй нэмэгдэнэ</div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 px-2 pb-2">
                    <div>
                      <p className="eyebrow">Бэлэг 0{i + 1}</p>
                      <h2 className="mt-1 text-[22px] leading-tight font-extrabold tracking-[-0.03em]">{g.title}</h2>
                    </div>
                    {g.file ? (
                      <a href={g.file} download className={cn(buttonVariants({ variant: "ink", size: "lg" }), "h-11 rounded-full px-5 text-[15px] font-semibold")}>
                        <Download /> Skill татах
                      </a>
                    ) : (
                      <Button variant="ink" size="lg" disabled className="h-11 rounded-full px-5 text-[15px] font-semibold">
                        Удахгүй нэмэгдэнэ
                      </Button>
                    )}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">{NEXT}</Reveal>
        </div>
      </section>
    </Shell>
  )
}
