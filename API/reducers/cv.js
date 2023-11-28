import {
    CREATE_CV_CAREER,
    CREATE_CV_COURSE,
    CREATE_CV_EDUCATION, CREATE_CV_INTEREST, CREATE_CV_LANGUAGE, CREATE_CV_RESUME, CREATE_CV_SKILL, CV_CHECK,
    ERROR,
    GET_COVER_BY_USER,
    GET_CV_BY_USER,
    LOADING, RESET,
    SUCCESS
} from "../../Utils/Constants";

const cv = (state = {isLoading: true, success: false, error: false}, action) => {
    switch (action.type){
        case LOADING:
            return {...state, isLoading: true, success: false, error: false}
        case SUCCESS:
            return {...state, isLoading: false, success: true, error: false}
        case ERROR:
            return {...state, isLoading: false, success: false, error: true}
        case GET_CV_BY_USER:
            return {...state, cv: action.payload.cv}
        case GET_COVER_BY_USER:
            return {...state, coverLetter: action.payload.coverLetter}
        case CREATE_CV_EDUCATION:
            return {...state, education: action.payload.data}
        case CREATE_CV_CAREER:
            return {...state, career: action.payload.data}
        case CREATE_CV_COURSE:
            return {...state, course: action.payload.data}
        case CREATE_CV_INTEREST:
            return {...state, interest: action.payload.data}
        case CREATE_CV_LANGUAGE:
            return {...state, language: action.payload.data}
        // case CREATE_CV_RESUME:
        //     return {...state, resume: action.payload.data}
        case CREATE_CV_SKILL:
            return {...state, skill: action.payload.data}
        case CV_CHECK:
            return {...state, check: action.payload.check}
        case RESET:
            return {...state, isLoading: true, success: false, error: false}
        default:
            return state
    }
}

export default cv
