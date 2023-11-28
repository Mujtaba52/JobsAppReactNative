import {
    ALL_APPLIED,
    ERROR,
    GET_APPLIED_BY_COMPANY,
    GET_APPLIED_BY_JOB,
    LOADING,
    NODATA,
    SUCCESS
} from "../../Utils/Constants";

const applied = (state = {isLoading: true, success: false, error: false, nodata: false}, action) => {
    switch (action.type){
        case LOADING:
            return {...state, isLoading: true, success: true, error: false, nodata: false}
        case SUCCESS:
            return {...state, isLoading: false, success: true, error: false, nodata: false}
        case ERROR:
            return {...state, isLoading: false, success: false, error: true, nodata: false}
        case NODATA:
            return {...state, isLoading: false, success: false, error: false, nodata: true}
        case ALL_APPLIED:
            return {...state, appliedJobs: action.payload.appliedJobs}
        case GET_APPLIED_BY_COMPANY:
            return {...state, companyApplied: action.payload.companyApplied}
        case GET_APPLIED_BY_JOB:
            return {...state, appliedUsers: action.payload.appliedUsers}
        default:
            return state
    }
}

export default applied
