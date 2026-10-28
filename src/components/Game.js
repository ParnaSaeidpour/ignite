import React from "react";

 

import { Link } from "react-router-dom";
import { smallImage } from "../util";

const Games=({name,released,image,id})=>{
    return(
        <div className="cursor-pointer shadow-2xl shadow-gray-400 text-center rounded-md overflow-hidden">
            <Link to={`/game/${id}`}>
            <h3 className="italic text-black pt-3 text-lg">{name}</h3>
            <p className="pt-3 text-sm">{released}</p>
            <img src={smallImage(image,640)} alt={name} className=" object-cover h-full"/>
            </Link>
        </div>
    )
}

export default Games