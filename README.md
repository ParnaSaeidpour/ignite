# Ignite – Video Game Browser

A React + Redux app for discovering video games. It shows upcoming, popular and new games, lets you search the whole RAWG catalogue, and opens a detail view with rating, platforms, description and screenshots. Game data comes from the [RAWG Video Games Database API](https://rawg.io/apidocs).

> Built in December 2022 – January 2023. Updated in October 2026 with environment-based configuration, tests and CI.

## Features

- **Upcoming games** (next 12 months), **popular games** (highest rated in the last 12 months) and **new releases**
- **Search** across the RAWG catalogue
- **Game detail view** with star rating, platform icons, description and screenshots
- Shareable game links: `/game/:id` loads the game directly
- Responsive grid layout with Tailwind CSS
- Clear messages when the API key is missing or a request fails

## Tech stack

| Area | Technology |
|---|---|
| UI | React 18, React Router 6, Tailwind CSS |
| State | Redux Toolkit, Redux Thunk |
| HTTP | Axios |
| Tooling | Create React App |
| Tests | Jest, React Testing Library |
| CI | GitHub Actions |

## How it works

```
Home page (/)
├── loadGames()      ──► 3 RAWG requests in parallel: upcoming, popular, new
├── Nav search       ──► fetchSearch(text) ──► RAWG ?search=
└── /game/:id        ──► loadDetail(id)    ──► game details + screenshots

Redux store
├── games   { popular, upcoming, newGames, searched, error }
└── detail  { game, screen, isLoading, error }

src/api.js    builds the RAWG URLs and adds the API key from .env
src/util.js   requests smaller image sizes from RAWG
```

## Getting started

### Prerequisites

- Node.js 18+
- A free RAWG API key: sign up at [rawg.io/apidocs](https://rawg.io/apidocs) and copy your key

### Setup

```bash
git clone https://github.com/ParnaSaeidpour/ignite.git
cd ignite
npm install
cp .env.example .env   # then put your key in REACT_APP_RAWG_API_KEY
npm start              # http://localhost:3000
```

### Environment variables

| Variable | Purpose |
|---|---|
| `REACT_APP_RAWG_API_KEY` | Your RAWG API key |

`.env` is in `.gitignore`, so your key is never committed.

**Note:** this is a frontend-only app. Create React App includes `REACT_APP_*` variables in the JavaScript sent to the browser, so anyone using a deployed version can see the key. Use a free key only. To fully hide a key you would need a small backend that calls RAWG for the app.

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Start the development server |
| `npm test` | Run the tests (watch mode; add `-- --watchAll=false` to run once) |
| `npm run build` | Build for production into `build/` |

## Tests

```bash
npm test -- --watchAll=false
```

- `src/__tests__/api.test.js`: API key from the environment, search text encoding, date ranges
- `src/__tests__/util.test.js`: image resizing, games without an image
- `src/__tests__/reducers.test.js`: Redux state updates
- `src/__tests__/App.test.js`: the whole app with the RAWG API replaced by test data (no key or network needed): game lists, search, opening a game link directly, and the error message

GitHub Actions runs the tests and a production build on every push and pull request.

## Project structure

```
src/
├── api.js                 # RAWG URLs
├── util.js                # image helper
├── actions/
│   ├── gamesAction.js     # loadGames, fetchSearch
│   └── detailAction.js    # loadDetail
├── reducers/              # games and detail state
├── components/
│   ├── Nav.js             # logo and search
│   ├── Game.js            # game card
│   └── GameDetail.js      # detail view
├── pages/Home.js          # game lists and detail routing
└── __tests__/             # Jest tests
```
