const initState ={
    game:{platforms:[]},
    screen:{results:[]},
    isLoading:true,
    error:"",
}



const detailReducer =(state=initState, action)=>{
    switch(action.type){
        case "GET_DETAIL":
            return{
                ...state,
                game: action.payload.game,
                screen: action.payload.screen,
                isLoading:false,
                error:"",
            }
        case "LOADING_DETAIL":
            return{
                ...state,
                isLoading:true,
                error:"",
            }
        case "DETAIL_FAILED":
            return{
                ...state,
                isLoading:false,
                error:action.payload.error,
            }

        default:
            return{...state}
    }

}

export default detailReducer
