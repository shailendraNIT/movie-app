import {combineReducers} from 'redux';
import {ADD_MOVIES,ADD_FAVOURITE,REMOVE_FAVOURITE, SET_SHOW_FAVOURITE,ADD_MOVIE_TO_LIST, ADD_SEARCH_RESULT} from '../actions';

const initialMovieState={
    list:[],
    favourites:[],
    showFavourites:false
}



export  function movies(state=initialMovieState,action){
    
    switch(action.type){
        case ADD_MOVIES:
            return {
                ...state,
                list : action.movies
            }
        case ADD_FAVOURITE:
            return {
                ...state,
                favourites:[action.movie,...state.favourites]
            }
        case REMOVE_FAVOURITE:
            const filtered_array=state.favourites.filter((movie)=>{
                return movie!==action.movie
            })
            return{
                ...state,
                favourites:filtered_array
            }
        case SET_SHOW_FAVOURITE:
            return{
                ...state,
                showFavourites:action.val
            }

        case ADD_MOVIE_TO_LIST:
            return{
                ...state,
                list: [...state.list,action.movie]
            }
        default:
            return state;
    }
}

const initialSearchState={
    result:{},
    showSearchResults: false
}
export function search(state=initialSearchState,action){
    
    switch(action.type){
        case ADD_SEARCH_RESULT:
            return{
                ...state,
                result:action.movie,
                showSearchResults:true
            }
        default:
            return state;
    }
}


// const initialRootState={
//     movies:initialMovieState,
//     search:initialSearchState
// }

// export default function rootReducer(state=initialRootState,action){
//     return{
//         movies:movies(state.movies,action),
//         search:search(state.search,action)
//     }
// }

export default combineReducers({
    movies,
    search
})