import * as api from '../../API/index'
import {ALL_COMPANIES, ALL_COMPANY_ERROR, ALL_COMPANY_LOADING, ALL_COMPANY_NODATA, ALL_COMPANY_SUCCESS, COMPANY_ERROR, COMPANY_JOB_SUCCESS, COMPANY_LOADING, COMPANY_SUCCESS, ERROR, GET_COMPANY, LOADING, NO_COMPANIES_LOADING, NO_COMPANY, NODATA, SUCCESS} from "../../Utils/Constants";

export const AllCompanies = () => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: ALL_COMPANY_LOADING })
        const { data: { data } } = await api.fetchAllCompanies();
        if (data.length > 0) {
            dispatch({type: ALL_COMPANIES, payload: {companies: data}})
            dispatch({type: SUCCESS})
            dispatch({type: ALL_COMPANY_SUCCESS})
        } else {
            dispatch({type: NODATA})
            dispatch({type: ALL_COMPANY_NODATA})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: ALL_COMPANY_ERROR})
    }
}

export const CompanyData = (id) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: COMPANY_LOADING })
        const { data: { data } } = await api.fetchCompany(id);
        console.log(data)
        if (data !== undefined) {
            dispatch({type: GET_COMPANY, payload: {company: data}})
            dispatch({type: NO_COMPANY, payload: {noCompany: "NO"}})
            dispatch({type: SUCCESS})
            dispatch({type: COMPANY_SUCCESS})
        } else {
            dispatch({type: NO_COMPANY, payload: {noCompany: 'YES'}})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: COMPANY_ERROR})
    }
}
