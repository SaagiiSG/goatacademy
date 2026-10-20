// Mongolian 8-digit numbers (with or without +976), or any international number written with "+".
export function normalizePhone(raw: string): string | null {
  const v = raw.replace(/[\s\-().]/g, "")
  if (/^(\+?976)?\d{8}$/.test(v)) return v.slice(-8)
  if (/^\+\d{8,15}$/.test(v)) return v
  return null
}

const NAME_KEY = "goat_name"

// null = the browser blocks storage, so we can't tell whether they signed up.
export function savedName(): string | null {
  try {
    return localStorage.getItem(NAME_KEY) ?? ""
  } catch {
    return null
  }
}

export function saveName(name: string) {
  try {
    localStorage.setItem(NAME_KEY, name)
  } catch {
    // private mode: page 2 just greets without the name
  }
}

// Resolves when the row reached Google (or Google is slow), throws only when the device is offline.
export async function sendSignup(data: { name: string; phone: string; email: string }) {
  const url = import.meta.env.VITE_SHEET_URL
  if (!url) {
    console.warn("VITE_SHEET_URL is not set, sign-up not saved")
    return
  }
  const body = new URLSearchParams({ ...data, source: location.search })
  try {
    // no-cors: Apps Script can't answer a CORS preflight; the row is still written.
    await fetch(url, { method: "POST", body, mode: "no-cors", signal: AbortSignal.timeout(10000) })
  } catch (e) {
    // shortcut: on a timeout we let them through; the row usually lands anyway, check the Sheet if counts look low
    if (e instanceof DOMException && e.name === "TimeoutError") return
    throw e
  }
}
