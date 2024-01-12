import React, { useEffect, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import CitySelectModal from '../Components/CitySelectModal'
import { AllCities } from '../API/actions/cityActions'
import { useDispatch, useSelector } from 'react-redux'
import { AllCountries } from '../API/actions/countryActions'
import CountrySelectModal from '../Components/CountrySelectModal'
import ProviderTypeModal from '../Components/ProviderTypeModal'
import Toast from 'react-native-toast-message'
import { completeCompany } from "../API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneModal from '../Components/PhoneModal'

const ProviderProfile = ({ navigation }) => {
console.log("helllllllllloo");
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const dispatch = useDispatch();
    const [cityVisible, setCityVisible] = useState(false)
    const [countryVisible, setCountryVisible] = useState(false)

    const [nameCity, setNameCity] = useState()
    const [countryName, setCountryName] = useState()
    const [country, setCountry] = useState()
    const [citiesData, setCitiesData] = useState()
    const [ID, setID] = useState()
    const [phoneCode, setPhoneCode] = useState('')

    useEffect(() => {
        GetData()
    }, []);
    const GetData = async () => {
        const value = await AsyncStorage.getItem('ID')
        setID(value);
    }

    const [updateData, setUpdateData] = useState({
        city: '',
        country: '',
        phone: '',
        headquater: '',
        type: ''
    })
    const toggleVisibility = () => setCityVisible(!cityVisible)
    const toggleCountryVisibility = () => setCountryVisible(!countryVisible)

    const cities = useSelector(state => state.city.cities)
    const countries = useSelector(state => state.country.countries)

    const success = useSelector(state => state.success.companySuccess)


    useEffect(() => {
        if (!cities) {
            dispatch(AllCities())
        }
    }, [dispatch, cities]);

    useEffect(() => {
        if (!countries) {
            dispatch(AllCountries())
        }
    }, [dispatch, countries]);

    const cityClick = (item) => {
        setUpdateData({ ...updateData, city: item.id })
        toggleVisibility()
        setNameCity(item.name)
    }

    const countryClick = (item) => {
        setCountry(item.id)
        setUpdateData({ ...updateData, country: item.id })
        toggleCountryVisibility()
        setCountryName(item.name)
    }

    const typeClick = (value) => [
        setUpdateData({ ...updateData, type: value })
    ]

    const updateProfile = () => {
        if (phoneCode !== '') {
            if (updateData.country !== '') {
                if (updateData.city !== '') {
                    if (updateData.phone !== '') {
                        if (updateData.headquater !== '') {
                            if (updateData.type !== '') {
                                completeCompany(updateData.country, updateData.city, phoneCode, updateData.phone, updateData.headquater, updateData.type, ID).then(res => {
                                    const { data: { data } } = res;
                                    const { data: { responseCode } } = res;
                                    const { data: { message } } = res;
                                    console.log(message)
                                    if (responseCode === 200) {
                                        navigation.replace('PostJob')
                                    } else {
                                        Toast.show({ type: 'error', position: 'top', text1: 'Unexpected Error Occured!', text2: 'Unable to post data please try again later' })
                                    }
                                })
                            } else {
                                Toast.show({ type: 'error', position: 'top', text1: 'Please Enter Your Company Type' })
                            }
                        } else {
                            Toast.show({ type: 'error', position: 'top', text1: 'Please Enter Address' })
                        }
                    } else {
                        Toast.show({ type: 'error', position: 'top', text1: 'Please Enter Phone Number' })
                    }
                } else {
                    Toast.show({ type: 'error', position: 'top', text1: 'Please Enter Your City' })
                }
            } else {
                Toast.show({ type: 'error', position: 'top', text1: 'Please Enter Your Country' })
            }
        } else {
            Toast.show({ type: 'error', position: 'top', text1: 'Please Enter Country Code' })
        }

    }

    const [type, setType] = useState(false)
    const toggleType = () => setType(!type)

    const [phoneVisible, setPhoneVisible] = useState(false)
    const togglePhoneVisible = () => setPhoneVisible(!phoneVisible)

    const setCode = (code) => {
        setPhoneCode(code)
        togglePhoneVisible()
    }

    useEffect(() => {
        const searched = cities?.filter((data) => {
            return data.country === country
        })
        setCitiesData(searched)
        setNameCity('')
        setUpdateData({ ...updateData, city: null })
    }, [country]);

    return (

        <View style={{ flex: 1, backgroundColor: '#F0A51E' }}>

            <CitySelectModal visible={cityVisible} toggleVisibility={toggleVisibility} list={citiesData}
                click={cityClick} />
            <PhoneModal visible={phoneVisible} togglePhoneVisible={togglePhoneVisible} set={setCode} />
            <CountrySelectModal visible={countryVisible} toggleVisibility={toggleCountryVisibility} list={countries}
                click={countryClick} />
            <ProviderTypeModal visible={type} toggleVisibility={toggleType} click={typeClick} />


            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Text style={{
                    color: 'white',
                    fontFamily: 'poppins_bold',
                    fontSize: 17,
                    width: 250,
                    textAlign: 'center',
                    marginBottom: 10
                }}>
                    Please Complete Your Profile !!!
                </Text>


                <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 15, elevation: 10, }}>
                    <Pressable onPress={() => togglePhoneVisible()} style={{
                        textAlign: 'center',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        paddingVertical: 10,
                        borderColor: '#b2b2b2',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        width: '20%',
                        borderTopLeftRadius: 25,
                        borderBottomLeftRadius: 25,
                        alignItems: 'center'
                    }}><TextInput style={{ color: '#000' }} editable={false}
                        placeholder={"+01"}>{phoneCode}</TextInput></Pressable>
                    <TextInput keyboardType='numeric' onChangeText={text => setUpdateData({ ...updateData, phone: text })}
                        placeholder="Enter Your Number" style={{
                            textAlign: 'left',
                            paddingHorizontal: 8,
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            paddingVertical: 10,
                            width: '72%',
                            borderColor: '#b2b2b2',
                            borderTopRightRadius: 25,
                            borderBottomRightRadius: 25,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderRightWidth: 1,
                            backgroundColor: 'white'
                        }}></TextInput>
                </View>
                {/* <View style={{ marginTop: 50, paddingVertical: 5 }}>
                    <PhoneInput
                        layout='first'
                        defaultCode='PK'
                        containerStyle={{ borderRadius: 60, width: 350, paddingRight: 20, height: 50 }}
                        placeholder='Enter Your Number'
                        onChangeText={text => setUpdateData({ ...updateData, phone: text })}
                    />
                </View> */}


                <Pressable
                    onPress={() => toggleCountryVisibility()}
                    style={{
                        paddingVertical: 10,
                        backgroundColor: '#fff',
                        width: '85%',
                        borderRadius: 25,
                        marginTop: 10,
                        paddingHorizontal: 20,
                        color: '#626262',
                        elevation: 10
                    }}>
                    <TextInput style={{ color: '#000' }} editable={false} value={countryName}
                        placeholder='Enter your Country'
                        inputMode={'text'} />
                </Pressable>
                <Pressable onPress={() => toggleVisibility()} style={{
                    paddingVertical: 10,
                    backgroundColor: '#fff',
                    width: '85%',
                    borderRadius: 25,
                    marginTop: 15,
                    paddingHorizontal: 20,
                    color: '#626262',
                    elevation: 10
                }}>
                    <TextInput style={{ color: '#000' }} value={nameCity} editable={false}
                        placeholder={'Enter your City'} />
                </Pressable>

                {/* <TextInput onChangeText={text => setUpdateData({ ...updateData, phone: text })} style={{
                    height: 50,
                    backgroundColor: '#fff',
                    width: '85%',
                    borderRadius: 25,
                    marginTop: 15,
                    paddingHorizontal: 20,
                    color: '#626262',
                    elevation: 10
                }} placeholder={'Enter your Phone'} /> */}


                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                    backgroundColor: '#fff',
                    elevation: 10,
                    borderRadius: 25,
                    width: '85%',
                    paddingRight: 20
                }}>
                    <TextInput onChangeText={text => setUpdateData({ ...updateData, headquater: text })} style={{
                        height: 50,
                        paddingHorizontal: 20,
                        color: '#626262',
                        flex: 1
                    }} placeholder={'Enter your HeadQuarter Address'} />

                </View>
                <Pressable onPress={() => toggleType()}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 15,
                        backgroundColor: '#fff',
                        elevation: 10,
                        borderRadius: 25,
                        width: '85%',
                        paddingRight: 20
                    }}>

                        <TextInput value={updateData.type} editable={false}
                            onChangeText={text => setUpdateData({ ...updateData, type: text })}
                            style={{
                                height: 50,
                                paddingHorizontal: 20,
                                color: '#626262',
                                flex: 1
                            }} placeholder={'Enter your Company Type'} />

                    </View>
                </Pressable>

                <Pressable onPress={() => updateProfile()} style={{
                    width: '85%',
                    backgroundColor: '#13A3E1',
                    alignItems: 'center',
                    borderRadius: 25,
                    marginTop: 50,
                    paddingVertical: 15
                }}><Text style={{ color: '#fff', fontWeight: '900', fontSize: 15 }}>Continue</Text></Pressable>

            </View>
            <Toast
                position='top'
                bottomOffset={20}
            />
        </View>

    )
}

export default ProviderProfile
