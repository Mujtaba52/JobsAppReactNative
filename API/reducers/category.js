import { ALL_CATEGORIES, ALL_CATEGORIES_ERROR, ALL_CATEGORIES_LOADING, ALL_CATEGORIES_SUCCESS, FEATURED_CATEGORIES, FEATURED_CATEGORIES_ERROR, FEATURED_CATEGORIES_LOADING, FEATURED_CATEGORIES_NODATA, FEATURED_CATEGORIES_SUCCESS } from "../../Utils/Constants";

const category = (state = { isLoading: true, success: false, error: false, nodata: false }, action) => {
    switch (action.type) {
        case ALL_CATEGORIES_LOADING:
            return { ...state, isLoading: true, success: true, error: false, nodata: false }
        case ALL_CATEGORIES_SUCCESS:
            return { ...state, isLoading: false, success: true, error: false, nodata: false }
        case ALL_CATEGORIES_ERROR:
            return { ...state, isLoading: false, success: false, error: true, nodata: false }
        case ALL_CATEGORIES_ERROR:
            return { ...state, isLoading: false, success: false, error: false, nodata: true }
            
        case ALL_CATEGORIES:
            return { ...state, categories: action.payload.categories }
        case FEATURED_CATEGORIES:
            return { ...state, featured_categories: action.payload.featured_categories }

        default:
            return state
    }
}

export default category
