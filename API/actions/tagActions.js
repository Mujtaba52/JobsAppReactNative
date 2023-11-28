import {ERROR, GET_TOP_TAGS, LOADING, NODATA, SUCCESS, TOP_TAGS_ERROR, TOP_TAGS_LOADING, TOP_TAGS_NODATA, TOP_TAGS_SUCCESS} from "../../Utils/Constants";
import * as api from "../index";

export const TopTags = (user) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: TOP_TAGS_LOADING })
        const { data: { data } } = await api.fetchtopTags(user);
        if (data.length > 0) {
            dispatch({type: GET_TOP_TAGS, payload: {topTags: data}})
            dispatch({type: SUCCESS})
            dispatch({type: TOP_TAGS_SUCCESS})
        } else {
            dispatch({type: GET_TOP_TAGS, payload: {topTags: data}})
            dispatch({type: NODATA})
            dispatch({type: TOP_TAGS_NODATA})
            dispatch({type: SUCCESS})
        }
    } catch (error) {
        console.log(error)
        dispatch ({ type: ERROR })
        dispatch ({ type: TOP_TAGS_ERROR })
    }
}
