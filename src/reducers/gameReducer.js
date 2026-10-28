const initState ={
    popular:[],
    newGames:[],
    upcoming:[],
    searched:[],
    error:"",
}

const gamesReducer =(state=initState, action) =>{
    switch(action.type){
        case "FETCH_GAMES":
            return {
                ...state,
                popular:action.payload.popular,
                upcoming:action.payload.upcoming,
                newGames:action.payload.newGames,
                error:"",
            };
        case "FETCH_SEARCHED":
            return{
                ...state,
                searched:action.payload.searched,
                error:"",
            }
        case "CLEAR_SEARCHED":
            return{
                ...state,
                searched:[],
            }
        case "FETCH_GAMES_FAILED":
            return{
                ...state,
                error:action.payload.error,
            }
        default:
            return {...state}

    }
}
export default gamesReducer
