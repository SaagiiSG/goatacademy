// GOAT Academy sign-ups → this Google Sheet.
// Setup (on the GOAT Gmail account):
//   1. Create a Google Sheet. Extensions → Apps Script. Paste this file. Save.
//   2. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone.
//   3. Copy the Web app URL into Vercel as VITE_SHEET_URL, then redeploy the site.

const SHEET = 'Бүртгэл'

function doPost(e) {
  const p = e.parameter || {}
  // Cap length, and stop Sheets reading "+976..." or "=..." as a formula.
  const clean = (v) => String(v || '').slice(0, 200).replace(/^[=+\-@]/, "'$&")
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const sh = ss.getSheetByName(SHEET) || ss.insertSheet(SHEET)
    if (sh.getLastRow() === 0) sh.appendRow(['Огноо', 'Нэр', 'Утас', 'И-мэйл', 'Хаанаас'])
    sh.appendRow([new Date(), clean(p.name), clean(p.phone), clean(p.email), clean(p.source)])
  } finally {
    lock.releaseLock()
  }
  return ContentService.createTextOutput('ok')
}
