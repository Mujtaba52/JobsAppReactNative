import * as api from '../../API/index'
import {
    CHECK_SEEKER,
    EMAIL_SEEKER_ERROR,
    EMAIL_SEEKER_LOADING,
    EMAIL_SEEKER_SUCCESS,
    ERROR,
    GET_SEEKER, GET_SEEKER_BY_EMAIL,
    LOADING,
    NODATA,
    RECOMMENDED_SEEKER,
    RECOMMENDED_SEEKER_ERROR,
    RECOMMENDED_SEEKER_LOADING,
    RECOMMENDED_SEEKER_NODATA,
    RECOMMENDED_SEEKER_SUCCESS,
    SEEKER_ERROR,
    SEEKER_LOADING,
    SEEKER_SUCCESS,
    SUCCESS,
    UPDATE_SEEKER
} from "../../Utils/Constants";

export const RecommendedSeekers = (job) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: RECOMMENDED_SEEKER_LOADING })
        const { data: { data } } = await api.fetchRecommendedUsers(job);
        if (data.length !== 0) {
            dispatch({type: RECOMMENDED_SEEKER, payload: {data: data}})
            dispatch({type: SUCCESS})
            dispatch({type: RECOMMENDED_SEEKER_SUCCESS})
        } else {
            dispatch({type: RECOMMENDED_SEEKER, payload: {data: data}})
            dispatch({type: NODATA})
            dispatch({type: RECOMMENDED_SEEKER_NODATA})
            dispatch({type: SUCCESS})
        }
    } catch (error) {
        console.log(error)
        dispatch ({ type: ERROR })
        dispatch ({ type: RECOMMENDED_SEEKER_ERROR })
    }
}

export const fetchSeeker = (ID) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: SEEKER_LOADING })
        const { data: { data } } = await api.fetchSeeker(ID);
        dispatch ({ type: GET_SEEKER, payload: { data: data } })
        dispatch ({ type: SUCCESS })
        dispatch ({ type: SEEKER_SUCCESS })
    } catch (error) {
        console.log(error)
        dispatch ({ type: ERROR })
        dispatch ({ type: SEEKER_ERROR })
    }
}

export const SeekerByEmail = (email) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: EMAIL_SEEKER_LOADING })
        const { data: { data } } = await api.fetchSeekerByEmail(email);
        dispatch ({ type: GET_SEEKER_BY_EMAIL, payload: { data: data } })
        dispatch ({ type: SUCCESS })
        dispatch ({ type: EMAIL_SEEKER_SUCCESS })
    } catch (error) {
        console.log(error)
        dispatch ({ type: ERROR })
        dispatch ({ type: EMAIL_SEEKER_ERROR })
    }
}

export const CheckSeeker = (ID) => async (dispatch) => {
    console.log(ID)
    try {
        dispatch ({ type: LOADING })
        const { data: { status } } = await api.checkSeeker(ID);
        dispatch ({ type: CHECK_SEEKER, payload: { data: status } })
        dispatch ({ type: SUCCESS })
    } catch (error) {
        console.log(error)
        dispatch ({ type: ERROR })
    }
}

export const updateSeeker = (name, city, country, username, code, phone, address, dob, gender, id) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        const { data: { data } } = await api.updateSeeker(name, city, country, username, code, phone, address, dob, gender, id);
        dispatch ({ type: UPDATE_SEEKER, payload: { data: data } })
        dispatch ({ type: SUCCESS })
    } catch (error) {
        console.log(error)
        dispatch ({ type: ERROR })
    }
}
