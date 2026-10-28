import { smallImage } from "../util"

test("resizes game images", () => {
  expect(smallImage("https://media.rawg.io/media/games/abc/cover.jpg", 640))
    .toBe("https://media.rawg.io/media/resize/640/-/games/abc/cover.jpg")
})

test("resizes screenshots", () => {
  expect(smallImage("https://media.rawg.io/media/screenshots/abc/shot.jpg", 1280))
    .toBe("https://media.rawg.io/media/resize/1280/-/screenshots/abc/shot.jpg")
})

test("returns an empty string for games without an image", () => {
  expect(smallImage(null, 640)).toBe("")
  expect(smallImage(undefined, 640)).toBe("")
})
