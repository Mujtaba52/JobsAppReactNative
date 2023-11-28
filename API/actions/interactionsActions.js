import {ALL_CATEGORIES, ALL_INTERACTIONS, ALL_INTERACTIONS_LOADING, ALL_INTERACTION_ERROR, ALL_INTERACTION_LOADING, ALL_INTERACTION_NODATA, ALL_INTERACTION_SUCCESS, ERROR, LOADING, NODATA, SUCCESS} from "../../Utils/Constants";
import * as api from "../index";

export const AllInteractions = (user) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: ALL_INTERACTION_LOADING })
        const { data: { data } } = await api.fetchInteractionsByUser(user);
        if (data.length > 0) {
            dispatch({type: ALL_INTERACTIONS, payload: {interactions: data}})
            dispatch({type: SUCCESS})
            dispatch({type: ALL_INTERACTION_SUCCESS})
        } else {
            dispatch({type: ALL_INTERACTIONS, payload: {interactions: data}})
            dispatch({type: SUCCESS})
            dispatch({type: NODATA})
            dispatch({type: ALL_INTERACTION_NODATA})
        }
    } catch (error) {
        console.log(error)
        dispatch ({ type: ERROR })
        dispatch ({ type: ALL_INTERACTION_ERROR })
    }
}
