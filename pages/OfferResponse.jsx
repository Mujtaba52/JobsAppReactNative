import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Image, TextInput, Text, Pressable, FlatList, SafeAreaView, ScrollView, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { FetchOffer } from '../API/actions/offersActions';
import ContactModal from "../Components/ContactModal";


const OfferResponse = ({ route, navigation }) => {

    const dispatch = useDispatch()

    const { ID } = route.params

    const offer = useSelector(state => state.offers.offer)
    const success = useSelector(state => state.success.offerSuccess)
    const error = useSelector(state => state.error.offerError)
    // const nodata = useSelector(state => state.offers.error)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (success || error) {
            setIsLoading(false)
        }
    }, [success, error])
    useEffect(() => {
        if (ID) {
            dispatch(FetchOffer(ID))
        }
    }, [dispatch, ID])

    useEffect(() => {
        if (offer) {
            setResponse(JSON.parse(offer.response))
        }
    }, [offer])

    const [response, setResponse] = useState()

    const [visible, setVisible] = useState(false)
    const toggleVisible = () => setVisible(!visible)

    useEffect(() => {
        console.log(response)
    }, [response])

    return (
        <View style={{ flex: 1, }}>
            {isLoading ? <View style={{ marginTop: 200 }}>
                <ActivityIndicator size={60} color="#13A3E1" />
            </View>
                : <>
                    {error ?
                        <View>
                            <Image source={require('../assets/delete.png')} style={{ width: 30, height: 30, marginLeft: 190, marginBottom: -20, marginTop: 40 }} />
                            <Text style={{ textAlign: 'center', marginVertical: 20, fontFamily: 'poppins_medium' }}>Network Error...!</Text>
                        </View> :
                        <ScrollView style={{ backgroundColor: '#EAEAEA', flex: 1 }}>
                            <ContactModal visible={visible} toggleVisibility={toggleVisible} name={offer?.seeker_name}
                                phone={offer?.phone} email={offer?.email} />
                            <View style={{ backgroundColor: '#EAEAEA', flex: 1 }}>
                                <View style={{ flexDirection: 'row', height: 90 }}>
                                    <Pressable onPress={() => navigation.goBack()} style={{ paddingRight: 5 }}><Image style={{
                                        width: 22,
                                        height: 20,
                                        marginTop: 70,
                                        marginLeft: 30,
                                        tintColor: '#000'
                                    }} source={require('../assets/back_arrow.png')} alt={''} /></Pressable>
                                    <View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
                                        <Pressable onPress={() => navigation.push('OfferRejected')}><Image
                                            style={{ width: 150, height: 40, marginTop: 60, alignSelf: 'center' }}
                                            source={require('../assets/logo.png')} alt={'Okay'} /></Pressable>
                                    </View>
                                </View>
                                <Text style={{
                                    fontSize: 22,
                                    fontFamily: 'poppins_bold',
                                    textAlign: "center",
                                    marginTop: 90
                                }}>{offer?.offerStatus}</Text>
                                <View style={{ marginTop: 10 }}>
                                    <View style={{
                                        marginBottom: 8,
                                        borderColor: '#4C4C4C',
                                        borderTopLeftRadius: 50,
                                        borderTopRightRadius: 50,
                                        paddingVertical: 15,
                                        display: "flex",
                                        flexDirection: "column",
                                        backgroundColor: '#fff',
                                    }}>
                                        <View style={{ flexDirection: 'row', flex: 1 }}>
                                            <Text style={{
                                                paddingHorizontal: 10,
                                                paddingTop: 4,
                                                fontSize: 14,
                                                fontFamily: 'poppins_bold',
                                                borderRadius: 5,
                                                marginLeft: 25,
                                            }}>{offer?.role}</Text>
                                            <Text style={{
                                                marginLeft: 'auto',
                                                textAlign: 'right',
                                                fontFamily: 'poppins_medium',
                                                fontSize: 13,
                                                marginRight: 25
                                            }}>{moment(offer?.responseDate).format("MMM Do YY")}</Text>
                                        </View>
                                        <View style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}>
                                            <Text style={{
                                                fontFamily: 'poppins_medium',
                                                fontSize: 15,
                                                textAlign: 'center',
                                                marginTop: 4,
                                                backgroundColor: '#00A224',
                                                color: "white",
                                                borderRadius: 20,
                                                paddingLeft: 20,
                                                paddingRight: 20,
                                                paddingTop: 6,
                                                paddingBottom: 5
                                            }}>
                                                Salary ${offer?.salary}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <Text numberOfLines={1} style={{
                                                    fontFamily: 'poppins_bold',
                                                    marginTop: 15,
                                                    fontSize: 20,
                                                    textAlign: "center",
                                                }}>{offer?.seeker_name}</Text>
                                                <Text style={{
                                                    fontFamily: 'poppins_medium',
                                                    marginTop: 0,
                                                    fontSize: 14,
                                                    textAlign: "center"
                                                }}>{offer?.email}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{
                                                fontSize: 18,
                                                fontFamily: 'poppins_bold',
                                                marginLeft: 25,
                                                marginTop: 10,
                                                flex: 1,
                                                textAlign: 'center'
                                            }}>Response</Text>
                                            {offer?.response ?
                                                <View>
                                                    <Text style={{
                                                        fontSize: 12,
                                                        fontFamily: 'poppins_medium',
                                                        marginLeft: 25,
                                                        marginTop: 10
                                                    }}>{response?.text1} </Text>
                                                    <Text style={{
                                                        fontSize: 12,
                                                        fontFamily: 'poppins_medium',
                                                        marginLeft: 25,
                                                        marginTop: 10
                                                    }}>{response?.text2} </Text>
                                                    <Text style={{
                                                        fontSize: 12,
                                                        fontFamily: 'poppins_medium',
                                                        marginLeft: 25,
                                                        marginTop: 10
                                                    }}>{response?.text3} </Text>
                                                </View>
                                                :
                                                <Text style={{
                                                    fontSize: 12,
                                                    fontFamily: 'poppins_medium',
                                                    marginLeft: 25,
                                                    marginTop: 10,
                                                    flex: 1,
                                                }}>No Response Yet</Text>
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    }
                </>}
            <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <Text onPress={() => toggleVisible()} style={{
                    fontSize: 16,
                    fontFamily: 'poppins_medium',
                    backgroundColor: '#13A3E1',
                    color: 'white',
                    textAlign: "center",
                    paddingVertical: 7,
                    borderRadius: 20,
                    paddingHorizontal: 50
                }}>Contact</Text>
            </View>
        </View>
    )
}

export default OfferResponse
