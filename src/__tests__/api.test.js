import { getDateRange, gameDetailsURL, popularGamesURL, searchGameURL } from "../api"

const ORIGINAL_ENV = process.env

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV, REACT_APP_RAWG_API_KEY: "test-key" }
})

afterAll(() => {
  process.env = ORIGINAL_ENV
})

test("reads the API key from the environment", () => {
  expect(popularGamesURL()).toContain("key=test-key")
  expect(gameDetailsURL(3498)).toBe("https://api.rawg.io/api/games/3498.json?key=test-key")
})

test("encodes search text", () => {
  expect(searchGameURL("Ratchet & Clank #1")).toContain("&search=Ratchet%20%26%20Clank%20%231&")
})

test("builds date ranges with two-digit months and days", () => {
  expect(getDateRange(new Date(2026, 0, 5))).toEqual({
    currentDate: "2026-01-05",
    lastYear: "2025-01-05",
    nextYear: "2027-01-05",
  })
})

test("popular games cover the last year, newest rating first", () => {
  const url = popularGamesURL(new Date(2026, 9, 28))
  expect(url).toContain("dates=2025-10-28,2026-10-28")
  expect(url).toContain("ordering=-rating")
})
