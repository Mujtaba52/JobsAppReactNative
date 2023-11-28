import {ALL_PLAN_ERROR, ALL_PLAN_LOADING, ALL_PLAN_NODATA, ALL_PLAN_SUCCESS, ERROR, GET_PLAN_BY_TYPE, LOADING, NODATA, SUCCESS} from "../../Utils/Constants";
import * as api from "../index";

export const getPlans = (type) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: ALL_PLAN_LOADING })
        const { data: { data } } = await api.fetchPlansByType(type);
        if (data.length > 0) {
            dispatch({type: GET_PLAN_BY_TYPE, payload: {typePlans: data}})
            dispatch({type: SUCCESS})
            dispatch({type: ALL_PLAN_SUCCESS})
        } else {
            dispatch({type: NODATA})
            dispatch({type: ALL_PLAN_NODATA})
        }
    } catch (error) {
        console.log(error)
        dispatch ({ type: ERROR })
        dispatch ({ type: ALL_PLAN_ERROR })
    }
}
