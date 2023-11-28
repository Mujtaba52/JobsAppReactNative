import {
    COVER_LETTER_ERROR,
    COVER_LETTER_LOADING,
    COVER_LETTER_SUCCESS,
    GET_COVER_BY_USER,
    LOADING,
    SUCCESS
} from "../../Utils/Constants";
import * as api from "../index";

export const CoverLetterByUser = (user, job) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: COVER_LETTER_LOADING })
        const { data: { data } } = await api.fetchCoverByUser(user, job);
        console.log(data)
        dispatch ({ type: GET_COVER_BY_USER, payload: { coverLetters: data } })
        dispatch ({ type: SUCCESS })
        dispatch ({ type: COVER_LETTER_SUCCESS })
    } catch (error) {
        console.log(error)
        dispatch(COVER_LETTER_ERROR)
    }
}


