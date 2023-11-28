import {
    ALL_BOOKMARKS, BOOKMARKERROR, BOOKMARKLOADING, BOOKMARKNODATA,
    BOOKMARKSUCCESS,
    BOOKMARKS_ERROR,
    BOOKMARKS_LOADING,
    BOOKMARKS_NODATA,
    BOOKMARKS_SUCCESS,
} from "../../Utils/Constants";
import * as api from "../index";

export const AllBookmarks = (user) => async (dispatch) => {
    try {
        dispatch ({ type: BOOKMARKLOADING })
        dispatch ({ type: BOOKMARKS_LOADING })
        const { data: { data } } = await api.fetchBookmarks(user);
        console.log("DONE")
        if (data.length > 0) {
            dispatch({type: ALL_BOOKMARKS, payload: {bookmarks: data}})
            dispatch({type: BOOKMARKSUCCESS})
            dispatch({type: BOOKMARKS_SUCCESS})
        } else {
            dispatch({type: ALL_BOOKMARKS, payload: {bookmarks: data}})
            dispatch({type: BOOKMARKSUCCESS})
            dispatch({type: BOOKMARKNODATA})
            dispatch({type: BOOKMARKS_NODATA})
        }
    } catch (error) {
        console.log(error)
        dispatch({type: BOOKMARKERROR})
        dispatch({type: BOOKMARKS_ERROR})
    }
}

