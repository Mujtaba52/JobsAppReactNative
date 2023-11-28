import React, { useState } from 'react'
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import OfferModal from '../Components/OfferModal'
import ProposelModal from '../Components/ProposelModal'
import { sendOffer } from "../API";
import moment from "moment";
import LoadingModal from '../Components/LoadingModal';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const OfferSend = ({ route, navigation }) => {

    const { job } = route.params;
    const { user } = route.params;

    // const success = useSelector(state => state.success.sentOfferSuccess)
    // const error = useSelector(state => state.success.sentOfferError)
    // const nodata = useSelector(state => state.success.sentOfferNoData)
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     if (success || error || nodata) {
    //         setLoading(false)
    //     }
    // }, [success, error, nodata])

    const [type, setType] = useState('')
    const [proposal, setProposal] = useState('by')

    const [typeVisible, setTypeVisible] = useState(false)
    const toggleVisibility = () => setTypeVisible(!typeVisible)

    const [proposalVisible, setProposalVisible] = useState(false)
    const toggleProposelVisibility = () => setProposalVisible(!proposalVisible)

    const SendOffer = (job, user, offerType, offer) => {
        const date = moment().format("YYYY-MM-DD")
        if (type.length >= 5) {
            if (proposal.length >= 5) {
                toggleVisible(true)
                sendOffer(job, user, offerType, offer, '', date).then(res => {
                    const { data: { data } } = res;
                    if (data.affectedRows === 1) {
                        navigation.replace('PostJob')
                        toggleVisible(false)
                    }
                })
            } else {
                Toast.show({ type: 'error', position: 'top', text1: 'Please Enter Proposal' })
            }
        } else {
            Toast.show({ type: 'error', position: 'top', text1: 'Please Enter Offer Type' })
        }
    }



    const [loadingVisible, setLoadingVisible] = useState(false)
    const toggleVisible = (val) => setLoadingVisible(val)

    return (

        <ScrollView>
            {/* {loading ?
                <View style={{ marginTop: 200 }}>
                    <ActivityIndicator size={60} color="#13A3E1" />
                </View>
                : <> */}
                    <OfferModal visible={typeVisible} toggleVisibility={toggleVisibility} set={setType} />
                    <LoadingModal visible={loadingVisible} />
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
                    <View style={{
                        flexDirection: 'column',
                        borderColor: '#b2b2b2',
                        backgroundColor: '#fff',
                        padding: 20,
                        marginHorizontal: 10,
                        marginRight: 30,
                        marginLeft: 30,
                        borderRadius: 30,
                        marginTop: 20
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                fontFamily: 'poppins_bold',
                                fontSize: 16
                            }}>Offer Type</Text>

                        </View>
                        <Pressable onPress={() => toggleVisibility()}>
                            <TextInput editable={false}
                                style={{ flex: 1, textAlign: 'center', color: '#757575', fontFamily: 'poppins_light', margin: 15 }}  >{type}</TextInput>
                        </Pressable>
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        borderColor: '#b2b2b2',
                        backgroundColor: '#fff',
                        padding: 20,
                        marginHorizontal: 10,
                        marginRight: 30,
                        marginLeft: 30,
                        borderRadius: 30,
                        marginTop: 20,

                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                fontFamily: 'poppins_bold',
                                fontSize: 16
                            }}>Proposal</Text>
                        </View>
                        <TextInput onChangeText={text => setProposal(text)} multiline={true} style={{ textAlign: 'center', borderWidth: 0.2, borderColor: 'gray', borderRadius: 18, marginTop: 15, padding: 30, fontSize: 11, fontFamily: 'poppins_medium', lineHeight: 45 }} placeholder='write Your proposal' numberOfLines={17} />
                    </View>
                    <Pressable onPress={() => SendOffer(job, user, type, proposal)} style={{
                        backgroundColor: '#13A3E1',
                        borderRadius: 25,
                        alignItems: 'center',
                        padding: 15,
                        marginTop: 65,
                        marginHorizontal: 100
                    }}><Text style={{ color: '#ffff', fontSize: 15, fontFamily: 'poppins_medium' }}>
                            Send Offer  </Text></Pressable>

                    <Toast
                        position='top'
                        bottomOffset={20}
                    />
                {/* </>} */}
        </ScrollView>
    )
}

export default OfferSend
