import { Image, TextInput, Text, Pressable, FlatList, ScrollView, SafeAreaView } from 'react-native'
import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AllCities } from "../API/actions/cityActions";
import { ActivityIndicator } from 'react-native'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

function Cities({ navigation }) {

    const cities = useSelector(state => state.city.cities)

    const success = useSelector(state => state.success.allCitySuccess)
    const error = useSelector(state => state.error.allCityError)
    const nodata = useSelector(state => state.nodata.allCityNoData)
    const dispatch = useDispatch()
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (success || error || nodata) {
            setIsLoading(false)
        }
    }, [success, error, nodata])


    useEffect(() => {
        if (!cities) {
            dispatch(AllCities())
        } else {
            setIsLoading(false)
        }
    }, [dispatch, navigation, cities]);

    useEffect(() => {
        if (cities) {
            setData(cities)
        }
    }, [cities]);

    const search = (query) => {
        const searched = cities.filter((city) => {
            return (city.name).toLowerCase().includes(query.toLowerCase());
        })
        setData(searched)
    }

    return (
        <View style={{ flex:1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: '#F1F1F1' }}>

            {isLoading ?
                <View style={{ marginTop: 400 }}>
                    <ActivityIndicator size={60} color="#13A3E1" />
                </View>
                :
                <>
                    {nodata ? <View style={{ marginTop: 200 }}>
                        <Image source={require('../assets/nodata.png')}
                            style={{ width: 260, height: 260, marginLeft: 80, marginBottom: -20, marginTop: 40 }} />
                        <Text style={{ textAlign: 'center', fontFamily: 'poppins_medium' }}>No Data Found</Text>
                    </View> :
                        <>
                            {error ?
                                <View style={{ marginTop: 360 }}>
                                    <Image source={require('../assets/delete.png')} style={{
                                        width: 30,
                                        height: 30,
                                        marginLeft: 190,
                                        marginBottom: -20,
                                        marginTop: 40
                                    }} />
                                    <Text
                                        style={{ textAlign: 'center', marginVertical: 20, fontFamily: 'poppins_medium' }}>Network
                                        Error...!</Text>
                                </View> : <>
                                    <View style={{ backgroundColor: '#F1F1F1' }}>
                                        <View style={{ flexDirection: 'row', height: 90 }}>
                                            <Pressable onPress={() => navigation.goBack()}
                                                style={{ paddingRight: 5 }}><Image style={{
                                                    width: 22,
                                                    height: 20,
                                                    marginTop: 70,
                                                    marginLeft: 30,
                                                    tintColor: '#000'
                                                }} source={require('../assets/back_arrow.png')} alt={'Okay'} /></Pressable>
                                            <View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
                                                <Pressable
                                                // onPress={() => navigation.push('Categories')}
                                                ><Image
                                                        style={{ width: 150, height: 40, marginTop: 60, alignSelf: 'center' }}
                                                        source={require('../assets/logo.png')} alt={'Okay'} /></Pressable>
                                            </View>
                                        </View>
                                        {/*<View style={{ display: "flex", flexDirection: "row", marginTop: 40 }}>*/}
                                        {/*    <Image style={{ width: 40, height: 25, marginLeft: 25, marginTop: 15, alignSelf: 'flex-start' }} source={require('../assets/back_arrow.png')} />*/}
                                        {/*    <Pressable onPress={() => navigation.push('Categories')}>*/}
                                        {/*    <Image style={{ width: 160, height: 50, marginLeft: 60 }} source={require('../assets/logo.png')} />*/}
                                        {/*    </Pressable>*/}
                                        {/*    <Image style={{ width: 30, height: 30, marginLeft: 65, marginTop: 12 }} source={require('../assets/home.png')} />*/}
                                        {/*</View>*/}
                                        <View>
                                            <TextInput onChangeText={text => search(text)} style={{
                                                backgroundColor: '#fff',
                                                marginHorizontal: 30,
                                                height: 50,
                                                borderRadius: 25,
                                                paddingHorizontal: 20,
                                                marginTop: 30,
                                                borderColor: 'black',
                                                fontSize: 17,
                                                elevation: 10
                                            }} placeholder={'Search'} />
                                            <Text style={{
                                                fontSize: 18,
                                                fontFamily: 'poppins_bold',
                                                width: '100%',
                                                textAlign: 'center',
                                                marginVertical: 20,
                                                padding: 0
                                            }}>Browse by Cities</Text>
                                        </View>
                                        <SafeAreaView style={{
                                            backgroundColor: '#fff',
                                            borderRadius: 5,
                                            padding: 23,
                                            borderTopLeftRadius: 40,
                                            borderTopRightRadius: 40,
                                            marginTop: 9
                                        }}>
                                            {/*{data?.map((item, index) => {*/}
                                            {/*    return (*/}
                                            {/*    <Pressable key={index} onPress={() => navigation.push('JobsByCity', { CITYID: item.id })}>*/}
                                            {/*        <View*/}
                                            {/*            style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                                            {/*            <Text style={{*/}
                                            {/*                fontSize: 15,*/}
                                            {/*                fontWeight: 600,*/}
                                            {/*                fontFamily: 'poppins_semibold'*/}
                                            {/*            }}>{item.name}</Text>*/}
                                            {/*            <Text style={{*/}
                                            {/*                marginTop: 4,*/}
                                            {/*                fontSize: 15,*/}
                                            {/*                fontFamily: 'poppins_light',*/}
                                            {/*                marginHorizontal: 15*/}
                                            {/*            }}>-</Text>*/}
                                            {/*            <Text style={{*/}
                                            {/*                fontSize: 12,*/}
                                            {/*                fontWeight: 200,*/}
                                            {/*                fontFamily: 'poppins_light'*/}
                                            {/*            }}>{item.country_name}</Text>*/}
                                            {/*        </View>*/}
                                            {/*        <View style={{*/}
                                            {/*            backgroundColor: '#777777',*/}
                                            {/*            height: 0.5,*/}
                                            {/*            marginHorizontal: 10,*/}
                                            {/*            marginVertical: 5*/}
                                            {/*        }}></View>*/}
                                            {/*    </Pressable>*/}
                                            {/*    )*/}
                                            {/*})}*/}

                                            <FlatList scrollEnabled={false} nestedScrollEnabled={true}
                                                style={{ marginHorizontal: 0, marginTop: 10 }} data={data}
                                                renderItem={({ item }) => (
                                                    <Pressable
                                                        onPress={() => navigation.push('JobsByCity', { CITYID: item.id, cityName: item.name })}>
                                                        <View
                                                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={{
                                                                fontSize: 15,
                                                                fontWeight: 600,
                                                                fontFamily: 'poppins_semibold'
                                                            }}>{item.name}</Text>
                                                            <Text style={{
                                                                marginTop: 4,
                                                                fontSize: 15,
                                                                fontFamily: 'poppins_light',
                                                                marginHorizontal: 15
                                                            }}>-</Text>
                                                            <Text style={{
                                                                fontSize: 12,
                                                                fontWeight: 200,
                                                                fontFamily: 'poppins_light'
                                                            }}>{item.country_name}</Text>
                                                        </View>
                                                        <Text style={{
                                                            backgroundColor: 'gray',
                                                            height: 1.2,
                                                            marginVertical: 4,
                                                            color: 'gray'
                                                        }}>-</Text>
                                                    </Pressable>
                                                )} />
                                        </SafeAreaView>
                                    </View>
                                </>
                            }
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

export default Cities
