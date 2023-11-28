import React, {useEffect, useState} from 'react'
import {Image, Text, View} from 'react-native'
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CheckSeeker, fetchSeeker} from "../API/actions/seekerActions";
import {CheckCV} from "../API/actions/cvActions";

const ProfileVerifiedSuccessful = ({ route, navigation }) => {

    const { type } = route.params

    const dispatch = useDispatch()
    const [ID, setID] = useState()

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        GetData()
    }, []);
    const GetData = async () => {
        const value = await AsyncStorage.getItem('ID')
        setID(value);
    }

    useEffect(() => {
        if (type === "PROVIDER"){
            navigation.replace('PostJob')
        } else {
            if (ID) {
                dispatch(fetchSeeker(ID))
                dispatch(CheckCV(ID))
                dispatch(CheckSeeker(ID))
                sleep(1000).then(async () => {
                    navigation.replace('Home')
                })
            }
        }
    }, [ID]);

    return (
        <View>
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 150
            }}>
                <Image source={require('../assets/purchase.png')} style={{marginTop: 20, width: 220, height: 240}}/>
                <Text style={{textAlign: 'center', fontSize: 16, fontFamily: 'poppins_medium', marginTop: 20}}>Thank you
                    !</Text>
                <Text style={{textAlign: 'center', fontSize: 16, fontFamily: 'poppins_medium'}}>Profile Verified
                    Successfuly </Text>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 16,
                    fontFamily: 'poppins_medium',
                    backgroundColor: 'green',
                    color: 'white',
                    marginTop: 100,
                    borderRadius: 20,
                    paddingVertical: 10
                }}>Done</Text>
            </View>
        </View>
    )
}

export default ProfileVerifiedSuccessful
