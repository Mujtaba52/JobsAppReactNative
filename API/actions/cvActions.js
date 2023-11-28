import {
    CREATE_CV_CAREER,
    CREATE_CV_COURSE,
    CREATE_CV_EDUCATION, CREATE_CV_INTEREST, CREATE_CV_LANGUAGE, CREATE_CV_RESUME, CREATE_CV_SKILL, CV_CHECK,
    CV_ERROR,
    CV_LOADING,
    CV_SUCCESS,
    GET_COVER_BY_USER,
    GET_CV_BY_USER,
    GET_CV_BY_USER_LOADING,
    LOADING,
    SUCCESS
} from "../../Utils/Constants";
import * as api from "../index";

export const CVByUser = (user) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: CV_LOADING })
        const { data: { data } } = await api.fetchCVByUser(user);
        dispatch ({ type: GET_CV_BY_USER, payload: { cv: data } })
        dispatch ({ type: SUCCESS })
        dispatch ({ type: CV_SUCCESS })
    } catch (error) {
        console.log(error)
        dispatch ({ type: CV_ERROR })


    }
}

export const CheckCV = (user) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: CV_LOADING })
        const { data: { status } } = await api.checkCV(user);
        dispatch ({ type: CV_CHECK, payload: { check: status } })
        dispatch ({ type: SUCCESS })
        dispatch ({ type: CV_SUCCESS })

    } catch (error) {
        console.log(error)
        dispatch ({ type: CV_ERROR })

    }
}

export const CVEducation = (cv, qualification, timeperiod, institute) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: CV_LOADING })

        const { data: { data } } = await api.addCVEducation(cv, qualification, timeperiod, institute);
        dispatch ({ type: CREATE_CV_EDUCATION, payload: { data: data } })
        dispatch ({ type: SUCCESS })
        dispatch ({ type: CV_SUCCESS })

    } catch (error) {
        console.log(error)
        dispatch ({ type: CV_ERROR })

    }
}

export const CVCareer = (cv, company, job, timeperiod, address, phone) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: CV_LOADING })

        const { data: { data } } = await api.addCVCareer(cv, company, job, timeperiod, address, phone);
        dispatch ({ type: CREATE_CV_CAREER, payload: { data: data } })
        dispatch ({ type: SUCCESS })
        dispatch ({ type: CV_SUCCESS })

    } catch (error) {
        console.log(error)
        dispatch ({ type: CV_ERROR })
    }
}

export const CVCourse = (cv, course, timeperiod, institute) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: CV_LOADING })

        const { data: { data } } = await api.addCVCourse(cv, course, timeperiod, institute);
        dispatch ({ type: CREATE_CV_COURSE, payload: { data: data } })
        dispatch ({ type: SUCCESS })
        dispatch ({ type: CV_SUCCESS })

    } catch (error) {
        console.log(error)
        dispatch ({ type: CV_ERROR })

    }
}

export const CVInterest = (cv, interest) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: CV_LOADING })

        const { data: { data } } = await api.addCVInterest(cv, interest);
        dispatch ({ type: CREATE_CV_INTEREST, payload: { data: data } })
        dispatch ({ type: SUCCESS })
        dispatch ({ type: CV_SUCCESS })

    } catch (error) {
        console.log(error)
        dispatch ({ type: CV_ERROR })

    }
}

export const CVLanguage = (cv, language) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: CV_LOADING })

        const { data: { data } } = await api.addCVLanguage(cv, language);
        dispatch ({ type: CREATE_CV_LANGUAGE, payload: { data: data } })
        dispatch ({ type: SUCCESS })
        dispatch ({ type: CV_SUCCESS })

    } catch (error) {
        console.log(error)
        dispatch ({ type: CV_ERROR })

    }
}

// export const CVResume = (cv, resume) => async (dispatch) => {
//     try {
//         dispatch ({ type: LOADING })
//         dispatch ({ type: CV_LOADING })

//         const { data: { data } } = await api.addCVResume(cv, resume);
//         dispatch ({ type: CREATE_CV_RESUME, payload: { data: data } })
//         dispatch ({ type: SUCCESS })
//         dispatch ({ type: CV_SUCCESS })

//     } catch (error) {
//         console.log(error)
//         dispatch ({ type: CV_ERROR })

//     }
// }

export const CVSkill = (cv, skill) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        dispatch ({ type: CV_LOADING })

        const { data: { data } } = await api.addCVSkill(cv, skill);
        dispatch ({ type: CREATE_CV_SKILL, payload: { data: data } })
        dispatch ({ type: SUCCESS })
        dispatch ({ type: CV_SUCCESS })

    } catch (error) {
        console.log(error)
        dispatch ({ type: CV_ERROR })

    }
}
