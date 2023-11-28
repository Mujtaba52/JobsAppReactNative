import {
    ALL_APPLIED_ERROR,
    ALL_CATEGORY_ERROR,
    ALL_CITY_ERROR,
    ALL_COMPANY_ERROR,
    ALL_COUNTRY_ERROR,
    ALL_INTERACTION_ERROR,
    ALL_JOB_ERROR,
    ALL_OFFER_ERROR,
    ALL_PLAN_ERROR,
    APPLIED_COMPANY_ERROR,
    APPLIED_JOB_ERROR,
    BOOKMARK_JOB_ERROR,
    BOOKMARKS_ERROR,
    CATEGORY_JOB_ERROR,
    CITY_JOB_ERROR,
    COMPANY_JOB_ERROR,
    COMPANY_ERROR,
    COVER_LETTER_ERROR,
    CV_ERROR,
    EMAIL_SEEKER_ERROR,
    FEATURED_CATEGORY_ERROR,
    JOB_ERROR,
    OFFER_ERROR,
    PROVIDER_FEATURED_ERROR,
    PROVIDER_JOB_ERROR,
    RECENT_JOB_ERROR,
    RECOMMENDED_JOB_ERROR,
    RECOMMENDED_SEEKER_ERROR,
    SEARCH_JOB_ERROR,
    SEEKER_ERROR,
    SEND_OFFER_JOB_ERROR,
    SENT_OFFER_ERROR,
    TOP_TAGS_ERROR,
    PROVIDER_REGISTER_ERROR, PROVIDER_LOGIN_ERROR, SEEKER_REGISTER_ERROR, SEEKER_LOGIN_ERROR,

} from "../../Utils/Constants";

const initialState = {
    seekerLoginError: false,
    providerLoginError: false,
    seekerRegisterError: false,
    providerRegisterError: false,
    allAppliedError: false,
    appliedCompanyError: false,
    appliedJobError: false,
    bookmarksError: false,
    allCategoryError: false,
    featuredCategoryError: false,
    allCityError: false,
    allCompanyError: false,
    companyError: false,
    allCountryError: false,
    coverLetterError: false,
    cvError: false,
    allInteractionError: false,
    allJobError: false,
    recentJobError: false,
    jobError: false,
    categoryJobError: false,
    cityJobError: false,
    companyJobError: false,
    providerJobError: false,
    providerFeaturedError: false,
    recommendedJobError: false,
    searchJobError: false,
    bookmarkJobError: false,
    sentOfferError: false,
    sentOfferJobError: false,
    allOfferError: false,
    offerError: false,
    allPlanError: false,
    seekerError: false,
    emailSeekerError: false,
    recommendedSeekersError: false,
    topTagsError: false
}

const error = (state = initialState, action) => {
    switch (action.type){
        case SEEKER_LOGIN_ERROR:
            return {...state, seekerLoginError: true}
        case SEEKER_REGISTER_ERROR:
            return {...state, seekerRegisterError: true}
        case PROVIDER_LOGIN_ERROR:
            return {...state, providerLoginError: true}
        case PROVIDER_REGISTER_ERROR:
            return {...state, providerRegisterError: true}
        case ALL_APPLIED_ERROR:
            return {...state, allAppliedError: true}
        case APPLIED_COMPANY_ERROR:
            return {...state, appliedCompanyError: true}
        case APPLIED_JOB_ERROR:
            return {...state, appliedJobError: true}
        case BOOKMARKS_ERROR:
            return {...state, bookmarksError: true}
        case ALL_CATEGORY_ERROR:
            return {...state, allCategoryError: true}
        case FEATURED_CATEGORY_ERROR:
            return {...state, featuredCategoryError: true}
        case ALL_CITY_ERROR:
            return {...state, allCityError: true}
        case ALL_COMPANY_ERROR:
            return {...state, allCompanyError: true}
        case COMPANY_ERROR:
            return {...state, companyError: true}
        case ALL_COUNTRY_ERROR:
            return {...state, allCountryError: true}
        case COVER_LETTER_ERROR:
            return {...state, coverLetterError: true}
        case CV_ERROR:
            return {...state, cvError: true}
        case ALL_INTERACTION_ERROR:
            return {...state, allInteractionError: true}
        case ALL_JOB_ERROR:
            return {...state, allJobError: true}
        case RECENT_JOB_ERROR:
            return {...state, recentJobError: true}
        case JOB_ERROR:
            return {...state, jobError: true}
        case CATEGORY_JOB_ERROR:
            return {...state, categoryJobError: true}
        case CITY_JOB_ERROR:
            return {...state, cityJobError: true}
        case COMPANY_JOB_ERROR:
            return {...state, companyJobError: true}
        case PROVIDER_JOB_ERROR:
            return {...state, providerJobError: true}
        case PROVIDER_FEATURED_ERROR:
            return {...state, providerFeaturedError: true}
        case RECOMMENDED_JOB_ERROR:
            return {...state, recommendedJobError: true}
        case SEARCH_JOB_ERROR:
            return {...state, searchJobError: true}
        case BOOKMARK_JOB_ERROR:
            return {...state, bookmarkJobError: true}
        case SENT_OFFER_ERROR:
            return {...state, sentOfferError: true}
        case SEND_OFFER_JOB_ERROR:
            return {...state, sentOfferJobError: true}
        case ALL_OFFER_ERROR:
            return {...state, allOfferError: true}
        case OFFER_ERROR:
            return {...state, offerError: true}
        case ALL_PLAN_ERROR:
            return {...state, allPlanError: true}
        case SEEKER_ERROR:
            return {...state, seekerError: true}
        case EMAIL_SEEKER_ERROR:
            return {...state, emailSeekerError: true}
        case RECOMMENDED_SEEKER_ERROR:
            return {...state, recommendedSeekersError: true}
        case TOP_TAGS_ERROR:
            return {...state, topTagsError: true}
        default:
            return initialState
    }
}

export default error
