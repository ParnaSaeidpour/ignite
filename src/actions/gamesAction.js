import axios from "axios";

import {popularGamesURL,upcomingGamesURL,newGamesURL} from '../api'


//Action Creator

export const loadGames =()=> async(dispatch)=>{
    try {
        
        const popularData= await axios.get(popularGamesURL());
        const newGamesData= await axios.get(newGamesURL());
        const upcomingData= await axios.get(upcomingGamesURL());
        dispatch({
            type: "FETCH_GAMES",
            payLoad:{
                popular:popularData?.data?.results,
                upcoming:upcomingData?.data?.results,
                newGames: newGamesData?.data?.results,
            }
        })
    } catch (error) {
        console.error('Load games has enconter an error: ',error.message)
    }
        
    
}