import * as api from '../../API/index'
import {
    ERROR,
    LOADING, PROVIDER_REGISTER_ERROR, PROVIDER_REGISTER_LOADING, PROVIDER_REGISTER_SUCCESS,
    SEEKER_REGISTER_ERROR,
    SEEKER_REGISTER_LOADING,
    SEEKER_REGISTER_SUCCESS,
    SUCCESS
} from "../../Utils/Constants";

export const Registeration = (navigation, name, username, email, phone, address, dob, gender, password, type) => async (dispatch) => {
    try {
        dispatch ({ type: SEEKER_REGISTER_LOADING })
        const { data: { responseCode } } = await api.register(name, username, email, phone, address, dob, gender, password, type)
        console.log(responseCode)
        if (responseCode === 200){
            navigation.replace('Login', { USER: 'SEEKER' })
            dispatch ({ type: SEEKER_REGISTER_SUCCESS })
        } else {
            dispatch ({ type: SEEKER_REGISTER_ERROR })
        }
    } catch (e){
        dispatch({ type: SEEKER_REGISTER_ERROR })
    }
}

export const ProviderRegistration = (navigation, name, size, city, country, email, phone, address, headquater, type, password, account) => async (dispatch) => {
    try {
        dispatch ({ type: PROVIDER_REGISTER_LOADING })
        const { data: { responseCode } } = await api.registerProvider(name, size, city, country, email, phone, address, headquater, type, password, account)
        console.log(responseCode)
        if (responseCode === 200){
            navigation.replace('Login', { USER: 'PROVIDER' })
            dispatch ({ type: PROVIDER_REGISTER_SUCCESS })
        } else {
            dispatch ({ type: PROVIDER_REGISTER_ERROR })
        }
    } catch (e){
        console.log(e)
        dispatch({ type: PROVIDER_REGISTER_ERROR })
    }
}


