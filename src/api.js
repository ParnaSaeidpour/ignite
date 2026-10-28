// RAWG API (https://rawg.io/apidocs)
// The key is read from .env (REACT_APP_RAWG_API_KEY), never from the source code.
// Note: Create React App puts REACT_APP_* variables into the browser bundle,
// so only use a free key that is safe to expose to users of the app.

const apiKey = () => process.env.REACT_APP_RAWG_API_KEY || ""

const base_url = () => `https://api.rawg.io/api/games?key=${apiKey()}`
const MODIFY_API = `https://api.rawg.io/api/games/`

// Getting the date

const pad = (number) => String(number).padStart(2, "0")

// Dates as YYYY-MM-DD: today, one year ago and one year ahead
export const getDateRange = (now = new Date()) => {
    const year = now.getFullYear()
    const monthDay = `${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
    return {
        currentDate: `${year}-${monthDay}`,
        lastYear: `${year - 1}-${monthDay}`,
        nextYear: `${year + 1}-${monthDay}`,
    }
}

// Popular, upcoming and new games

export const popularGamesURL = (now) => {
    const { lastYear, currentDate } = getDateRange(now)
    return `${base_url()}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`
}
export const upcomingGamesURL = (now) => {
    const { currentDate, nextYear } = getDateRange(now)
    return `${base_url()}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`
}
export const newGamesURL = (now) => {
    const { lastYear, currentDate } = getDateRange(now)
    return `${base_url()}&dates=${lastYear},${currentDate}&ordering=-released&page_size=10`
}

//GAME DETAILS

export const gameDetailsURL = (game_id) => `${MODIFY_API}${encodeURIComponent(game_id)}.json?key=${apiKey()}`

// Game Screenshot

export const gameScreenShotURL = (game_id) => `${MODIFY_API}${encodeURIComponent(game_id)}/screenshots?key=${apiKey()}`

//Search Game

export const searchGameURL = (game_name) => `${base_url()}&search=${encodeURIComponent(game_name)}&page_size=9`
