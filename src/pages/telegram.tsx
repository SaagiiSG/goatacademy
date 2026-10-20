import { CalendarPlus, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Reveal, Shell } from "@/components/shell"
import { TELEGRAM_URL } from "@/content"

// shortcut: event length assumed 2 hours (12:00–14:00 UTC); change both links if Odko says otherwise
const GOOGLE_CAL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" + encodeURIComponent("GOAT Academy үнэгүй вэбинар") +
  "&dates=20261023T120000Z/20261023T140000Z" +
  "&details=" + encodeURIComponent(`Zoom линк Telegram группт ирнэ: ${TELEGRAM_URL}`)

// iPhone and Mac open .ics straight into Calendar; everyone else gets Google Calendar.
const CAL_HREF = /iPhone|iPad|Macintosh/.test(navigator.userAgent) ? "/webinar.ics" : GOOGLE_CAL

export function TelegramPage() {
  return (
    <Shell>
      <section className="grid min-h-[calc(100svh-4rem)] place-items-center border-b py-16">
        <Reveal className="wrap flex max-w-3xl flex-col items-center gap-6 text-center">
          <Badge variant="pill">Сүүлийн алхам</Badge>
          <h1 className="h-hero">
            Zoom линк <span className="text-primary">Telegram</span> группт ирнэ
          </h1>
          <p className="lead max-w-[42ch]">
            Баасан, 10-р сарын 23, 20:00, Улаанбаатарын цагаар. Одко вэбинарын линк, сануулгыг энэ группт нийтэлнэ.
          </p>
          <a href={TELEGRAM_URL} className={cn(buttonVariants({ size: "cta" }), "mt-2")}>
            <Send /> Telegram группт нэгдэх
          </a>
          <a href={CAL_HREF} target="_blank" rel="noopener" className={cn(buttonVariants({ variant: "ink", size: "lg" }), "h-11 rounded-full px-5 text-[15px] font-semibold")}>
            <CalendarPlus /> Календарьт нэмэх
          </a>
          <p className="max-w-[40ch] text-[13.5px] text-muted-foreground">
            Telegram байхгүй юу? App Store эсвэл Play Store-оос татаад энэ хуудас руу буцаж ирээрэй.
          </p>
        </Reveal>
      </section>
    </Shell>
  )
}
