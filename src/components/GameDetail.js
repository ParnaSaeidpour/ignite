import React from "react";


//Redux

import { useSelector } from "react-redux";
import {useNavigate} from  'react-router-dom'
import { smallImage } from "../util";

//IMAGES

import playstation from "../img/playstation.svg"
import steam from "../img/steam.svg"
import xbox from "../img/xbox.svg"
import nintendo from "../img/nintendo.svg"
import apple from '../img/apple.svg'
import gamepad from "../img/gamepad.svg"

//Stars
import starEmpty from '../img/star-empty.png'
import starFull from "../img/star-full.png"

const GameDetail=()=>{
    
    const navigate=useNavigate()

    //Exit Detail

    const exitDetailHandler=(e)=>{
        const element =e.target
        if(element.classList.contains("drop-shadow-md")){
            navigate('/')
        }
    }
    // Get Stars
    const getRating =()=>{
        const stars= [];
        const rating= Math.floor(game.rating)
        for(let i=1; i<=5; i++){
            if (i <= rating){
                stars.push(<img className="inline" alt="star" key={i} src={starFull}></img>)
            }else{stars.push(<img className="inline" alt="star" key={i} src={starEmpty}></img>)

            }
        }
        return stars
    }


    // Get Platform Images 
    const getPlatform =(platform)=>{
        switch(platform){
            case "PlayStation 5":
            case "PlayStation 4":
                return playstation;
            case "Xbox Series S/X":
            case "Xbox One":
                return xbox;
            case "PC":
                return steam
            case "Nintendo Switch":
                return nintendo;
            case "iOS":
                return apple;
            default:
                return gamepad
    }}
    //Data

    const {game, screen,isLoading,error} =useSelector(state => state.detail)
    return(
        <>
        {error && <p role="alert" className="mt-10 p-4 rounded-md bg-red-100 text-red-800">{error}</p>}
        {!isLoading && !error &&(
        <div onClick={exitDetailHandler} className=" drop-shadow-md shadow-inner fixed overflow-y-scroll w-full min-h-full top-0 left-0 overflow-hidden ">
            <div className="bg-white  max-w-7xl rounded-2xl left-5 absolute pl-20 pr-20 cursor-pointer" >
                <div className="flex items-center justify-between">
                    <div className="">
                        <h3 className="font-medium">{game.name}</h3>
                        <p>Rating: {game.rating}</p>
                        {getRating()}
                    </div>
                    <div className="items-center">
                        <h3 className="font-medium ml-20">Platforms</h3>
                        <div className="flex justify-between space-x-5 ">
                            {game.platforms?.map(data=>(
                                <img key={data.platform.id} src={getPlatform(data.platform.name)} alt={data.platform.name}></img>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-20 object-cover">
                    <img src={smallImage(game.background_image,1280)} alt={game.background_image}/>
                </div>
                <div className="mt-20 mb-10">
                    <p>{game.description_raw}</p>
                </div>
                <div className="gallery">
                    {screen.results?.map(screen=>(
                        <img src={smallImage(screen.image,1280)} key={screen.id} alt={screen.image}/>
                    ))}
                  
                </div>
            </div>
                
        </div>
        )}
        </>

    )

}

export default GameDetail