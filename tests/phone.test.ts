// Run: npm test
import { test } from "node:test"
import assert from "node:assert/strict"
import { normalizePhone } from "../src/lib/signup.ts"

test("Mongolian numbers in the shapes people type", () => {
  assert.equal(normalizePhone("99112233"), "99112233")
  assert.equal(normalizePhone("9911 2233"), "99112233")
  assert.equal(normalizePhone("+976 9911-2233"), "99112233")
  assert.equal(normalizePhone("97699112233"), "99112233")
})

test("diaspora numbers with a + are kept whole", () => {
  assert.equal(normalizePhone("+1 (403) 555-0199"), "+14035550199")
})

test("junk is rejected", () => {
  assert.equal(normalizePhone(""), null)
  assert.equal(normalizePhone("9911223"), null)
  assert.equal(normalizePhone("991122334"), null)
  assert.equal(normalizePhone("abcdefgh"), null)
})
