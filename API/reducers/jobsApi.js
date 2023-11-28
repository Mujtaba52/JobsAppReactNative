import { ERROR, GET_JOBAPI_JOB, GET_RECENT_APIJOBS, LOADING, SUCCESS } from "../../Utils/Constants";



const jobsApi = (state = {isLoading: true, success: false, error: false, jobsApis: []}, action) =>{
    switch(action.type){
        case LOADING:
            return {...state, isLoading: true}
        case SUCCESS:
            return {...state, isLoading: false, success: true, error: false}
        case ERROR:
            return {...state, isLoading: false, success: false, error: true}
        case GET_JOBAPI_JOB:
            return {...state, jobsApi: action.payload.jobsApi}
        case GET_RECENT_APIJOBS:
            return {...state, jobsApiRecent: action.payload}
        default:
            return state;
    }
}

export default jobsApi;
