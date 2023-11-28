import * as api from '../index'
import {ALL_CITIES, ALL_COUNTRIES, ALL_COUNTRY_ERROR, ALL_COUNTRY_LOADING, ALL_COUNTRY_NODATA, ALL_COUNTRY_SUCCESS, ERROR, LOADING, NODATA, SUCCESS} from "../../Utils/Constants";

export const AllCountries = () => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: ALL_COUNTRY_LOADING })
        const { data: { data } } = await api.fetchAllCountries();
        if (data.length > 0) {
            dispatch({type: ALL_COUNTRIES, payload: {countries: data}})
            dispatch({type: SUCCESS})
            dispatch({type: ALL_COUNTRY_SUCCESS})
        } else {
            dispatch({type: ALL_COUNTRIES, payload: {countries: data}})
            dispatch({type: SUCCESS})
            dispatch({type: NODATA})
            dispatch({type: ALL_COUNTRY_NODATA})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: ALL_COUNTRY_ERROR})
    }
}
