import {
    ALL_APPLIED_NODATA,
    ALL_CATEGORY_NODATA,
    ALL_CITY_NODATA,
    ALL_COMPANY_NODATA,
    ALL_COUNTRY_NODATA,
    ALL_INTERACTION_NODATA,
    ALL_JOB_NODATA,
    ALL_OFFER_NODATA,
    ALL_PLAN_NODATA,
    APPLIED_COMPANY_NODATA,
    APPLIED_JOB_NODATA,
    BOOKMARK_JOB_NODATA,
    BOOKMARKS_NODATA,
    CATEGORY_JOB_NODATA,
    CITY_JOB_NODATA,
    COMPANY_JOB_NODATA,
    COMPANY_NODATA,
    COVER_LETTER_NODATA,
    CV_NODATA,
    EMAIL_SEEKER_NODATA,
    FEATURED_CATEGORY_NODATA,
    JOB_NODATA,
    OFFER_NODATA,
    PROVIDER_FEATURED_NODATA,
    PROVIDER_JOB_NODATA,
    RECENT_JOB_NODATA,
    RECOMMENDED_JOB_NODATA,
    RECOMMENDED_SEEKER_NODATA,
    SEARCH_JOB_NODATA,
    SEEKER_NODATA,
    SEND_OFFER_JOB_NODATA,
    SENT_OFFER_NODATA, TOP_TAGS_NODATA
} from "../../Utils/Constants";

const initialState = {
    allAppliedNoData: false,
    appliedCompanyNoData: false,
    appliedJobNoData: false,
    bookmarksNoData: false,
    allCategoryNoData: false,
    featuredCategoryNoData: false,
    allCityNoData: false,
    allCompanyNoData: false,
    companyNoData: false,
    allCountryNoData: false,
    coverLetterNoData: false,
    cvNoData: false,
    allInteractionNoData: false,
    allJobNoData: false,
    recentJobNoData: false,
    jobNoData: false,
    categoryJobNoData: false,
    cityJobNoData: false,
    companyJobNoData: false,
    providerJobNoData: false,
    providerFeaturedNoData: false,
    recommendedJobNoData: false,
    searchJobNoData: false,
    bookmarkJobNoData: false,
    sentOfferNoData: false,
    sentOfferJobNoData: false,
    allOfferNoData: false,
    offerNoData: false,
    allPlanNoData: false,
    seekerNoData: false,
    emailSeekerNoData: false,
    recommendedSeekersNoData: false,
    topTagsNODATA: false
}

const nodata = (state = initialState, action) => {
    switch (action.type){
        case ALL_APPLIED_NODATA:
            return {...state, allAppliedNoData: true}
        case APPLIED_COMPANY_NODATA:
            return {...state, appliedCompanyNoData: true}
        case APPLIED_JOB_NODATA:
            return {...state, appliedJobNoData: true}
        case BOOKMARKS_NODATA:
            return {...state, bookmarksNoData: true}
        case ALL_CATEGORY_NODATA:
            return {...state, allCategoryNoData: true}
        case FEATURED_CATEGORY_NODATA:
            return {...state, featuredCategoryNoData: true}
        case ALL_CITY_NODATA:
            return {...state, allCityNoData: true}
        case ALL_COMPANY_NODATA:
            return {...state, allCompanyNoData: true}
        case COMPANY_NODATA:
            return {...state, companyNoData: true}
        case ALL_COUNTRY_NODATA:
            return {...state, allCountryNoData: true}
        case COVER_LETTER_NODATA:
            return {...state, coverLetterNoData: true}
        case CV_NODATA:
            return {...state, cvNoData: true}
        case ALL_INTERACTION_NODATA:
            return {...state, allInteractionNoData: true}
        case ALL_JOB_NODATA:
            return {...state, allJobNoData: true}
        case RECENT_JOB_NODATA:
            return {...state, recentJobNoData: true}
        case JOB_NODATA:
            return {...state, jobNoData: true}
        case CATEGORY_JOB_NODATA:
            return {...state, categoryJobNoData: true}
        case CITY_JOB_NODATA:
            return {...state, cityJobNoData: true}
        case COMPANY_JOB_NODATA:
            return {...state, companyJobNoData: true}
        case PROVIDER_JOB_NODATA:
            return {...state, providerJobNoData: true}
        case PROVIDER_FEATURED_NODATA:
            return {...state, providerFeaturedNoData: true}
        case RECOMMENDED_JOB_NODATA:
            return {...state, recommendedJobNoData: true}
        case SEARCH_JOB_NODATA:
            return {...state, searchJobNoData: true}
        case BOOKMARK_JOB_NODATA:
            return {...state, bookmarkJobNoData: true}
        case SENT_OFFER_NODATA:
            return {...state, sentOfferNoData: true}
        case SEND_OFFER_JOB_NODATA:
            return {...state, sentOfferJobNoData: true}
        case ALL_OFFER_NODATA:
            return {...state, allOfferNoData: true}
        case OFFER_NODATA:
            return {...state, offerNoData: true}
        case ALL_PLAN_NODATA:
            return {...state, allPlanNoData: true}
        case SEEKER_NODATA:
            return {...state, seekerNoData: true}
        case EMAIL_SEEKER_NODATA:
            return {...state, emailSeekerNoData: true}
        case RECOMMENDED_SEEKER_NODATA:
            return {...state, recommendedSeekersNoData: true}
        case TOP_TAGS_NODATA:
            return {...state, topTagsNoData: true}
        default:
            return initialState
    }
}

export default nodata
