import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";

import { AllCompanies, CompanyData } from '../API/actions/companyActions';

import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ripple from 'react-native-material-ripple';
import LogoutConfirmationModal from '../Components/LogoutConfirmationModal';

const ProviderProfileInfo = ({ navigation }) => {

    const dispatch = useDispatch();

    const [ID, setID] = useState()

    useEffect(() => {
        GetData()
    }, []);
    const GetData = async () => {
        const value = await AsyncStorage.getItem('ID')
        setID(value);
    }

    const company = useSelector(state => state.company.company)

    const success = useSelector(state => state.success.companySuccess)
    const error = useSelector(state => state.error.companyError)
    const nodata = useSelector(state => state.nodata.companyNoData)

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (success || error || nodata) {
            setLoading(false)
        }
    }, [success, error, nodata])

    useEffect(() => {
        if (ID) {
            dispatch(CompanyData(ID))
        }
    }, [dispatch, ID]);


    useEffect(() => {
        console.log(company)
    }, [company])

    const Logout = async () => {
        await AsyncStorage.setItem("LOGIN", 'false')
        await AsyncStorage.setItem("ID", '')
        await AsyncStorage.setItem("NAME", '')
        await AsyncStorage.setItem("EMAIL", '')
        await AsyncStorage.setItem("USERNAME", '')
        setLoginVal('false')
        toggleLoadingVisibility()
        navigation.popToTop()
        navigation.replace('UserType')
    }

    const [loadingVisible, setLoadingVisible] = useState(false)
    const toggleLoadingVisibility = () => setLoadingVisible(!loadingVisible);
    const [loginVal, setLoginVal] = useState()


    return (
        <View style={{ flex: 1 }}>
            <LogoutConfirmationModal toggleLoadingVisibility={toggleLoadingVisibility} visible={loadingVisible}
                Logout={Logout} />

            {loading ?
                <View style={{ marginTop: 400 }}>
                    <ActivityIndicator size={60} color="#13A3E1" />
                </View>
                :
                <>
                    <ScrollView style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
                        <View style={{
                            flexDirection: 'column',
                            width: '100%',
                            height: 240,
                            backgroundColor: '#13A3E1'
                        }}>
                            <View style={{ flexDirection: 'row', height: 130 }}>
                                <Pressable onPress={() => navigation.goBack()}><Image style={{
                                    width: 22,
                                    height: 20,
                                    marginTop: 70,
                                    marginLeft: 30,
                                    marginBottom: 250,
                                    tintColor: '#fff'
                                }} source={require('../assets/back_arrow.png')} alt={'Okay'} /></Pressable>
                                <View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
                                    <Image style={{ width: 150, height: 40, marginTop: 60, alignSelf: 'center' }}
                                        source={require('../assets/logo.png')} alt={'Okay'} />
                                </View>
                            </View>
                            <Text ellipsizeMode={"tail"} style={{
                                color: '#fff',
                                fontSize: 30,
                                fontFamily: 'poppins_bold',
                                textAlign: 'center',
                                marginTop: 10,
                                marginHorizontal: 20,
                                paddingBottom: 20
                            }}>{company?.name}</Text>
                        </View>
                        <View style={{
                            backgroundColor: '#fff',
                            paddingVertical: 20,
                            marginHorizontal: 10,
                            marginRight: 30,
                            marginLeft: 30,
                            borderRadius: 30,
                            marginTop: -20
                        }}>
                            <Text style={{
                                color: '#000',
                                fontSize: 16,
                                fontFamily: 'poppins_medium',
                                width: '100%',
                                textAlign: 'center'
                            }}>{company?.code + company?.phone}</Text>
                            <Text style={{
                                color: '#000',
                                fontSize: 15,
                                fontFamily: 'poppins_semibold',
                                width: '100%',
                                textAlign: 'center'
                            }}>{company?.email}</Text>
                            <Text style={{
                                color: '#000',
                                fontSize: 14,
                                fontFamily: 'poppins_light',
                                width: '100%',
                                textAlign: 'center'
                            }}>{company?.headquater}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: '#13A3E1',
                            paddingVertical: 20,
                            marginHorizontal: 10,
                            marginRight: 30,
                            marginLeft: 30,
                            borderRadius: 30,
                            marginTop: 30
                        }}>
                            <Pressable onPress={() => navigation.push('AppliedUsers', { screen: 0 })} style={{ flex: 1, paddingVertical: 20 }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 14,
                                    fontFamily: 'poppins_medium',
                                    width: '100%',
                                    textAlign: 'center'
                                }}>Applied Users</Text>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 35,
                                    fontFamily: 'poppins_semibold',
                                    width: '100%',
                                    textAlign: 'center',
                                    marginTop: 20
                                }}>{company?.applied}</Text>
                            </Pressable>
                            <View style={{ backgroundColor: '#fff', width: 3 }} />
                            <Pressable onPress={() => navigation.push('SentOffers', { screen: 1 })} style={{ flex: 1, paddingVertical: 20 }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 14,
                                    fontFamily: 'poppins_medium',
                                    width: '100%',
                                    textAlign: 'center'
                                }}>Offer Send</Text>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 35,
                                    fontFamily: 'poppins_semibold',
                                    width: '100%',
                                    textAlign: 'center',
                                    marginTop: 20
                                }}>{company?.sent_offers}</Text>
                            </Pressable>
                        </View>
                        <View style={{
                            flexDirection: 'column',
                            backgroundColor: '#fff',
                            paddingHorizontal: 30,
                            marginHorizontal: 10,
                            marginRight: 30,
                            marginLeft: 30,
                            borderRadius: 30,
                            marginTop: 40,
                        }}>
                            <Pressable onPress={() => navigation.push('ProviderAccountManage')}><View
                                style={{ flexDirection: 'row', flex: 1, marginTop: 20, alignItems: 'center' }}>
                                <Image style={{ width: 20, height: 20 }}
                                    source={require('../assets/manageaccounticon.png')} />
                                <Text style={{
                                    color: '#000',
                                    fontSize: 16,
                                    fontFamily: 'poppins_regular',
                                    width: '100%',
                                    textAlign: 'left',
                                    marginLeft: 20
                                }}>Manage Your Account</Text>
                            </View>
                            </Pressable>

                            <Pressable onPress={() => toggleLoadingVisibility()}><View
                                style={{ flexDirection: 'row', flex: 1, marginTop: 10, alignItems: 'center', marginBottom: 20 }}>
                                <Image style={{ width: 20, height: 20 }}
                                    source={require('../assets/logouticon.png')} />
                                <Text style={{
                                    color: '#000',
                                    fontSize: 16,
                                    fontFamily: 'poppins_regular',
                                    width: '100%',
                                    textAlign: 'left',
                                    marginLeft: 20,

                                }}>Log out </Text>
                            </View>
                            </Pressable>



                        </View>
                    </ScrollView>
                </>}

        </View>
    )
}

export default ProviderProfileInfo
