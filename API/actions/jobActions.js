import * as api from '../../API/index'
import {
    ALL_CATEGORIES,
    ALL_JOBS,
    ALL_JOB_ERROR,
    ALL_JOB_LOADING,
    ALL_JOB_NODATA,
    ALL_JOB_SUCCESS,
    CATEGORY_JOB_ERROR,
    CATEGORY_JOB_LOADING,
    CATEGORY_JOB_NODATA,
    CATEGORY_JOB_SUCCESS,
    CITY_JOB_ERROR,
    CITY_JOB_LOADING,
    CITY_JOB_NODATA,
    CITY_JOB_SUCCESS,
    COMPANY_JOB_ERROR,
    COMPANY_JOB_LOADING,
    COMPANY_JOB_NODATA,
    COMPANY_JOB_SUCCESS,
    ERROR,
    GET_JOB,
    GET_JOBS_BY_CATEGORY,
    GET_JOBS_BY_CITY,
    GET_JOBS_BY_COMPANY,
    GET_JOBS_BY_PROVIDER,
    GET_JOBS_BY_PROVIDER_FEATURED,
    GET_RECOMMENDED_JOBS,
    JOB_ERROR,
    JOB_LOADING,
    JOB_SEARCH,
    JOB_SUCCESS,
    LOADING,
    NODATA,
    PROVIDER_FEATURED_ERROR,
    PROVIDER_FEATURED_LOADING,
    PROVIDER_FEATURED_NODATA,
    PROVIDER_FEATURED_SUCCESS,
    PROVIDER_JOB_ERROR,
    PROVIDER_JOB_LOADING,
    PROVIDER_JOB_NODATA,
    PROVIDER_JOB_SUCCESS,
    RECENT_JOBS,
    RECENT_JOB_ERROR,
    RECENT_JOB_LOADING,
    RECENT_JOB_NODATA,
    RECENT_JOB_SUCCESS,
    RECOMMENDED_JOB_ERROR,
    RECOMMENDED_JOB_LOADING,
    RECOMMENDED_JOB_SUCCESS,
    SEARCH_JOB_ERROR,
    SEARCH_JOB_LOADING,
    SEARCH_JOB_NODATA,
    SEARCH_JOB_SUCCESS,
    SUCCESS
} from "../../Utils/Constants";

export const AllJobs = (user) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: ALL_JOB_LOADING })
        const { data: { data } } = await api.fetchAllJobs(user);
        if (data.length > 0) {
            dispatch({type: ALL_JOBS, payload: {jobs: data}})
            dispatch({type: SUCCESS})
            dispatch({type: ALL_JOB_SUCCESS})
        } else {
            dispatch({type: NODATA})
            dispatch({type: ALL_JOB_NODATA})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: ALL_JOB_ERROR})
    }
}

export const RecentJobs = () => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: RECENT_JOB_LOADING })
        const { data: { data } } = await api.fetchRecentJobs();
        if (data.length > 0) {
            dispatch({type: RECENT_JOBS, payload: {recentJobs: data}})
            dispatch({type: SUCCESS})
            dispatch({type: RECENT_JOB_SUCCESS})
        } else {
            dispatch({type: RECENT_JOBS, payload: {recentJobs: data}})
            dispatch({type: NODATA})
            dispatch({type: RECENT_JOB_NODATA})
            dispatch({type: SUCCESS})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: RECENT_JOB_ERROR})
    }
}

export const SearchJobs = (search, country, category, city, company, salaryStart, salaryEnd, type, isCountry, isCategory, isCity, isCompany, isSalary, isType) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: SEARCH_JOB_LOADING })
        const { data: { data } } = await api.fetchSearchJob(search, country, category, city, company, salaryStart, salaryEnd, type, isCountry, isCategory, isCity, isCompany, isSalary, isType);
        if (data.length > 0) {
            dispatch({type: JOB_SEARCH, payload: {searchJobs: data}})
            dispatch({type: SUCCESS})
            dispatch({type: SEARCH_JOB_SUCCESS})
        } else {
            dispatch({type: JOB_SEARCH, payload: {searchJobs: data}})
            dispatch({type: NODATA})
            dispatch({type: SEARCH_JOB_NODATA})
            dispatch({type: SUCCESS})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: SEARCH_JOB_ERROR})
    }
}

export const RecommendedJobs = (user, tag) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: RECOMMENDED_JOB_LOADING })
        const { data: { data } } = await api.fetchRecommendedJobs(user, tag);
        if (data.length > 0) {
            dispatch({type: GET_RECOMMENDED_JOBS, payload: {recommendedJobs: data}})
            dispatch({type: SUCCESS})
            dispatch({type: RECOMMENDED_JOB_SUCCESS})
        } else {
            // dispatch({type: GET_RECOMMENDED_JOBS, payload: {recommendedJobs: data}})
            dispatch({type: NODATA})
            dispatch({type: RECOMMENDED_JOB_ERROR})
            // dispatch({type: SUCCESS})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: RECOMMENDED_JOB_ERROR})
    }
}

export const JobByID = (user, id) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: JOB_LOADING })
        const { data: { data } } = await api.fetchJobByID(user, id);
        dispatch ({ type: GET_JOB, payload: { job: data } })
        dispatch ({ type: SUCCESS })
        dispatch ({ type: JOB_SUCCESS })
    } catch (error) {
        console.log(error)
        dispatch({ type: JOB_ERROR})
    }
}

export const CityJobs = (user, id) => async (dispatch) => {
    try {
        dispatch ({ type: CITY_JOB_LOADING })
        const { data: { data } } = await api.fetchJobByCity(user, id);
        if (data.length > 0) {
            dispatch({type: GET_JOBS_BY_CITY, payload: {cityJobs: data}})
            dispatch({type: SUCCESS})
            dispatch({type: CITY_JOB_SUCCESS})
        } else {
            dispatch({type: GET_JOBS_BY_CITY, payload: {cityJobs: data}})
            dispatch({type: NODATA})
            dispatch({type: CITY_JOB_NODATA})
            dispatch({type: SUCCESS})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: CITY_JOB_ERROR})
    }
}

export const CompanyJobs = (user, id) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: COMPANY_JOB_LOADING })
        const { data: { data } } = await api.fetchJobByCompany(user, id)
        if (data.length > 0) {
            dispatch({type: GET_JOBS_BY_COMPANY, payload: {companyJobs: data}})
            dispatch({type: SUCCESS})
            dispatch({type: COMPANY_JOB_SUCCESS})
        } else {
            dispatch({type: GET_JOBS_BY_COMPANY, payload: {companyJobs: data}})
            dispatch({type: NODATA})
            dispatch({type: COMPANY_JOB_NODATA})
            dispatch({type: SUCCESS})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: COMPANY_JOB_ERROR})
    }
}

export const ProviderJobs = (id) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: PROVIDER_JOB_LOADING })
        const { data: { data } } = await api.fetchJobsByProvider(id)
        if (data.length > 0) {
            dispatch({type: GET_JOBS_BY_PROVIDER, payload: {providerJobs: data}})
            dispatch({type: SUCCESS})
            dispatch({type: PROVIDER_JOB_SUCCESS})
        } else {
            dispatch({type: GET_JOBS_BY_PROVIDER, payload: {providerJobs: data}})
            dispatch({type: NODATA})
            dispatch({type: PROVIDER_JOB_NODATA})
            dispatch({type: SUCCESS})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: PROVIDER_JOB_ERROR})
    }
}

export const FeaturedProviderJobs = (id) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: PROVIDER_FEATURED_LOADING })
        const { data: { data } } = await api.fetchJobsByProviderFeatured(id)
        if (data.length > 0) {
            dispatch({type: GET_JOBS_BY_PROVIDER_FEATURED, payload: {providerJobsFeatured: data}})
            dispatch({type: SUCCESS})
            dispatch({type: PROVIDER_FEATURED_SUCCESS})
        } else {
            dispatch({type: GET_JOBS_BY_PROVIDER_FEATURED, payload: {providerJobsFeatured: data}})
            dispatch({type: NODATA})
            dispatch({type: PROVIDER_FEATURED_NODATA})
            dispatch({type: SUCCESS})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: PROVIDER_FEATURED_ERROR})
    }
}

export const CategoryJobs = (user, id) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: CATEGORY_JOB_LOADING })
        const { data: { data } } = await api.fetchJobByCategory(user, id);
        if (data.length > 0) {
            dispatch({type: GET_JOBS_BY_CATEGORY, payload: {categoryJobs: data}})
            dispatch({type: SUCCESS})
            dispatch({type: CATEGORY_JOB_SUCCESS})
        } else {
            dispatch({type: GET_JOBS_BY_CATEGORY, payload: {categoryJobs: data}})
            dispatch({type: NODATA})
            dispatch({type: CATEGORY_JOB_NODATA})
            dispatch({type: SUCCESS})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: ERROR})
        dispatch({type: CATEGORY_JOB_ERROR})
    }
}
