import gamesReducer from "../reducers/gameReducer"
import detailReducer from "../reducers/detailReducer"

test("stores fetched games and clears an old error", () => {
  const state = gamesReducer({ popular: [], newGames: [], upcoming: [], searched: [], error: "old" }, {
    type: "FETCH_GAMES",
    payload: { popular: [{ id: 1 }], upcoming: [{ id: 2 }], newGames: [{ id: 3 }] },
  })
  expect(state.popular).toEqual([{ id: 1 }])
  expect(state.error).toBe("")
})

test("clears searched games", () => {
  const state = gamesReducer(undefined, { type: "FETCH_SEARCHED", payload: { searched: [{ id: 1 }] } })
  expect(gamesReducer(state, { type: "CLEAR_SEARCHED" }).searched).toEqual([])
})

test("stops loading when game details fail", () => {
  const loading = detailReducer(undefined, { type: "LOADING_DETAIL" })
  const failed = detailReducer(loading, { type: "DETAIL_FAILED", payload: { error: "failed" } })
  expect(failed.isLoading).toBe(false)
  expect(failed.error).toBe("failed")
})
