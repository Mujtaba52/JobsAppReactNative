import {
    ALL_BOOKMARKS,
    BOOKMARK_JOB,
    BOOKMARKERROR,
    BOOKMARKLOADING, BOOKMARKNODATA, BOOKMARKSUCCESS,
    ERROR,
    LOADING,
    NODATA,
    SUCCESS
} from "../../Utils/Constants";

const bookmark = (state = {bookmarkIsLoading: true, bookmarkSuccess: false, bookmarkError: false, bookmarkNoData: false}, action) => {
    switch (action.type){
        case BOOKMARKLOADING:
            return {...state, bookmarkIsLoading: true, bookmarkSuccess: true, bookmarkError: false, bookmarkNoData: false}
        case BOOKMARKSUCCESS:
            return {...state, bookmarkIsLoading: false, bookmarkSuccess: true, bookmarkError: false, bookmarkNoData: false}
        case BOOKMARKERROR:
            return {...state, bookmarkIsLoading: false, bookmarkSuccess: false, bookmarkError: true, bookmarkNoData: false}
        case BOOKMARKNODATA:
            return {...state, bookmarkIsLoading: false, bookmarkSuccess: false, bookmarkError: false, bookmarkNoData: true}
        case ALL_BOOKMARKS:
            return {...state, bookmarks: action.payload.bookmarks}
        default:
            return state
    }
}

export default bookmark
