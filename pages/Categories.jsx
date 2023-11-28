import { Image, TextInput, Text, Pressable, ScrollView, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Termsandconditions from './Termsandconditions'
import { useDispatch, useSelector } from "react-redux";
import { AllCategories } from "../API/actions/categoryActions";
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

function Categories({ navigation }) {

    const categories = useSelector(state => state.category.categories)
    const noData = useSelector(state => state.nodata.allCategoryNoData)
    const success = useSelector(state => state.success.allCategorySuccess)
    const error = useSelector(state => state.error.allCategoryError)
    const dispatch = useDispatch();
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (success || error || noData) {
            setIsLoading(false)
        }
    }, [success, noData, error])


    useEffect(() => {
        if (isLoading) {
            if (!categories) {
                dispatch(AllCategories())
            } else {
                setIsLoading(false)
            }
        }
    }, [dispatch, navigation, categories]);

    useEffect(() => {
        if (categories) {
            setData(categories)
        }
    }, [categories]);

    const search = (query) => {
        const searched = categories.filter((category) => {
            return (category.name).toLowerCase().includes(query.toLowerCase());
        })
        setData(searched)
    }






    return (
        <View style={{ flex: 1 }} >
            <ScrollView style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
                {isLoading ?
                    <View style={{ marginTop: 400 }}>
                        <ActivityIndicator size={60} color="#13A3E1" />
                    </View>
                    :
                    <>
                        {noData ? <View style={{ marginTop: 200 }}>
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
                                                <Pressable onPress={() => navigation.goBack()} style={{ paddingRight: 5 }}><Image style={{
                                                    width: 22,
                                                    height: 20,
                                                    marginTop: 70,
                                                    marginLeft: 30,
                                                    tintColor: '#000'
                                                }} source={require('../assets/back_arrow.png')} alt={'Okay'} /></Pressable>
                                                <View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
                                                    <Pressable
                                                    //  onPress={() => navigation.push('Jobs')}
                                                    ><Image
                                                            style={{ width: 150, height: 40, marginTop: 60, alignSelf: 'center' }}
                                                            source={require('../assets/logo.png')} alt={'Okay'} /></Pressable>
                                                </View>
                                            </View>
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
                                                }}>Browse by Categories</Text>
                                            </View>
                                            <SafeAreaView>
                                                <FlatList scrollEnabled={false} nestedScrollEnabled={true}
                                                    style={{ marginHorizontal: 20 }} data={data}
                                                    renderItem={({ item }) => (
                                                        <Pressable
                                                            onPress={() => navigation.push('JobsByCategory', { CATID: item.id })}
                                                            style={{
                                                                flex: 1,
                                                                backgroundColor: '#fff',
                                                                height: 120,
                                                                alignItems: 'center',
                                                                padding: 15,
                                                                borderRadius: 15,
                                                                margin: 5,
                                                                justifyContent: 'center'
                                                            }}>
                                                            <Image style={{ width: 40, height: 40, marginTop: 5 }}
                                                                source={{ uri: `${item.image}` }} />
                                                            <Text style={{
                                                                fontSize: 12,
                                                                fontFamily: 'poppins_semibold',
                                                                marginTop: 12,
                                                                textAlign: 'center'
                                                            }}>{item.name}</Text>
                                                        </Pressable>
                                                    )}
                                                    numColumns={2} />
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

export default Categories
