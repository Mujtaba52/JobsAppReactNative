import { Button, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import PhoneModal from "../Components/PhoneModal";
import Toast from "react-native-toast-message";

function Verify({ route, navigation }) {

    const { forgot } = route.params;
    const { code } = route.params;
    const { verifyPhone } = route.params;
    const { type } = route.params;
    const { ID } = route.params;
    const { verify } = route.params;

    const [changeable, setChangeable] = useState()

    const [phone, setPhone] = useState(verifyPhone)
    const [phoneCode, setPhoneCode] = useState(code)

    const [phoneVisible, setPhoneVisible] = useState(false)
    const togglePhoneVisible = () => setPhoneVisible(!phoneVisible)

    const setCode = (code) => {
        setPhoneCode(code)
        togglePhoneVisible()
    }

    useEffect(() => {
        if (forgot) {
            setChangeable(false)
        } else {
            setChangeable(true)
        }
    }, [forgot]);

    // useEffect(() => {
    //     if (phone.length > 4) {
    //         ''
    //     } else {
    //         Toast.show({ type: 'error', text1: 'Please Enter Phone Number', position: 'top' })
    //     }
    // }, [phone])

    const handleClick = () => {
        if (phone) {
            navigation.push('VerificationCode', { code: code, phone: phone, type: type, ID: ID, verify: verify })
        } else {
            Toast.show({ type: 'error', text1: 'Please Enter Phone Number', position: 'top' })
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}
            keyboardShouldPersistTaps="handled"
        >
            <PhoneModal visible={phoneVisible} togglePhoneVisible={togglePhoneVisible} set={setCode} />


            <Pressable onPress={() => navigation.goBack()}><Image style={{ width: 22, height: 20, marginTop: 70, marginLeft: 30, tintColor: 'gray', }} source={require('../assets/back_arrow.png')} alt={'Okay'} /></Pressable>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ height: 150, width: 150, marginTop: 70, borderRadius: 500, padding: 120 }} source={require('../assets/verify.png')} />
                <Text style={{ color: '#000', fontFamily: 'poppins_semibold', fontSize: 18, width: '85%', textAlign: 'center', marginTop: 20, alignSelf: 'center' }}>Verify</Text>
                <Text style={{ color: 'gray', marginHorizontal: 40, textAlign: 'center', marginTop: 20 }}>Add your Phone number we'll Send You a verification code</Text>
                <Text style={{ color: 'gray' }}>so we know you are real</Text>


                {/* <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 'auto', marginRight: 'auto', }}>
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
                    <Pressable onPress={() => { if (changeable) { togglePhoneVisible() } }}><TextInput editable={changeable} style={{
                        textAlign: 'center',
                        paddingHorizontal: 6,
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        paddingVertical: 8,
                        borderColor: '#b2b2b2',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderRightWidth: 1
                    }} placeholder="country code" >{code}</TextInput></Pressable>
                    <TextInput onChangeText={text => setPhone(phone)} editable={changeable} placeholder="Enter Your Number" style={{
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
                    }}  >{verifyPhone}</TextInput>
                </View> */}



                <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 15, elevation: 10, }}>
                    <Pressable onPress={() => { if (changeable) { togglePhoneVisible() } }} style={{
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
                    }}><TextInput style={{ color: '#000' }} editable={false} placeholder={"+01"} >{phoneCode}</TextInput>
                    </Pressable>
                    <TextInput editable={changeable} keyboardType='numeric' onChangeText={text => setPhone(phone)}
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
                        }}>{phone}</TextInput>
                </View>
                <Pressable onPress={() => handleClick()} style={{
                    width: '50%',
                    backgroundColor: '#13A3E1',
                    alignItems: 'center',
                    borderRadius: 15,
                    marginTop: 40,
                    paddingVertical: 7,
                }}>
                    <Text style={{ color: '#fff', fontFamily: 'poppins_semibold', fontSize: 15 }}>Send </Text>
                </Pressable>
            </View>
            <Toast position="top" bottomOffset={20} />
        </ScrollView>
    );
}

export default Verify
