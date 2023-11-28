import * as api from '../../API/index'
import {
    ALL_OFFER_ERROR,
    ALL_OFFER_LOADING,
    ALL_OFFER_NODATA,
    ALL_OFFER_SUCCESS,
    ERROR,
    LOADING,
    NODATA,
    OFFER,
    OFFERS,
    OFFER_ERROR,
    OFFER_LOADING,
    OFFER_NODATA,
    OFFER_SUCCESS,
    SEND_OFFER_JOB_ERROR,
    SEND_OFFER_JOB_LOADING,
    SEND_OFFER_JOB_SUCCESS,
    SENT_OFFERS,
    SENT_OFFERS_BY_JOB,
    SENT_OFFER_ERROR,
    SENT_OFFER_LOADING,
    SENT_OFFER_NODATA,
    SENT_OFFER_SUCCESS,
    SUCCESS,
    SEND_OFFER_JOB_NODATA
} from "../../Utils/Constants";
import {sentOffersByJob} from "../../API/index";

export const FetchSentOffers = (company) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: SENT_OFFER_LOADING })
        const { data: { data } } = await api.sentOffers(company);
        if (data.length > 0) {
            dispatch({type: SENT_OFFERS, payload: {sentOffers: data}})
            dispatch({type: SUCCESS})
            dispatch({type: SENT_OFFER_SUCCESS})

        } else {
            dispatch({type: NODATA})
            dispatch({type: SENT_OFFER_NODATA})
        }
    } catch (error) {
        console.log(error)
        dispatch ({ type: ERROR })
        dispatch ({ type: SENT_OFFER_ERROR })
    }
}

export const FetchSentOffersByJob = (job) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: SEND_OFFER_JOB_LOADING })
        const { data: { data } } = await api.sentOffersByJob(job);
        console.log(data)
        if (data.length > 0) {
            dispatch({type: SENT_OFFERS_BY_JOB, payload: {jobOffers: data}})
            dispatch({type: SUCCESS})
            dispatch({type: SEND_OFFER_JOB_SUCCESS})
        } else {
            dispatch({type: NODATA})
            dispatch({ type: SEND_OFFER_JOB_NODATA })
        }
    } catch (error) {
        console.log(error)
        dispatch ({ type: ERROR })
        dispatch ({ type: SEND_OFFER_JOB_ERROR })
    }
}

export const FetchOffer = (id) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: OFFER_LOADING })
        const { data: { data } } = await api.offer(id);
        console.log(data)
        // if (data.length > 0) {
        dispatch({type: OFFER, payload: {offer: data}})
        dispatch({type: SUCCESS})
        dispatch({type: OFFER_SUCCESS})
        // } else {
        //     dispatch({type: NODATA})
        // }
    } catch (error) {
        console.log(error)
        dispatch ({ type: ERROR })
        dispatch ({ type: OFFER_ERROR })
    }
}

export const FetchOffers = (user) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: ALL_OFFER_LOADING })
        const { data: { data } } = await api.offers(user);
        if (data.length > 0) {
            dispatch({type: OFFERS, payload: {offers: data}})
            dispatch({type: SUCCESS})
            dispatch({type: ALL_OFFER_SUCCESS})
        } else {
            dispatch({type: NODATA})
            dispatch({type: ALL_OFFER_NODATA})
        }
    } catch (error) {
        console.log(error)
        dispatch ({ type: ERROR })
        dispatch ({ type: ALL_OFFER_ERROR })
    }
}
