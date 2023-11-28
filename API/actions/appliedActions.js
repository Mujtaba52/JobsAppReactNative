import {
    ALL_APPLIED,
    ALL_APPLIED_ERROR,
    ALL_APPLIED_LOADING,
    ALL_APPLIED_NODATA,
    ALL_APPLIED_SUCCESS,
    ALL_BOOKMARKS, APPLIED_COMPANY_ERROR, APPLIED_COMPANY_LOADING, APPLIED_COMPANY_NODATA, APPLIED_COMPANY_SUCCESS,
    APPLIED_JOB_ERROR,
    APPLIED_JOB_LOADING,
    APPLIED_JOB_NODATA,
    APPLIED_JOB_SUCCESS,
    ERROR,
    GET_APPLIED_BY_COMPANY, GET_APPLIED_BY_JOB,
    LOADING,
    NODATA,
    SUCCESS
} from "../../Utils/Constants";
import * as api from "../index";

export const AllApplied = (user) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch({type: ALL_APPLIED_LOADING})
        const { data: { data } } = await api.appliedJobs(user);
        if (data.length > 0) {
            dispatch({type: ALL_APPLIED, payload: {appliedJobs: data}})
            dispatch({type: ALL_APPLIED_SUCCESS})
            dispatch({type: SUCCESS})
        } else {
            dispatch({type: ALL_APPLIED, payload: {appliedJobs: data}})
            dispatch({type: SUCCESS})
            dispatch({type: NODATA})
            dispatch({type: ALL_APPLIED_NODATA})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: ALL_APPLIED_ERROR})
    }
}

export const AppliedByCompany = (company) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: APPLIED_COMPANY_LOADING })
        const { data: { data } } = await api.appliedByCompany(company);
        if (data.length > 0) {
            dispatch({type: GET_APPLIED_BY_COMPANY, payload: {companyApplied: data}})
            dispatch ({ type: APPLIED_COMPANY_SUCCESS })
            dispatch({type: SUCCESS})
        } else {
            dispatch({type: GET_APPLIED_BY_COMPANY, payload: {companyApplied: data}})
            dispatch({type: SUCCESS})
            dispatch({type: NODATA})
            dispatch ({ type: APPLIED_COMPANY_NODATA })
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch ({ type: APPLIED_COMPANY_ERROR })
    }
}

export const FetchAppliedByJob = (job) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: APPLIED_JOB_LOADING })
        const { data: { data } } = await api.appliedByJob(job);
        if (data.length > 0) {
            dispatch({type: GET_APPLIED_BY_JOB, payload: {appliedUsers: data}})
            dispatch({type: SUCCESS})
            dispatch({type: APPLIED_JOB_SUCCESS})
        } else {
            dispatch({type: GET_APPLIED_BY_JOB, payload: {appliedUsers: data}})
            dispatch({type: SUCCESS})
            dispatch({type: NODATA})
            dispatch({type: APPLIED_JOB_NODATA})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: APPLIED_JOB_ERROR})
    }
}
