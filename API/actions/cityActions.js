import {
    ALL_CITIES,
    ALL_CITY_ERROR,
    ALL_CITY_LOADING,
    ALL_CITY_NODATA,
    ALL_CITY_SUCCESS,
    CITIES_ERROR,
    CITIES_LOADING,
    CITIES_NODATA,
    CITIES_SUCCESS,
    ERROR,
    LOADING,
    NODATA,
    SUCCESS
} from "../../Utils/Constants";
import * as api from "../index";

export const AllCities = () => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: ALL_CITY_LOADING })
        const { data: { data } } = await api.fetchAllCities();
        if (data.length >= 0) {
            dispatch({type: ALL_CITIES, payload: {cities: data}})
            dispatch({type: SUCCESS})
            dispatch({type: ALL_CITY_SUCCESS})
        } else {
            dispatch({type: NODATA})
            dispatch({type: ALL_CITY_NODATA})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: ALL_CITY_ERROR})
    }
}
