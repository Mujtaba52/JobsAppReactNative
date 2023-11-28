import {
    ERROR,
    GET_COVER_BY_USER,
    LOADING, 
    SUCCESS
} from "../../Utils/Constants";

const coverLetter = (state = {isLoading: true, success: false, error: false}, action) => {
    switch (action.type){
        case LOADING:
            return {...state, isLoading: true, success: false, error: false}
        case SUCCESS:
            return {...state, isLoading: false, success: true, error: false}
        case ERROR:
            return {...state, isLoading: false, success: false, error: true}
        case GET_COVER_BY_USER:
            return {...state, coverLetter: action.payload.coverLetters}
        default:
            return state
    }
}

export default coverLetter
