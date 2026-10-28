import axios from "axios";

import {popularGamesURL,upcomingGamesURL,newGamesURL,searchGameURL} from '../api'


//Action Creator

export const loadGames =()=> async(dispatch)=>{
    try {
        const [popularData, newGamesData, upcomingData] = await Promise.all([
            axios.get(popularGamesURL()),
            axios.get(newGamesURL()),
            axios.get(upcomingGamesURL()),
        ])
        dispatch({
            type: "FETCH_GAMES",
            payload:{
                popular:popularData?.data?.results || [],
                upcoming:upcomingData?.data?.results || [],
                newGames: newGamesData?.data?.results || [],
            }
        })
    } catch (error) {
        dispatch({
            type: "FETCH_GAMES_FAILED",
            payload: { error: "Games could not be loaded. Check your RAWG API key in .env." }
        })
    }
}

export const fetchSearch =(game_name)=> async(dispatch)=>{
    try {
        const searchGames= await axios.get(searchGameURL(game_name))

        dispatch({
            type: "FETCH_SEARCHED",
            payload:{
                searched: searchGames?.data?.results || [],
            }
        })
    } catch (error) {
        dispatch({
            type: "FETCH_GAMES_FAILED",
            payload: { error: "Search failed. Please try again." }
        })
    }
}
