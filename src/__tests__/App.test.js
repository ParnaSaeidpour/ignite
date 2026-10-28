import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import axios from "axios"
import rootReducer from "../reducers"
import App from "../App"

jest.mock("axios")

const game = (id, name, extra = {}) => ({ id, name, released: "2026-01-01", background_image: null, ...extra })

const renderApp = (path = "/") => {
  const store = configureStore({ reducer: rootReducer, middleware: [thunk] })
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>
  )
}

// Answer each RAWG URL with test data
const mockRawg = () => {
  axios.get.mockImplementation(async (url) => {
    if (url.includes("search=")) return { data: { results: [game(9, "Searched Game")] } }
    if (url.includes("/screenshots")) return { data: { results: [] } }
    if (url.includes("/games/42.json")) {
      return { data: { name: "Detail Game", rating: 4.2, platforms: [{ platform: { id: 1, name: "PC" } }], description_raw: "About the game" } }
    }
    if (url.includes("ordering=-rating")) return { data: { results: [game(1, "Popular Game")] } }
    if (url.includes("ordering=-added")) return { data: { results: [game(2, "Upcoming Game")] } }
    return { data: { results: [game(3, "New Game")] } }
  })
}

afterEach(() => jest.resetAllMocks())

test("shows upcoming, popular and new games, including games without an image", async () => {
  mockRawg()
  renderApp()
  expect(await screen.findByText("Popular Game")).toBeInTheDocument()
  expect(screen.getByText("Upcoming Game")).toBeInTheDocument()
  expect(screen.getByText("New Game")).toBeInTheDocument()
})

test("search shows results without reloading the page", async () => {
  mockRawg()
  renderApp()
  fireEvent.change(screen.getByPlaceholderText("Search"), { target: { value: "zelda" } })
  // fireEvent.submit returns false when the default action (page reload) was prevented
  const notPrevented = fireEvent.submit(screen.getByPlaceholderText("Search").closest("form"))
  expect(notPrevented).toBe(false)
  expect(await screen.findByText("Searched Game")).toBeInTheDocument()
  expect(screen.getByText("Searched Games")).toBeInTheDocument()
})

test("opening a game link directly loads its details", async () => {
  mockRawg()
  renderApp("/game/42")
  expect(await screen.findByText("Detail Game")).toBeInTheDocument()
  expect(screen.getByText("About the game")).toBeInTheDocument()
  expect(screen.getByAltText("PC")).toBeInTheDocument()
})

test("shows a message when games cannot be loaded", async () => {
  axios.get.mockRejectedValue(new Error("401 Unauthorized"))
  renderApp()
  expect(await screen.findByRole("alert")).toHaveTextContent("Games could not be loaded")
})
