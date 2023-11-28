import {ALL_COMPANIES, ERROR, GET_COMPANY, LOADING, NO_COMPANY, NODATA, SUCCESS} from "../../Utils/Constants";

const company = (state = {isLoading: true, success: false, error: false, nodata: false}, action) => {
    switch (action.type){
        case LOADING:
            return {...state, isLoading: true, success: false, error: false, nodata: false}
        case SUCCESS:
            return {...state, isLoading: false, success: true, error: false, nodata: false}
        case ERROR:
            return {...state, isLoading: false, success: false, error: true, nodata: false}
        case NODATA:
            return {...state, isLoading: false, success: false, error: false, nodata: true}
        case ALL_COMPANIES:
            return {...state, companies: action.payload.companies}
        case GET_COMPANY:
            return {...state, company: action.payload.company}
        case NO_COMPANY:
            return {...state, noCompany: action.payload.noCompany}
        default:
            return state
    }
}

export default company
