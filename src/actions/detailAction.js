import axios from "axios";
import { gameDetailsURL, gameScreenShotURL } from "../api";

export const loadDetail =(id)=> async(dispatch)=>{
    dispatch(
        {
            type:"LOADING_DETAIL"
        }
    )
    try{
        const [detailData, screenShotData] = await Promise.all([
            axios.get(gameDetailsURL(id)),
            axios.get(gameScreenShotURL(id)),
        ])

        dispatch({
            type:"GET_DETAIL",
            payload:{
                game: detailData?.data,
                screen: screenShotData?.data,
            }
        })
    }catch (error) {
        dispatch({
            type:"DETAIL_FAILED",
            payload:{ error:"Game details could not be loaded." }
        })
    }
}
