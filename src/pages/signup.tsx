import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Countdown, Reveal, Shell } from "@/components/shell"
import { GrainShader } from "@/components/grain-shader"
import { SignupForm } from "@/components/signup-form"
import { CLIENTS, GIFTS } from "@/content"

const CTA = (
  <a href="#signup" className={cn(buttonVariants({ size: "cta" }))}>
    Үнэгүй авах <ArrowRight />
  </a>
)

const OFFER = [
  ...GIFTS.map((g) => [g.title, g.blurb]),
  ["Баасан гарагийн вэбинар", "AI агентуудаар бизнесээ хэрхэн удирдахыг Одко шууд харуулна."],
]

const DETAILS = [
  ["Огноо", "10-р сарын 23, Баасан гараг"],
  ["Цаг", "20:00, Улаанбаатарын цагаар"],
  ["Хаана", "Zoom, линк нь Telegram группт ирнэ"],
  ["Үнэ", "Үнэгүй"],
]

const POINTS = [
  "Нэг толгой бот бусад ботуудаа удирдаад нэг хэлтсийн ажлыг хэрхэн хийдэг вэ.",
  "AI-д эхлээд аль ажлаа өгөх вэ.",
  "Шууд демо.",
]

const CASES = [
  { name: "UNU Mongol Ger", what: "Монгол гэрийн үйлдвэр", from: "4", to: "1,341", unit: "мессеж / сар", text: "2 сарын дотор сарын мессеж 4-өөс 1,341 болсон." },
  { name: "Erkhet Travel", what: "Аяллын компани", from: "212К", to: "778К", unit: "хандалт, мессеж +87%", text: "1 сарын дотор хандалт 212К-аас 778К болж, мессеж 87%-иар өссөн." },
]

const FAQ = [
  ["Үнэхээр үнэгүй юу?", "Тийм. Skill, видео заавар, вэбинар гурвуулаа үнэгүй."],
  ["Claude ашиглаж байгаагүй бол яах вэ?", "Видео заавар суулгахаас эхлээд алхам алхмаар харуулна."],
  ["Утасны дугаараа юунд ашиглах вэ?", "Вэбинарын сануулга явуулахад л ашиглана."],
]

export function SignupPage() {
  return (
    <Shell cta>
      {/* Hero */}
      <section className="section pt-8 md:pt-14">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Reveal>
              <Badge variant="pill">Үнэгүй · 2 skill + вэбинар</Badge>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="h-hero">
                Claude-аар видео эдит, постер хийх 2&nbsp;skill + <span className="text-primary">үнэгүй вэбинар</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="lead max-w-[40ch]">
                Бэлэн skill файл, хэрхэн ашиглахыг харуулсан видео заавартай. Вэбинар Баасан гарагт, 20:00 цагт Zoom‑оор болно.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <Countdown />
            </Reveal>
          </div>
          <Reveal delay={150} id="signup" className="scroll-mt-24">
            <SignupForm />
          </Reveal>
        </div>
      </section>

      {/* Proof */}
      <section className="overflow-hidden border-b py-10">
        <p className="wrap eyebrow mb-5">Одкогийн багтай ажилласан бизнесүүд</p>
        <div className="marquee flex w-max gap-3 motion-reduce:w-auto motion-reduce:px-5">
          {[...CLIENTS, ...CLIENTS].map(([name, what], i) => (
            <div
              key={i}
              aria-hidden={i >= CLIENTS.length || undefined}
              className={cn("flex shrink-0 items-center gap-3 rounded-[14px] border bg-card py-2.5 pr-5 pl-2.5", i >= CLIENTS.length && "motion-reduce:hidden")}
            >
              <span className="grid size-11 place-items-center rounded-full bg-ink text-[15px] font-bold text-white">{name[0]}</span>
              <span>
                <span className="block text-[14px] font-bold">{name}</span>
                <span className="block text-[12.5px] text-muted-foreground">{what}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section">
              Хоёр бэлэг, нэг <span className="text-primary">вэбинар</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {OFFER.map(([title, blurb], i) => (
              <Reveal key={title} delay={i * 70} className="h-full">
                <Card className="h-full gap-5 rounded-[20px] p-7 ring-0 border">
                  <span className="num-outline text-[64px]">0{i + 1}</span>
                  <h3 className="text-[24px] leading-tight font-extrabold tracking-[-0.03em]">{title}</h3>
                  <p className="text-[15.5px] leading-relaxed text-text-2">{blurb}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">{CTA}</Reveal>
        </div>
      </section>

      {/* Webinar */}
      <section
        className="on-dark relative overflow-hidden text-white"
        style={{ background: "radial-gradient(60% 70% at 85% 10%, rgba(216,67,30,0.35), transparent 70%), #111" }}
      >
        <GrainShader className="absolute inset-0 size-full" />
        <div className="wrap relative grid gap-12 py-[clamp(64px,9vw,120px)] lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-orange-dark">Үнэгүй вэбинар</p>
              <h2 className="h-section mt-4">
                Бизнесээ AI-аар <span className="text-primary">удирдах</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="lead mt-6 max-w-[46ch] text-muted-dark">
                Пост бичих, зар тавих, мессежид хариулах гээд л өдөр дуусдаг уу? Тэгвэл бизнес тань таныг удирдаж байна. Баасан гарагт Одко эдгээр ажлыг AI агентуудад хэрхэн өгдгийг шууд харуулна.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <ol className="mt-10 flex flex-col">
                {POINTS.map((p, i) => (
                  <li key={p} className="flex items-baseline gap-5 border-t border-white/10 py-5">
                    <span className="num-outline text-[40px]">0{i + 1}</span>
                    <span className="text-[17px] leading-snug text-white/90">{p}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="flex flex-col gap-7 rounded-[20px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-8">
              <dl className="flex flex-col">
                {DETAILS.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-white/10 py-3.5 last:border-0">
                    <dt className="text-[13.5px] font-medium text-muted-dark">{k}</dt>
                    <dd className="text-right text-[15px] font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <Countdown dark />
              {CTA}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Host */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Вэбинарыг хөтлөх</p>
            <div className="mt-6 flex items-center gap-5">
              {/* СОЛИХ: Odko's photo, 240px JPEG in public/img/ */}
              <span className="grid size-[84px] shrink-0 place-items-center rounded-full bg-ink text-[32px] font-extrabold text-white ring-[3px] ring-white">О</span>
              <div>
                <h2 className="h-card">Одко</h2>
                <p className="mt-1 text-[15px] text-muted-foreground">Goat Agent-ийн үүсгэн байгуулагч</p>
              </div>
            </div>
            <p className="lead mt-8 max-w-[38ch]">
              Одкогийн баг Монголын бизнесүүдэд <span className="font-semibold text-ink">анхаарлыг орлого</span> болгодог систем суулгадаг.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {CASES.map((c, i) => (
              <Reveal key={c.name} delay={i * 80} className="h-full">
                <Card className="h-full gap-0 rounded-[4px] p-6 ring-0 border">
                  <div className="border-b-2 border-ink pb-3">
                    <p className="text-[17px] font-extrabold">{c.name}</p>
                    <p className="text-[13px] text-muted-foreground">{c.what}</p>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-text-2">{c.text}</p>
                  <div className="mt-auto flex items-baseline gap-3 pt-8">
                    <span className="text-[22px] font-bold text-muted-foreground tabular-nums">{c.from}</span>
                    <ArrowRight className="size-5 self-center text-primary" />
                    <span className="text-[40px] leading-none font-extrabold tracking-[-0.04em] tabular-nums">{c.to}</span>
                  </div>
                  <p className="mt-1 text-[12.5px] font-medium text-muted-foreground">{c.unit}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <Reveal>
            <h2 className="h-section">
              Түгээмэл <span className="text-primary">асуулт</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Accordion className="border-t">
              {FAQ.map(([q, a]) => (
                <AccordionItem key={q} value={q} className="border-b">
                  <AccordionTrigger className="py-5 text-[17px] font-bold hover:no-underline">{q}</AccordionTrigger>
                  <AccordionContent className="pb-5 text-[15.5px] leading-relaxed text-text-2">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[clamp(64px,9vw,120px)]">
        <Reveal className="wrap flex flex-col items-center gap-6 text-center">
          <h2 className="h-section max-w-[18ch]">
            2 skill, 1 вэбинар. Бүгд <span className="text-primary">үнэгүй</span>.
          </h2>
          {CTA}
          <p className="text-[13.5px] font-medium text-muted-foreground">Баасан, 10-р сарын 23 · 20:00 · Zoom</p>
        </Reveal>
      </section>
    </Shell>
  )
}
