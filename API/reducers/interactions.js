import {ALL_INTERACTIONS, ERROR, LOADING, NODATA, SUCCESS} from "../../Utils/Constants";

const interactions = (state = {isLoading: true, success: false, error: false, nodata: false}, action) => {
    switch (action.type){
        case LOADING:
            return {...state, isLoading: true, success: false, error: false, nodata: false}
        case SUCCESS:
            return {...state, isLoading: false, success: true, error: false, nodata: false}
        case ERROR:
            return {...state, isLoading: false, success: false, error: true, nodata: false}
        case NODATA:
            return {...state, isLoading: false, success: false, error: false, nodata: true}
        case ALL_INTERACTIONS:
            return {...state, interactions: action.payload.interactions}
        default:
            return state
    }
}

export default interactions
