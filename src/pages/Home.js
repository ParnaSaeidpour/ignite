import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
import { loadDetail } from "../actions/detailAction";
import GameDetail from "../components/GameDetail";

//components

import Games from "../components/Game";
import { useLocation } from "react-router-dom";



const Home=()=>{
    //get the current location

    const Location= useLocation();
    const pathId= Location.pathname.split("/")[2]
    //FETCH GAMES
    const dispatch= useDispatch()
    useEffect(()=>{
      dispatch(loadGames())
    },[dispatch]);

    // Load the game details from the URL, so /game/:id also works after a reload
    useEffect(()=>{
      if(pathId){
        dispatch(loadDetail(pathId))
      }
    },[dispatch, pathId]);

// Get that data back
    const {popular,newGames,upcoming,searched,error}=useSelector((state)=> state.games);
    


    return(
        <div className="pt-0 pb-0 pl-20 pr-20">
            {pathId && <GameDetail pathId={pathId}/>}
            {error && <p role="alert" className="mt-10 p-4 rounded-md bg-red-100 text-red-800">{error}</p>}
            {searched.length ?(
            <div>
                <h2 className="xl:font-mono font-bold text-4xl pt-20 pb-20 pl-0 pr-0 my_text_red">Searched Games</h2>
                    <div className="grid gap-x-10 gap-y-20 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
                        {searched.map(game=>(
                            <Games 
                            name={game.name}
                            released={game.released}
                            id={game.id}
                            image={game.background_image}
                            key={game.id}
                            />
                        ))}
                </div>
            </div>
            ):''}
            <h2 className="xl:font-mono font-bold text-4xl pt-20 pb-20 pl-0 pr-0 my_text_red">Upcoming Games</h2>
                <div className="grid gap-x-10 gap-y-20 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
                    {upcoming.map(game=>(
                        <Games 
                        name={game.name}
                        released={game.released}
                        id={game.id}
                        image={game.background_image}
                        key={game.id}
                        />

                    ))}

                </div>

                <h2 className="xl:font-mono font-bold text-4xl pt-20 pb-20 pl-0 pr-0">Popular Games</h2>
                <div className="grid gap-x-10 gap-y-20 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    {popular.map(game=>(
                        <Games 
                        name={game.name}
                        released={game.released}
                        id={game.id}
                        image={game.background_image}
                        key={game.id}
                        />

                    ))}

                </div>

                <h2 className="xl:font-mono font-bold text-4xl pt-20 pb-20 pl-0 pr-0">New Games</h2>
                <div className="grid gap-x-10 gap-y-20 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    {newGames.map(game=>(
                        <Games 
                        name={game.name}
                        released={game.released}
                        id={game.id}
                        image={game.background_image}
                        key={game.id}
                        />

                    ))}

                </div>
        </div>
    )


}

export default Home