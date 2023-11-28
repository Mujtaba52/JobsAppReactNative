import {
    ALL_APPLIED_SUCCESS,
    ALL_CATEGORY_SUCCESS,
    ALL_CITY_SUCCESS,
    ALL_COMPANY_SUCCESS,
    ALL_COUNTRY_SUCCESS,
    ALL_INTERACTION_SUCCESS,
    ALL_JOB_SUCCESS,
    ALL_OFFER_SUCCESS,
    ALL_PLAN_SUCCESS,
    APPLIED_COMPANY_SUCCESS,
    APPLIED_JOB_SUCCESS,
    BOOKMARK_JOB_SUCCESS,
    BOOKMARKS_SUCCESS,
    CATEGORY_JOB_SUCCESS,
    CITY_JOB_SUCCESS,
    COMPANY_JOB_SUCCESS,
    COMPANY_SUCCESS,
    COVER_LETTER_SUCCESS,
    CV_SUCCESS,
    EMAIL_SEEKER_SUCCESS,
    FEATURED_CATEGORY_SUCCESS,
    JOB_SUCCESS,
    OFFER_SUCCESS,
    PROVIDER_FEATURED_SUCCESS,
    PROVIDER_JOB_SUCCESS,
    PROVIDER_LOGIN_SUCCESS,
    PROVIDER_REGISTER_SUCCESS,
    RECENT_JOB_SUCCESS,
    RECOMMENDED_JOB_SUCCESS,
    RECOMMENDED_SEEKER_SUCCESS,
    SEARCH_JOB_SUCCESS,
    SEEKER_LOGIN_SUCCESS,
    SEEKER_REGISTER_SUCCESS,
    SEEKER_SUCCESS,
    SEND_OFFER_JOB_SUCCESS,
    SENT_OFFER_SUCCESS,
    TOP_TAGS_SUCCESS
} from "../../Utils/Constants";

const initialState = {
    seekerLoginSuccess: false,
    providerLoginSuccess: false,
    seekerRegisterSuccess: false,
    providerRegisterSuccess: false,
    allAppliedSuccess: false,
    appliedCompanySuccess: false,
    appliedJobSuccess: false,
    bookmarksSuccess: false,
    allCategorySuccess: false,
    featuredCategorySuccess: false,
    allCitySuccess: false,
    allCompanySuccess: false,
    companySuccess: false,
    allCountrySuccess: false,
    coverLetterSuccess: false,
    cvSuccess: false,
    allInteractionSuccess: false,
    allJobSuccess: false,
    recentJobSuccess: false,
    jobSuccess: false,
    categoryJobSuccess: false,
    cityJobSuccess: false,
    companyJobSuccess: false,
    providerJobSuccess: false,
    providerFeaturedSuccess: false,
    recommendedJobSuccess: false,
    searchJobSuccess: false,
    bookmarkJobSuccess: false,
    sentOfferSuccess: false,
    sentOfferJobSuccess: false,
    allOfferSuccess: false,
    offerSuccess: false,
    allPlanSuccess: false,
    seekerSuccess: false,
    emailSeekerSuccess: false,
    recommendedSeekersSuccess: false,
    topTagsSuccess: false
}

const success = (state = initialState, action) => {
    switch (action.type){
        case SEEKER_LOGIN_SUCCESS:
            return {...state, seekerLoginSuccess: true}
        case SEEKER_REGISTER_SUCCESS:
            return {...state, seekerRegisterSuccess: true}
        case PROVIDER_LOGIN_SUCCESS:
            return {...state, providerLoginSuccess: true}
        case PROVIDER_REGISTER_SUCCESS:
            return {...state, providerRegisterSuccess: true}
        case ALL_APPLIED_SUCCESS:
            return {...state, allAppliedSuccess: true}
        case APPLIED_COMPANY_SUCCESS:
            return {...state, appliedCompanySuccess: true}
        case APPLIED_JOB_SUCCESS:
            return {...state, appliedJobSuccess: true}
        case BOOKMARKS_SUCCESS:
            return {...state, bookmarksSuccess: true}
        case ALL_CATEGORY_SUCCESS:
            return {...state, allCategorySuccess: true}
        case FEATURED_CATEGORY_SUCCESS:
            return {...state, featuredCategorySuccess: true}
        case ALL_CITY_SUCCESS:
            return {...state, allCitySuccess: true}
        case ALL_COMPANY_SUCCESS:
            return {...state, allCompanySuccess: true}
        case COMPANY_SUCCESS:
            return {...state, companySuccess: true}
        case ALL_COUNTRY_SUCCESS:
            return {...state, allCountrySuccess: true}
        case COVER_LETTER_SUCCESS:
            return {...state, coverLetterSuccess: true}
        case CV_SUCCESS:
            return {...state, cvSuccess: true}
        case ALL_INTERACTION_SUCCESS:
            return {...state, allInteractionSuccess: true}
        case ALL_JOB_SUCCESS:
            return {...state, allJobSuccess: true}
        case RECENT_JOB_SUCCESS:
            return {...state, recentJobSuccess: true}
        case JOB_SUCCESS:
            return {...state, jobSuccess: true}
        case CATEGORY_JOB_SUCCESS:
            return {...state, categoryJobSuccess: true}
        case CITY_JOB_SUCCESS:
            return {...state, cityJobSuccess: true}
        case COMPANY_JOB_SUCCESS:
            return {...state, companyJobSuccess: true}
        case PROVIDER_JOB_SUCCESS:
            return {...state, providerJobSuccess: true}
        case PROVIDER_FEATURED_SUCCESS:
            return {...state, providerFeaturedSuccess: true}
        case RECOMMENDED_JOB_SUCCESS:
            return {...state, recommendedJobSuccess: true}
        case SEARCH_JOB_SUCCESS:
            return {...state, searchJobSuccess: true}
        case BOOKMARK_JOB_SUCCESS:
            return {...state, bookmarkJobSuccess: true}
        case SENT_OFFER_SUCCESS:
            return {...state, sentOfferSuccess: true}
        case SEND_OFFER_JOB_SUCCESS:
            return {...state, sentOfferJobSuccess: true}
        case ALL_OFFER_SUCCESS:
            return {...state, allOfferSuccess: true}
        case OFFER_SUCCESS:
            return {...state, offerSuccess: true}
        case ALL_PLAN_SUCCESS:
            return {...state, allPlanSuccess: true}
        case SEEKER_SUCCESS:
            return {...state, seekerSuccess: true}
        case EMAIL_SEEKER_SUCCESS:
            return {...state, emailSeekerSuccess: true}
        case RECOMMENDED_SEEKER_SUCCESS:
            return {...state, recommendedSeekersSuccess: true}
        case TOP_TAGS_SUCCESS:
            return {...state, topTagsSuccess: true}
        default:
            return initialState
    }
}

export default success
