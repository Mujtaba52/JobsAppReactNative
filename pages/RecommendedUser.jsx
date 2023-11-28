import { ActivityIndicator, FlatList, Image, Modal, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllCategories } from "../API/actions/categoryActions";
import { RecommendedSeekers } from "../API/actions/seekerActions";
import Ripple from "react-native-material-ripple";

function RecommendedUser({ route, navigation }) {

    const { job } = route.params

    const dispatch = useDispatch();
    const [login, isLogin] = useState(false);
    const seekers = useSelector(state => state.seeker.seekers)
    const success = useSelector(state => state.success.recommendedSeekersSuccess)
    const nodata = useSelector(state => state.nodata.recommendedSeekersNoData)
    const error = useSelector(state => state.error.recommendedSeekersError)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (success || error || nodata) {
            setLoading(false)
        }
    }, [success, error, nodata])

    const [visible, setVisible] = useState(false)
    const toggleVisibility = () => setVisible(!visible)

    useEffect(() => {
        dispatch(RecommendedSeekers(job))
    }, [dispatch, navigation]);

    useEffect(() => {
        console.log(seekers)
    }, [seekers])

    return (
        <View style={{ flex: 1 }}>

            {loading ?
                <View style={{ marginTop: 400 }}>
                    <ActivityIndicator size={60} color="#13A3E1" />
                </View>
                :
                <>
                    {nodata ? <View style={{ marginTop: 200 }}>
                        <Image source={require('../assets/nodata.png')}
                            style={{ width: 260, height: 260, marginLeft: 80, marginBottom: -20, marginTop: 40 }} />
                        <Text style={{ textAlign: 'center', fontFamily: 'poppins_medium' }}>No Recommended jobs Found</Text>
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

                                    <ScrollView style={{ flex: 1, backgroundColor: '#F1F1F1', marginBottom: -75 }}>
                                        <View style={{
                                            flexDirection: 'column',
                                            width: '100%',
                                            height: 90,
                                            marginBottom: 70
                                        }}>
                                            <View style={{ flexDirection: 'row', height: 130 }}>
                                                <Pressable onPress={() => navigation.goBack()}
                                                    style={{ paddingRight: 5 }}><Image style={{
                                                        width: 22,
                                                        height: 20,
                                                        marginTop: 70,
                                                        marginLeft: 30,
                                                        marginBottom: 20,
                                                        tintColor: 'gray'
                                                    }} source={require('../assets/back_arrow.png')}
                                                        alt={'Okay'} />
                                                </Pressable>
                                                <View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
                                                    <Image style={{
                                                        width: 150,
                                                        height: 40,
                                                        marginTop: 60,
                                                        alignSelf: 'center'
                                                    }}
                                                        source={require('../assets/logo.png')} alt={'Okay'} />
                                                </View>
                                            </View>
                                        </View>


                                        <SafeAreaView style={{ flex: 1 }}>
                                            <FlatList scrollEnabled={false} nestedScrollEnabled={true}
                                                style={{ marginHorizontal: 26, marginTop: 10 }} data={seekers} renderItem={({ item }) => (
                                                    <View
                                                        style={{
                                                            margin: 5,
                                                            backgroundColor: '#fff',
                                                            borderColor: '#c2c2c2',
                                                            borderWidth: 1,
                                                            borderRadius: 25,
                                                            paddingVertical: 20,
                                                            paddingHorizontal: 20
                                                        }}>
                                                        {item.offer !== 0 ?
                                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                                <Text style={{
                                                                    color: '#207A00',
                                                                    backgroundColor: 'rgba(0,180,18,0.2)',
                                                                    paddingHorizontal: 15,
                                                                    paddingTop: 4,
                                                                    fontSize: 13,
                                                                    fontFamily: 'poppins_medium',
                                                                    borderRadius: 5
                                                                }}>Offer Sent</Text>
                                                                <Text style={{
                                                                    marginLeft: 'auto',
                                                                    textAlign: 'right',
                                                                    fontFamily: 'poppins_medium',
                                                                    fontSize: 12
                                                                }}></Text>
                                                            </View>
                                                            :
                                                            ''
                                                        }
                                                        <Text style={{ fontSize: 17, fontFamily: 'poppins_medium', marginTop: 10 }}>{item.name}</Text>
                                                        <Text>{item.city_name}</Text>
                                                        <Text style={{
                                                            fontSize: 17,
                                                            fontFamily: 'poppins_medium',
                                                            marginBottom: 10
                                                        }}>{item.role}</Text>
                                                        <View style={{ paddingHorizontal: 50 }}><Text style={{
                                                            backgroundColor: '#D9D9D9',
                                                            textAlign: "center",
                                                            paddingVertical: 6,
                                                            borderRadius: 20,
                                                            fontSize: 12,
                                                            fontFamily: 'poppins_medium'
                                                        }}>Demand 5000/month</Text></View>
                                                        <Ripple onPress={() => navigation.push('ViewResume', { ID: item.id, offer: item.offer, job: item.job })} style={{ marginTop: 4, marginLeft: 'auto', marginRight: 'auto' }}>
                                                            <Text style={{
                                                                backgroundColor: '#13A3E1',
                                                                textAlign: "center",
                                                                borderRadius: 20,
                                                                fontSize: 16,
                                                                fontFamily: 'poppins_bold',
                                                                color: 'white',
                                                                marginVertical: 4,
                                                                paddingVertical: 4,
                                                                paddingHorizontal: 50
                                                            }}>View Resume</Text>
                                                        </Ripple>
                                                    </View>

                                                )}
                                            />
                                        </SafeAreaView>


                                        <View style={{ height: 90 }} />
                                    </ScrollView>
                                </>}
                        </>}
                </>}
        </View>
    )
}

export default RecommendedUser
