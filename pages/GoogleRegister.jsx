import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { completeRegistration } from "../API";
import Toast from 'react-native-toast-message';

const GoogleRegister = ({ route, navigation }) => {

    const { id, email } = route.params

    const [name, setName] = useState('')
    const [size, setSize] = useState('')

    const GoogleRegister = async () => {



        await completeRegistration(name, size, id).then(async res => {
            const { data: { responseCode } } = res;
            if (responseCode === 200) {
                await AsyncStorage.setItem("LOGIN", 'true')
                await AsyncStorage.setItem("ID", id)
                await AsyncStorage.setItem("USER", "PROVIDER")
                await AsyncStorage.setItem("NAME", name)
                await AsyncStorage.setItem("EMAIL", email)
                navigation.replace('PostJob')
            }
        })
    }

    // const Register = () => {
    //     if (name = '' ) {
    //         if (size = '' ) {
    //             Toast.show({ type: 'error', position: 'top', text1: 'Please Enter your company size' })
    //         }
    //     } else {
    //         Toast.show({ type: 'error', position: 'top', text1: 'Please Enter your company name' })

    //     }
    // }


    return (
        <View style={{ flex: 1, backgroundColor: '#F0A51E' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{
                    color: 'white',
                    fontFamily: 'poppins_bold',
                    fontSize: 17,
                    width: 250,
                    textAlign: 'center',
                    marginBottom: 10,

                }}>
                    Please Complete Your Profile !!!
                </Text>
                <TextInput onChangeText={text => setName(text)} style={{
                    height: 50,
                    backgroundColor: '#fff',
                    width: '85%',
                    borderRadius: 25,
                    marginTop: 15,
                    paddingHorizontal: 20,
                    color: '#626262',
                    elevation: 10,
                }} placeholder={'Enter your Company name'} />

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
                    <TextInput onChangeText={text => setSize(text)} style={{
                        height: 50,
                        paddingHorizontal: 20,
                        color: '#626262',
                        flex: 1
                    }} placeholder={'Enter your Company size'} />

                </View>


                <Pressable onPress={() => GoogleRegister()} style={{
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

export default GoogleRegister
