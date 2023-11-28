import {
    ActivityIndicator,
    BackHandler,
    FlatList,
    Image,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckSeeker, fetchSeeker, updateSeeker } from "../API/actions/seekerActions";
import { AllCities } from "../API/actions/cityActions";
import { AllCountries } from "../API/actions/countryActions";
import { PhoneData, RESET, RESET_SEEKER } from "../Utils/Constants";
import city from "../API/reducers/city";
import CitySelectModal from "../Components/CitySelectModal";
import CountrySelectModal from "../Components/CountrySelectModal";
import GenderModal from "../Components/GenderModal";
import DatePicker from "react-native-date-picker";
import Ripple from "react-native-material-ripple";
import PhoneInput from "react-native-phone-number-input";
import PhoneModal from "../Components/PhoneModal";
import VerificationStatusModal from "../Components/VerificationStatusModal";
import {checkCV} from "../API";

function PersonalInfo({ navigation }) {

    const [stateCheck, setStateCheck] = useState(false)
    const seeker = useSelector(state => state.seeker.seeker)
    const cities = useSelector(state => state.city.cities)
    const countries = useSelector(state => state.country.countries)
    const success = useSelector(state => state.success.seekerSuccess)
    const nodata = useSelector(state => state.nodata.seekerNoData)
    const error = useSelector(state => state.error.seekerError)
    const checkCV = useSelector(state => state.cv.check)

    const [completed, setCompleted] = useState(false)
    const [verified, setVerified] = useState(false)
    const [country, setCountry] = useState()
    const [citiesData, setCitiesData] = useState()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (nodata || error || success) {
            setLoading(false)
            setCitiesData(cities)
        }
    }, [success, error, nodata])

    const dispatch = useDispatch();
    const [ID, setID] = useState()
    const [seekerData, setSeekerData] = useState({
        name: '',
        city: '',
        country: '',
        username: '',
        phone: '',
        address: '',
        dob: '',
        gender: '',
        id: ''
    })

    const [cityName, setNameCity] = useState('')
    const [countryName, setCountryName] = useState('')
    const [phoneCode, setPhoneCode] = useState('')
    const [gen, setGen] = useState('')
    const [trigger, setTrigger] = useState(false)

    const [cityVisible, setCityVisible] = useState(false)
    const [countryVisible, setCountryVisible] = useState(false)

    const [changed, setChanged] = useState(false)

    const toggleVisibility = () => setCityVisible(!cityVisible)
    const toggleCountryVisibility = () => setCountryVisible(!countryVisible)

    useEffect(() => {
        GetData()
    }, []);
    const GetData = async () => {
        const value = await AsyncStorage.getItem('ID')
        setID(value);
    }

    useEffect(() => {
        if (ID) {
            if (!seeker) {
                dispatch(fetchSeeker(ID))
            } else if ((seeker.id).toString() !== ID) {
                dispatch(fetchSeeker(ID))
            } else {
                setLoading(false)
            }
        }
    }, [dispatch, seeker, ID, navigation, trigger]);

    useEffect(() => {
        if (seeker) {
            setLoadingVisible(false)
            setSeekerData({
                ...seekerData,
                name: seeker?.name,
                city: seeker?.city,
                country: seeker?.country,
                username: seeker?.username,
                code: seeker?.code,
                phone: seeker?.phone,
                address: seeker?.address,
                dob: seeker?.dob,
                gender: seeker?.gender,
                id: seeker?.id
            })
            setCountry(seeker?.country)
            setPhoneCode(seeker?.code)
            setGen(seeker?.gender)
            setNameCity(seeker?.city_name)
            setCountryName(seeker?.country_name)
        }
        dispatch(CheckSeeker(seeker?.id))
        if (seeker?.address && seeker?.city && seeker?.country && seeker?.dob && seeker?.email && seeker?.gender && seeker?.id && seeker?.name && seeker?.password && seeker?.code && seeker?.phone && seeker?.username) {
            setCompleted(true)
        } else {
            setCompleted(false)
        }
        if (seeker?.verified === "true") {
            setVerified(true)
        } else {
            setVerified(false)
        }
    }, [seeker])

    const updateGender = (gender) => {
        setSeekerData({ ...seekerData, gender: gender })
        setGen(gender)
    }

    useEffect(() => {
        console.log(seekerData)
    }, [seekerData]);

    const update = () => {
        console.log(seekerData)
        dispatch(updateSeeker(seekerData.name, seekerData.city, seekerData.country, seekerData.username, seekerData.code, seekerData.phone, seekerData.address, seekerData.dob, seekerData.gender, seekerData.id))
        toggleLoadingVisibility()
        dispatch({ type: RESET })
        setTrigger(!trigger)
    }

    const [loadingVisible, setLoadingVisible] = useState(false)
    const toggleLoadingVisibility = () => setLoadingVisible(!loadingVisible);

    useEffect(() => {
        if (success) {
            setLoadingVisible(false)
        }
    }, [success]);

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
        setSeekerData({ ...seekerData, city: item.id })
        toggleVisibility()
        setNameCity(item.name)
    }

    const countryClick = (item) => {
        setSeekerData({ ...seekerData, country: item.id })
        setCountry(item.id)
        toggleCountryVisibility()
        setCountryName(item.name)
    }

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    // gendermodal==============

    const [gender, setGender] = useState(false)
    const toggleGenderVisibility = () => setGender(!gender)

    const [phoneVisible, setPhoneVisible] = useState(false)
    const togglePhoneVisible = () => setPhoneVisible(!phoneVisible)

    const setCode = (code) => {
        setPhoneCode(code)
        setSeekerData({ ...seekerData, code: code })
        togglePhoneVisible()
    }

    useEffect(() => {
        const searched = cities?.filter((data) => {
            return data.country === country
        })
        setCitiesData(searched)
    }, [country]);

    const [visible, setVisible] = useState(false)
    const toggleVisible = () => setVisible(!visible)
    const [text, setText] = useState('Please Complete your Profile First')
    const click = (t) => {
        toggleVisible();
        setText(t)
    }



    return (
        <View style={{ flex: 1 }}>
            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <VerificationStatusModal visible={visible} toggleVisibility={toggleVisible} line={text} />

            <PhoneModal visible={phoneVisible} togglePhoneVisible={togglePhoneVisible} set={setCode} />
            <CitySelectModal visible={cityVisible} toggleVisibility={toggleVisibility} list={citiesData} click={cityClick} />
            <CountrySelectModal visible={countryVisible} toggleVisibility={toggleCountryVisibility} list={countries}
                click={countryClick} />
            <GenderModal visible={gender} toggleVisibility={toggleGenderVisibility} set={updateGender} />
            <Modal visible={loadingVisible} animationType={"fade"} transparent={true}>
                <View style={{
                    flex: 1,
                    alignContent: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(66, 66, 66, 0.4)'
                }}>
                    <View style={{
                        margin: 35,
                        elevation: 24,
                        borderRadius: 25,
                        backgroundColor: '#fff',
                        opacity: 1,
                        padding: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 100
                    }}>
                        <Text style={{ paddingBottom: 16, fontSize: 14, fontFamily: 'poppins_medium' }}>Please Wait
                            ...</Text>
                        <ActivityIndicator size={60} color="#13A3E1" />
                    </View>
                </View>
            </Modal>

            <ScrollView style={{ flex: 1, backgroundColor: 'white', }} keyboardShouldPersistTaps='handled'>
                <View style={{ flexDirection: 'column', width: '100%', height: 240, backgroundColor: '#13A3E1' }}>
                    <View style={{ flexDirection: 'row', height: 130 }}>
                        <Pressable onPress={() => navigation.goBack()} style={{ padiingRight: 5 }}><Image style={{
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
                    <Text style={{
                        color: '#fff',
                        fontSize: 20,
                        fontFamily: 'poppins_bold',
                        width: '100%',
                        textAlign: 'center',
                        marginTop: 10
                    }}>Personal Info</Text>
                    {!completed ?
                        <Text style={{
                            color: '#fff',
                            fontSize: 12,
                            fontFamily: 'poppins_semibold',
                            width: '60%',
                            alignSelf: 'center',
                            textAlign: 'center',
                            marginTop: 5,
                            backgroundColor: '#ff0000',
                            borderRadius: 10,
                            paddingTop: 1
                        }}>Complete Your Profile</Text>
                        : ''}
                </View>
                {loading ?
                    <View style={{ marginTop: 200 }}>
                        <ActivityIndicator size={60} color="#13A3E1" />
                    </View>
                    :
                    <>
                        <View style={{
                            flexDirection: 'column',
                            borderColor: '#b2b2b2',
                            backgroundColor: '#fff',
                            marginHorizontal: 10,
                            marginRight: 30,
                            marginLeft: 30,
                            borderRadius: 30,
                            marginTop: 20
                        }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <View style={{
                                    flex: 0.7,
                                    backgroundColor: '#E6E6E6',
                                    borderTopLeftRadius: 30,
                                    borderColor: '#b2b2b2',
                                    borderWidth: 1,
                                    paddingHorizontal: 20,
                                    paddingVertical: 5
                                }}>
                                    <Text style={{
                                        color: '#000',
                                        fontSize: 14,
                                        fontFamily: 'poppins_light',
                                        width: '100%',
                                        textAlign: 'left'
                                    }}>Name</Text>
                                </View>
                                <View style={{
                                    flex: 1.3,
                                    borderTopRightRadius: 30,
                                    borderColor: '#b2b2b2',
                                    borderWidth: 1,
                                    paddingHorizontal: 20,
                                    paddingVertical: 5
                                }}>
                                    <TextInput onChangeText={(text) => setSeekerData({ ...seekerData, name: text })}
                                        placeholder={'Missing!!!'} style={{
                                            color: '#000',
                                            fontSize: 14,
                                            fontFamily: 'poppins_medium',
                                            width: '100%',
                                            textAlign: 'left'
                                        }}>{seeker?.name}</TextInput>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, marginTop: -1 }}>
                                <View style={{
                                    flex: 0.7,
                                    backgroundColor: '#E6E6E6',
                                    borderColor: '#b2b2b2',
                                    borderWidth: 1,
                                    paddingHorizontal: 20,
                                    paddingVertical: 5
                                }}>
                                    <Text style={{
                                        color: '#000',
                                        fontSize: 14,
                                        fontFamily: 'poppins_light',
                                        width: '100%',
                                        textAlign: 'left'
                                    }}>Birthday</Text>
                                </View>
                                <View style={{
                                    flex: 1.3,
                                    borderColor: '#b2b2b2',
                                    borderWidth: 1,
                                    paddingHorizontal: 20,
                                    paddingVertical: 5
                                }}>
                                    <TextInput
                                        onChangeText={(text) => setSeekerData({ ...seekerData, dob: text })}
                                        placeholder={'MM/DD/YYYY'} style={{
                                            color: '#000',
                                            fontSize: 14,
                                            fontFamily: 'poppins_medium',
                                            width: '100%',
                                            textAlign: 'left'
                                        }}>{seeker?.dob}</TextInput>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, marginTop: -1 }}>
                                <View style={{
                                    flex: 0.7,
                                    backgroundColor: '#E6E6E6',
                                    borderBottomLeftRadius: 30,
                                    borderColor: '#b2b2b2',
                                    borderWidth: 1,
                                    paddingHorizontal: 20,
                                    paddingVertical: 5
                                }}>
                                    <Text style={{
                                        color: '#000',
                                        fontSize: 14,
                                        fontFamily: 'poppins_light',
                                        width: '100%',
                                        textAlign: 'left'
                                    }}>Gender</Text>
                                </View>
                                <Pressable onPress={() => toggleGenderVisibility()}
                                    style={{
                                        flex: 1.3,
                                        borderBottomRightRadius: 30,
                                        borderColor: '#b2b2b2',
                                        borderWidth: 1,
                                        paddingHorizontal: 20,
                                        paddingVertical: 5
                                    }}>
                                    <View>
                                        <TextInput
                                            editable={false}
                                            onTouchStart={() => toggleGenderVisibility()}
                                            placeholder={'Missing!!!'} style={{
                                                color: '#000',
                                                fontSize: 14,
                                                fontFamily: 'poppins_medium',
                                                width: '100%',
                                                textAlign: 'left'
                                            }}>{gen}</TextInput>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'column',
                            borderColor: '#b2b2b2',
                            backgroundColor: '#fff',
                            marginHorizontal: 10,
                            marginRight: 30,
                            marginLeft: 30,
                            borderRadius: 30,
                            marginTop: 20
                        }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <View style={{
                                    flex: 0.7,
                                    backgroundColor: '#E6E6E6',
                                    borderTopLeftRadius: 30,
                                    borderColor: '#b2b2b2',
                                    borderWidth: 1,
                                    paddingHorizontal: 20,
                                    paddingVertical: 5
                                }}>
                                    <Text style={{
                                        color: '#000',
                                        fontSize: 14,
                                        fontFamily: 'poppins_light',
                                        width: '100%',
                                        textAlign: 'left'
                                    }}>Email</Text>
                                </View>
                                <View style={{
                                    flex: 1.3,
                                    borderTopRightRadius: 30,
                                    borderColor: '#b2b2b2',
                                    borderWidth: 1,
                                    paddingHorizontal: 20,
                                    paddingVertical: 5
                                }}>
                                    <TextInput editable={false} placeholder={'Missing!!!'} style={{
                                        color: '#000',
                                        fontSize: 14,
                                        fontFamily: 'poppins_medium',
                                        width: '100%',
                                        textAlign: 'left'
                                    }}>{seeker?.email}</TextInput>
                                </View>
                            </View>

                            {/* <View style={{ flexDirection: 'row', flex: 1, marginTop: -1 }}>
                                <View style={{
                                    flex: 0.7,
                                    backgroundColor: '#E6E6E6',
                                    borderColor: '#b2b2b2',
                                    borderWidth: 1,
                                    paddingHorizontal: 20,
                                    paddingVertical: 5
                                }}>
                                    <Text style={{
                                        color: '#000',
                                        fontSize: 14,
                                        fontFamily: 'poppins_light',
                                        width: '100%',
                                        textAlign: 'left'
                                    }}>Phone</Text>
                                </View>
                                <View style={{
                                    flex: 1.3,
                                    borderColor: '#b2b2b2',
                                    borderWidth: 1,
                                    paddingHorizontal: 20,
                                    paddingVertical: 5
                                }}>
                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                        <TextInput
                                            onChangeText={(text) => setSeekerData({ ...seekerData, phone: text })}
                                            placeholder={'Missing!!!'} style={{
                                                fontSize: 14,
                                                fontFamily: 'poppins_medium',
                                                textAlign: 'left',
                                                width: '90%'
                                            }}>{seeker?.phone}</TextInput>
                                        {verified ?
                                            <Image style={{ width: 14, height: 14, marginLeft: 'auto' }}
                                                source={require('../assets/verified.png')} />
                                            :
                                            <Image style={{ width: 14, height: 14, marginLeft: 'auto' }}
                                                source={require('../assets/unverified.png')} />
                                        }
                                    </View>
                                </View>
                            </View> */}

                            <View style={{ flexDirection: 'row', flex: 1, marginTop: -1 }}>
                                <View style={{
                                    flex: 0.7,
                                    backgroundColor: '#E6E6E6',
                                    borderColor: '#b2b2b2',
                                    borderWidth: 1,
                                    paddingHorizontal: 20,
                                    paddingVertical: 5
                                }}>
                                    <Text style={{
                                        color: '#000',
                                        fontSize: 14,
                                        fontFamily: 'poppins_light',
                                        width: '100%',
                                        textAlign: 'left'
                                    }}>Address</Text>
                                </View>
                                <View style={{
                                    flex: 1.3,
                                    borderColor: '#b2b2b2',
                                    borderWidth: 1,
                                    paddingHorizontal: 20,
                                    paddingVertical: 5
                                }}>
                                    <TextInput onChangeText={(text) => setSeekerData({ ...seekerData, address: text })}
                                        placeholder={'Missing!!!'} style={{
                                            color: '#000',
                                            fontSize: 14,
                                            fontFamily: 'poppins_medium',
                                            width: '100%',
                                            textAlign: 'left'
                                        }}>{seeker?.address}</TextInput>
                                </View>
                            </View>


                            <View style={{
                                flexDirection: 'column',
                                borderColor: '#b2b2b2',
                                backgroundColor: '#fff',
                                borderRadius: 30,
                            }}>
                                <View style={{ flexDirection: 'row', flex: 1, marginTop: -1 }}>
                                    <View style={{
                                        flex: 0.7,
                                        backgroundColor: '#E6E6E6',
                                        borderColor: '#b2b2b2',
                                        borderWidth: 1,
                                        paddingHorizontal: 20,
                                        paddingVertical: 5
                                    }}>
                                        <Text style={{
                                            color: '#000',
                                            fontSize: 14,
                                            fontFamily: 'poppins_light',
                                            width: '100%',
                                            textAlign: 'left'
                                        }}>Country</Text>
                                    </View>
                                    <View style={{
                                        flex: 1.3,
                                        borderColor: '#b2b2b2',
                                        borderWidth: 1,
                                        paddingHorizontal: 20,
                                        paddingVertical: 5
                                    }}>
                                        <Pressable onPress={() => toggleCountryVisibility()}><TextInput editable={false}
                                            onFocus={() => toggleCountryVisibility()}
                                            placeholder={'Missing!!!'}
                                            style={{
                                                color: '#000',
                                                fontSize: 14,
                                                fontFamily: 'poppins_medium',
                                                width: '100%',
                                                textAlign: 'left'
                                            }}>{countryName}</TextInput></Pressable>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <View style={{
                                        flex: 0.7,
                                        backgroundColor: '#E6E6E6',
                                        borderBottomLeftRadius: 30,

                                        borderColor: '#b2b2b2',
                                        borderWidth: 1,
                                        paddingHorizontal: 20,
                                        paddingVertical: 5
                                    }}>
                                        <Text style={{
                                            color: '#000',
                                            fontSize: 14,
                                            fontFamily: 'poppins_light',
                                            width: '100%',
                                            textAlign: 'left'
                                        }}>City</Text>
                                    </View>
                                    <View style={{
                                        flex: 1.3,
                                        borderBottomRightRadius: 30,

                                        borderColor: '#b2b2b2',
                                        borderWidth: 1,
                                        paddingHorizontal: 20,
                                        paddingVertical: 5
                                    }}>
                                        <Pressable onPress={() => toggleVisibility()}><TextInput editable={false}
                                            onFocus={() => toggleVisibility()}
                                            placeholder={'Missing!!!'}
                                            style={{
                                                color: '#000',
                                                fontSize: 14,
                                                fontFamily: 'poppins_medium',
                                                width: '100%',
                                                textAlign: 'left'
                                            }}>{cityName}</TextInput></Pressable>
                                    </View>
                                </View>




                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 'auto', marginRight: 'auto', }}>
                            <TextInput editable={false} style={{
                                textAlign: 'center',
                                paddingHorizontal: 10,
                                marginTop: 'auto',
                                marginBottom: 'auto',
                                paddingVertical: 8,
                                borderRightWidth: 1,
                                width: '20%',
                                color: 'black',
                                fontFamily: 'poppins_regular',
                                borderColor: '#b2b2b2',
                                borderTopLeftRadius: 30,
                                borderWidth: 1,
                                borderBottomLeftRadius: 30,
                                backgroundColor: '#E6E6E6',
                            }}>Phone</TextInput>
                            <TextInput editable={!verified} placeholder="country code" onTouchStart={() => { if (!verified) { togglePhoneVisible() } }} style={{
                                textAlign: 'center',
                                paddingHorizontal: 6,
                                marginTop: 'auto',
                                marginBottom: 'auto',
                                paddingVertical: 8,
                                borderColor: '#b2b2b2',
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderRightWidth: 1
                            }}>{phoneCode}</TextInput>
                            <TextInput editable={!verified} onChangeText={text => setSeekerData({ ...seekerData, phone: text })}
                                placeholder="Enter Your Number" style={{
                                    textAlign: 'left',
                                    paddingHorizontal: 10,
                                    marginTop: 'auto',
                                    marginBottom: 'auto',
                                    paddingVertical: 8,
                                    width: '46%',
                                    borderColor: '#b2b2b2',
                                    borderTopRightRadius: 20,
                                    borderBottomRightRadius: 20,
                                    borderTopWidth: 1,
                                    borderBottomWidth: 1,
                                    borderRightWidth: 1
                                }}>{seeker?.phone}</TextInput>
                        </View>
                        <Pressable onPress={() => update()} style={{
                            backgroundColor: '#13A3E1',
                            borderRadius: 25,
                            alignItems: 'center',
                            padding: 15,
                            marginTop: 15,
                            marginHorizontal: 25
                        }}>
                            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}>
                                Update
                            </Text>
                        </Pressable>
                        {seeker?.type === "GOOGLE" ?
                            <Pressable onPress={() => null}
                                style={{
                                    borderColor: '#000',
                                    borderWidth: 1,
                                    borderRadius: 25,
                                    alignItems: 'center',
                                    padding: 15,
                                    marginTop: 15,
                                    marginHorizontal: 25
                                }}><Text style={{ color: '#000', fontWeight: '800', fontSize: 15 }}>Logged In using
                                    Google</Text></Pressable>
                            :
                            <Pressable onPress={() => {
                                if (completed) {
                                    if (verified) {

                                        navigation.push('Verify', {
                                            code: seeker?.code,
                                            verifyPhone: seeker?.phone,
                                            type: "SEEKER",
                                            verify: false,
                                            forgot: true,
                                            ID: ID
                                        })
                                    } else {
                                        navigation.push('Verify', {
                                            code: seeker?.code,
                                            verifyPhone: seeker?.phone,
                                            type: "SEEKER",
                                            verify: false,
                                            ID: ID
                                        })
                                    }
                                } else {
                                    click('Please Complete Your Profile First')
                                }

                            }}
                                style={{
                                    borderColor: '#000',
                                    borderWidth: 1,
                                    borderRadius: 25,
                                    alignItems: 'center',
                                    padding: 15,
                                    marginTop: 15,
                                    marginHorizontal: 25
                                }}><Text style={{ color: '#000', fontWeight: '800', fontSize: 15 }}>Change
                                    Password</Text></Pressable>
                        }
                        {!verified ?
                            <Pressable onPress={() => {
                                if (completed) {

                                    navigation.push('Verify', {
                                        code: seeker?.code,
                                        verifyPhone: seeker?.phone,
                                        type: "SEEKER",
                                        verify: true,
                                        ID: ID
                                    })

                                } else {
                                    click('Please Complete Your Profile First')

                                }
                            }
                            }
                                style={{
                                    borderColor: '#000',
                                    backgroundColor: '#000',
                                    borderWidth: 1,
                                    borderRadius: 25,

                                    alignItems: 'center',
                                    padding: 15,
                                    marginTop: 15,
                                    marginHorizontal: 25,
                                }}><Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}>Verify
                                    Phone</Text></Pressable>
                            :
                            ''
                        }
                        {seeker?.plan === 0 ?
                            <Ripple rippleColor="white"
                                onPress={() => {
                                    if (completed) {
                                        if (verified) {
                                            if (checkCV === "complete") {
                                                navigation.push('SeekerPlans')
                                            } else {
                                                click('Please Complete your CV First')
                                            }
                                        } else{
                                            click('Please Verify Phone First')
                                        }
                                    } else {
                                        click('Please Complete your Profile First')
                                    }

                                }}
                                style={{
                                    backgroundColor: 'green',
                                    borderRadius: 25,
                                    alignItems: 'center',
                                    padding: 15,
                                    marginTop: 15,
                                    marginHorizontal: 25,
                                    marginBottom: 25
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}
                                >Activate Account
                                </Text>
                            </Ripple>
                            : ''}
                    </>}
            </ScrollView>
        </View>
    )
}

export default PersonalInfo
