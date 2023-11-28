import {SENT_OFFERS, ERROR, LOADING, NODATA, SUCCESS, SENT_OFFERS_BY_JOB, OFFERS, OFFER} from "../../Utils/Constants";

const offers = (state = {isLoading: true, success: false, error: false, nodata: false}, action) => {
    switch (action.type) {
        case LOADING:
            return {...state, isLoading: true, success: true, error: false, nodata: false}
        case SUCCESS:
            return {...state, isLoading: false, success: true, error: false, nodata: false}
        case ERROR:
            return {...state, isLoading: false, success: false, error: true, nodata: false}
        case NODATA:
            return {...state, isLoading: false, success: false, error: false, nodata: true}
        case SENT_OFFERS:
            return {...state, sentOffers: action.payload.sentOffers}
        case SENT_OFFERS_BY_JOB:
            return {...state, jobOffers: action.payload.jobOffers}
        case OFFERS:
            return {...state, offers: action.payload.offers}
        case OFFER:
            return {...state, offer: action.payload.offer}
        default:
            return state
    }
}

export default offers
