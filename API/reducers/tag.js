import {ERROR, GET_TOP_TAGS, LOADING, NODATA, SUCCESS} from "../../Utils/Constants";

const tag = (state = {isLoading: true, success: false, error: false, nodata: false}, action) => {
    switch(action.type){
        case LOADING:
            return {...state, isLoading: true, success: false, error:false, nodata: false}
        case SUCCESS:
            return {...state, isLoading: false, success: true, error: false, nodata: false}
        case ERROR:
            return {...state, isLoading: false, success: false, error: true, nodata: false}
        case NODATA:
            return {...state, isLoading: false, success: false, error: false, nodata: true}
        case GET_TOP_TAGS:
            return {...state, topTags: action.payload.topTags}
        default:
            return state
    }
}

export default tag
