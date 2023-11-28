import * as api from '../../API/index'
import {
    ERROR,
    LOADING, PROVIDER_LOGIN_ERROR, PROVIDER_LOGIN_LOADING, PROVIDER_LOGIN_SUCCESS,
    SEEKER_LOGIN_ERROR,
    SEEKER_LOGIN_LOADING,
    SEEKER_LOGIN_SUCCESS,
    SUCCESS
} from "../../Utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CheckCV} from "./cvActions";
import {CheckSeeker} from "./seekerActions";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const LoginAuthentication = (navigation, email, password) => async (dispatch) => {
    try {
        dispatch ({ type: SEEKER_LOGIN_LOADING })
        const response = await api.login(email, password)
        const { data: { responseCode } } = response
        const { data: { message } } = response
        const { data: { data } } = response
        console.log(responseCode)
        var ID = (data.id).toString()
        console.log(ID)
        dispatch(CheckCV(ID))
        dispatch(CheckSeeker(ID))
        await AsyncStorage.setItem("LOGIN", 'true')
        await AsyncStorage.setItem("ID", ID)
        await AsyncStorage.setItem("USER", "SEEKER")
        await AsyncStorage.setItem("NAME", data.name)
        await AsyncStorage.setItem("EMAIL", data.email)
        await AsyncStorage.setItem("USERNAME", data.username)
        if (responseCode === 200){
            sleep(2000).then( async () => {
                dispatch({type: SEEKER_LOGIN_SUCCESS})
                sleep(500).then(async () => {
                    navigation.popToTop()
                    navigation.replace('Onboarding')
                })
            })
        } else {
            dispatch ({ type: SEEKER_LOGIN_ERROR })
        }
    } catch (e){
        dispatch({ type: SEEKER_LOGIN_ERROR })
    }
}

export const ProviderLoginAuthentication = (navigation, email, password) => async (dispatch) => {
    try {
        dispatch ({ type: PROVIDER_LOGIN_LOADING })
        const response = await api.loginProvider(email, password)
        const { data: { responseCode } } = response
        const { data: { message } } = response
        const { data: { data } } = response
        console.log(responseCode)
        var ID = (data.id).toString()
        await AsyncStorage.setItem("LOGIN", 'true')
        await AsyncStorage.setItem("ID", ID)
        await AsyncStorage.setItem("USER", "PROVIDER")
        await AsyncStorage.setItem("NAME", data.name)
        await AsyncStorage.setItem("EMAIL", data.email)
        console.log("Provider")
        if (responseCode === 200){
            dispatch ({ type: PROVIDER_LOGIN_SUCCESS })
            sleep(500).then(async () => {
                navigation.popToTop()
                navigation.replace('PostJob')
            })
        } else {
            dispatch ({ type: PROVIDER_LOGIN_ERROR })
        }
    } catch (e){
        console.log("error")
        dispatch({ type: PROVIDER_LOGIN_ERROR })
    }
}
