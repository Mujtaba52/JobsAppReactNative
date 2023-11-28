import {
    CHECK_SEEKER,
    ERROR,
    GET_SEEKER, GET_SEEKER_BY_EMAIL,
    LOADING,
    NODATA,
    RECOMMENDED_SEEKER,
    RESET,
    SUCCESS,
    UPDATE_SEEKER
} from "../../Utils/Constants";
import {defaults} from "axios";

const seeker = (state = {isLoading: true, success: false, error: false, nodata: false}, action) => {
    switch (action.type){
        case LOADING:
            return {...state, isLoading: true, success: false, error:false, nodata: false}
        case SUCCESS:
            return {...state, isLoading: false, success: true, error: false, nodata: false}
        case ERROR:
            return {...state, isLoading: false, success: false, error: true, nodata: false}
        case NODATA:
            return {...state, isLoading: false, success: false, error: false, nodata: true}
        case GET_SEEKER:
            return {...state, seeker: action.payload.data}
        case GET_SEEKER_BY_EMAIL:
            return {...state, seekerEmail: action.payload.data}
        case CHECK_SEEKER:
            return {...state, check: action.payload.data}
        case UPDATE_SEEKER:
            return {...state, seeker: action.payload.data}
        case RECOMMENDED_SEEKER:
            return {...state, seekers: action.payload.data}
        case RESET:
            return {...state, isLoading: true, success: false, error:false, nodata: false}
        default:
            return state
    }
}

export default seeker
