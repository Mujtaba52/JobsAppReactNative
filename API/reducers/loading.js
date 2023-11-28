import {
    ALL_APPLIED_LOADING,
    ALL_CATEGORY_LOADING,
    ALL_CITY_LOADING,
    ALL_COMPANY_LOADING,
    ALL_COUNTRY_LOADING,
    ALL_INTERACTION_LOADING,
    ALL_JOB_LOADING,
    ALL_OFFER_LOADING,
    ALL_PLAN_LOADING,
    APPLIED_COMPANY_LOADING,
    APPLIED_JOB_LOADING,
    BOOKMARK_JOB_LOADING,
    BOOKMARKS_LOADING,
    CATEGORY_JOB_LOADING,
    CITY_JOB_LOADING,
    COMPANY_JOB_LOADING,
    COMPANY_LOADING,
    COVER_LETTER_LOADING,
    CV_LOADING,
    EMAIL_SEEKER_LOADING,
    FEATURED_CATEGORY_LOADING,
    JOB_LOADING,
    OFFER_LOADING,
    PROVIDER_FEATURED_LOADING,
    PROVIDER_JOB_LOADING, PROVIDER_LOGIN_LOADING, PROVIDER_REGISTER_LOADING,
    RECENT_JOB_LOADING,
    RECOMMENDED_JOB_LOADING,
    RECOMMENDED_SEEKER_LOADING,
    SEARCH_JOB_LOADING,
    SEEKER_LOADING, SEEKER_LOGIN_LOADING, SEEKER_REGISTER_LOADING,
    SEND_OFFER_JOB_LOADING,
    SENT_OFFER_LOADING, TOP_TAGS_LOADING
} from "../../Utils/Constants";

const initialState = {
    seekerLoginLoading: false,
    providerLoginLoading: false,
    seekerRegisterLoading: false,
    providerRegisterLoading: false,
    allAppliedLoading: false,
    appliedCompanyLoading: false,
    appliedJobLoading: false,
    bookmarksLoading: false,
    allCategoryLoading: false,
    featuredCategoryLoading: false,
    allCityLoading: false,
    allCompanyLoading: false,
    companyLoading: false,
    allCountryLoading: false,
    coverLetterLoading: false,
    cvLoading: false,
    allInteractionLoading: false,
    allJobLoading: false,
    recentJobLoading: false,
    jobLoading: false,
    categoryJobLoading: false,
    cityJobLoading: false,
    companyJobLoading: false,
    providerJobLoading: false,
    providerFeaturedLoading: false,
    recommendedJobLoading: false,
    searchJobLoading: false,
    bookmarkJobLoading: false,
    sentOfferLoading: false,
    sentOfferJobLoading: false,
    allOfferLoading: false,
    offerLoading: false,
    allPlanLoading: false,
    seekerLoading: false,
    emailSeekerLoading: false,
    recommendedSeekersLoading: false,
    topTagsLoading: false
}

const loading = (state = initialState, action) => {
    switch (action.type){
        case SEEKER_LOGIN_LOADING:
            return {...state, seekerLoginLoading: true}
        case SEEKER_REGISTER_LOADING:
            return {...state, seekerRegisterLoading: true}
        case PROVIDER_LOGIN_LOADING:
            return {...state, providerLoginLoading: true}
        case PROVIDER_REGISTER_LOADING:
            return {...state, providerRegisterLoading: true}
        case ALL_APPLIED_LOADING:
            return {...state, allAppliedLoading: true}
        case APPLIED_COMPANY_LOADING:
            return {...state, appliedCompanyLoading: true}
        case APPLIED_JOB_LOADING:
            return {...state, appliedJobLoading: true}
        case BOOKMARKS_LOADING:
            return {...state, bookmarksLoading: true}
        case ALL_CATEGORY_LOADING:
            return {...state, allCategoryLoading: true}
        case FEATURED_CATEGORY_LOADING:
            return {...state, featuredCategoryLoading: true}
        case ALL_CITY_LOADING:
            return {...state, allCityLoading: true}
        case ALL_COMPANY_LOADING:
            return {...state, allCompanyLoading: true}
        case COMPANY_LOADING:
            return {...state, companyLoading: true}
        case ALL_COUNTRY_LOADING:
            return {...state, allCountryLoading: true}
        case COVER_LETTER_LOADING:
            return {...state, coverLetterLoading: true}
        case CV_LOADING:
            return {...state, cvLoading: true}
        case ALL_INTERACTION_LOADING:
            return {...state, allInteractionLoading: true}
        case ALL_JOB_LOADING:
            return {...state, allJobLoading: true}
        case RECENT_JOB_LOADING:
            return {...state, recentJobLoading: true}
        case JOB_LOADING:
            return {...state, jobLoading: true}
        case CATEGORY_JOB_LOADING:
            return {...state, categoryJobLoading: true}
        case CITY_JOB_LOADING:
            return {...state, cityJobLoading: true}
        case COMPANY_JOB_LOADING:
            return {...state, companyJobLoading: true}
        case PROVIDER_JOB_LOADING:
            return {...state, providerJobLoading: true}
        case PROVIDER_FEATURED_LOADING:
            return {...state, providerFeaturedLoading: true}
        case RECOMMENDED_JOB_LOADING:
            return {...state, recommendedJobLoading: true}
        case SEARCH_JOB_LOADING:
            return {...state, searchJobLoading: true}
        case BOOKMARK_JOB_LOADING:
            return {...state, bookmarkJobLoading: true}
        case SENT_OFFER_LOADING:
            return {...state, sentOfferLoading: true}
        case SEND_OFFER_JOB_LOADING:
            return {...state, sentOfferJobLoading: true}
        case ALL_OFFER_LOADING:
            return {...state, allOfferLoading: true}
        case OFFER_LOADING:
            return {...state, offerLoading: true}
        case ALL_PLAN_LOADING:
            return {...state, allPlanLoading: true}
        case SEEKER_LOADING:
            return {...state, seekerLoading: true}
        case EMAIL_SEEKER_LOADING:
            return {...state, emailSeekerLoading: true}
        case RECOMMENDED_SEEKER_LOADING:
            return {...state, recommendedSeekersLoading: true}
        case TOP_TAGS_LOADING:
            return {...state, topTagsLoading: true}
        default:
            return initialState
    }
}

export default loading
