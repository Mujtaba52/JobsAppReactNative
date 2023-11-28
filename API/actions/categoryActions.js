import * as api from '../../API/index'
import {ALL_CATEGORIES, ALL_CATEGORY_ERROR, ALL_CATEGORY_LOADING, ALL_CATEGORY_NODATA, ALL_CATEGORY_SUCCESS, ERROR, FEATURED_CATEGORIES, FEATURED_CATEGORIES_ERROR, FEATURED_CATEGORIES_LOADING, FEATURED_CATEGORIES_NODATA, FEATURED_CATEGORIES_SUCCESS, FEATURED_CATEGORY_ERROR, FEATURED_CATEGORY_LOADING, FEATURED_CATEGORY_NODATA, FEATURED_CATEGORY_SUCCESS, LOADING, NODATA, SUCCESS} from "../../Utils/Constants";

export const AllCategories = () => async (dispatch) => {
    try {
        dispatch ({ type: ALL_CATEGORY_LOADING })
        const { data: { data } } = await api.fetchAllCategories(); 
        if (data.length > 0) {
            dispatch({type: ALL_CATEGORIES, payload: {categories: data}})
            dispatch({type: ALL_CATEGORY_SUCCESS})
        } else {
            dispatch({type: ALL_CATEGORY_NODATA})
        }
    } catch (error) {
        console.log(error)
        dispatch ({ type: ALL_CATEGORY_ERROR })
    }
}

export const FeaturedCategories = () => async (dispatch) => {
    try {
        dispatch ({ type: FEATURED_CATEGORY_LOADING })
        const { data: { data } } = await api.fetchFeaturedCategories();
        if (data.length > 0){
            dispatch ({ type: FEATURED_CATEGORIES, payload: { featured_categories: data } })
            dispatch ({ type: FEATURED_CATEGORY_SUCCESS })
        } else {
            dispatch ({ type: FEATURED_CATEGORY_NODATA })
        }
    } catch (error) {
        console.log(error)
        dispatch ({ type: FEATURED_CATEGORY_ERROR })
    }
}
