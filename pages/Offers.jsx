import { Image, TextInput, Text, Pressable, FlatList, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import Resume from "./Resume";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchOffers, FetchSentOffers } from "../API/actions/offersActions";
import moment from "moment/moment";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";


const Offers = ({ navigation }) => {

    const dispatch = useDispatch();

    const [login, isLogin] = useState(false);

    const offers = useSelector(state => state.offers.offers)
    const success = useSelector(state => state.success.allOfferSuccess)
    const noData = useSelector(state => state.nodata.allOfferNoData)
    const error = useSelector(state => state.error.allOfferError)

    const [ID, setID] = useState()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (success || error || noData) {
            setIsLoading(false)
        }
    }, [success, error, noData])


    useEffect(() => {
        GetData()
    }, []);
    const GetData = async () => {
        const value = await AsyncStorage.getItem('ID')
        setID(value);
    }

    const [visible, setVisible] = useState(false)
    const toggleVisibility = () => setVisible(!visible)

    useEffect(() => {
        if (ID) {
            dispatch(FetchOffers(ID))
        }
    }, [dispatch, ID]);

    useEffect(() => {

        console.log(offers)

    }, [offers]);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
                {isLoading ? <View style={{ marginTop: 400 }}>
                    <ActivityIndicator size={60} color="#13A3E1" />
                </View>
                    : <>
                        {error ?
                            <View>
                                <Image source={require('../assets/delete.png')} style={{ width: 30, height: 30, marginLeft: 190, marginBottom: -20, marginTop: 40 }} />
                                <Text style={{ textAlign: 'center', marginVertical: 20, fontFamily: 'poppins_medium' }}>Network Error...!</Text>
                            </View> :
                            <>
                                {noData ? <View style={{ marginTop: 200 }}>
                                    <Image source={require('../assets/nodata.png')}
                                        style={{ width: 260, height: 260, marginLeft: 80, marginBottom: -20, marginTop: 40 }} />
                                    <Text style={{ textAlign: 'center', fontFamily: 'poppins_medium' }}>No Offers Found</Text>
                                </View> :
                                    <>
                                        <View style={{ backgroundColor: '#EAEAEA' }}>
                                            <View style={{ flexDirection: 'row', height: 90 }}>
                                                <Pressable onPress={() => navigation.goBack()} style={{ padiingRight: 5 }}><Image style={{
                                                    width: 22,
                                                    height: 20,
                                                    marginTop: 70,
                                                    marginLeft: 30,
                                                    tintColor: '#000'
                                                }} source={require('../assets/back_arrow.png')} alt={''} /></Pressable>
                                                <View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
                                                    <Pressable onPress={() => navigation.push('SocialMarketing')}><Image
                                                        style={{ width: 150, height: 40, marginTop: 60, alignSelf: 'center' }}
                                                        source={require('../assets/logo.png')} alt={'Okay'} /></Pressable>
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={{
                                                    fontSize: 18,
                                                    fontFamily: 'poppins_bold',
                                                    width: '100%',
                                                    paddingHorizontal: 30,
                                                    textAlign: 'left',
                                                    marginVertical: 20,
                                                    padding: 0
                                                }}>Offers</Text>
                                            </View>
                                            <SafeAreaView>
                                                <FlatList nestedScrollEnabled={false} scrollEnabled={false}
                                                    style={{ marginHorizontal: 0, marginTop: 10 }} data={offers} renderItem={({ item }) => (
                                                        <View style={{
                                                            marginLeft: 25,
                                                            marginRight: 25,
                                                            marginBottom: 8,
                                                            borderColor: '#4C4C4C',
                                                            borderRadius: 15,
                                                            paddingHorizontal: 25,
                                                            paddingVertical: 15,
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            backgroundColor: '#fff'
                                                        }}>
                                                            <View style={{ flex: 1 }}>

                                                                <Text style={{
                                                                    marginLeft: 'auto',
                                                                    textAlign: 'right',
                                                                    fontFamily: 'poppins_medium',
                                                                    fontSize: 13
                                                                }}>{moment(item.date).format('ll')}</Text>
                                                            </View>
                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                <View style={{ flex: 1 }}>
                                                                    <Text numberOfLines={1} style={{
                                                                        fontFamily: 'poppins_bold',
                                                                        marginTop: 5,
                                                                        fontSize: 15,
                                                                        textAlign: "center",
                                                                        color: '#0044a9',
                                                                    }}>{item.offerType}</Text>
                                                                    <Text style={{
                                                                        fontFamily: 'poppins_medium',
                                                                        marginTop: 0,
                                                                        fontSize: 14,
                                                                        textAlign: "center"
                                                                    }}>{item.company_name}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                                <Text style={{
                                                                    fontFamily: 'poppins_bold',
                                                                    fontSize: 16,
                                                                }}>{item.role}</Text>
                                                            </View>
                                                            <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                                                <Text style={{
                                                                    fontFamily: 'poppins_medium',
                                                                    fontSize: 13,
                                                                    textAlign: 'center',
                                                                    marginTop: 4,
                                                                    backgroundColor: '#d9d9d9',
                                                                    paddingHorizontal: 10,
                                                                    paddingVertical: 2,
                                                                    borderRadius: 10,
                                                                    margin: 'auto',
                                                                }}>
                                                                    Salary ${item.salary}
                                                                </Text>
                                                            </View>
                                                            <View style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 15 }}>

                                                                <Text onPress={() => navigation.push('SeekerOfferResponse', { ID: item.id })} style={{ color: 'white', backgroundColor: '#13A3E1', paddingHorizontal: 25, fontSize: 15, fontFamily: 'poppins_bold', borderRadius: 10, paddingVertical: 5 }}
                                                                >View Details</Text>
                                                            </View>
                                                        </View>
                                                    )} />
                                            </SafeAreaView>
                                        </View>
                                    </>}
                            </>}
                    </>}
            </ScrollView>
            <BannerAd
                unitId="ca-app-pub-3940256099942544/6300978111"
                size={BannerAdSize.FULL_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    )
}

export default Offers
