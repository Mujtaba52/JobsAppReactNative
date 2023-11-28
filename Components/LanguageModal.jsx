import React, { useEffect, useState } from 'react'
import { Image, Modal, Pressable, Text, View } from 'react-native'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message';

const LanguageModal = ({ visible, toggleLanguageVisibility, add, edit, data }) => {

    const [language, setLanguage] = useState('');

    useEffect(() => {
        if (data !== null) {
            setLanguage(data.language)
        }
    }, [data]);

    const Add = () => {

        if (language.length >= 2) {
            if (data !== null) {
                edit(language, data.id)
            } else {
                add(language)
            }
            toggleLanguageVisibility()
        } else {
            Toast.show({position:'top',type:'error',text1:'Please Enter Your Language' })
        }



    }

    return (
        <Modal visible={visible} animationType={"fade"} transparent={true} onRequestClose={toggleLanguageVisibility}>
            <GestureHandlerRootView style={{
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
                    alignItems: 'center'
                }}>
                    <Pressable style={{ width: 15, height: 15, marginLeft: 'auto',padding:10 }}
                        onPress={() => toggleLanguageVisibility()}><Image
                            style={{ width: 15, height: 15, marginLeft: 'auto' }}
                            source={require('../assets/close.png')} /></Pressable>
                    <Text style={{ fontSize: 16, fontFamily: 'poppins_bold' }}>Languages</Text>
                    <TextInput onChangeText={text => setLanguage(text)} placeholder={'Enter Your Language'} style={{
                        width: '80%',
                        marginTop: 20,
                        borderColor: '#adadad',
                        borderRadius: 20,
                        borderWidth: 0.5,
                        height: 50,
                        textAlign: 'center'
                    }}>{data?.language}</TextInput>
                    <Pressable onPress={() => Add()} style={{
                        paddingHorizontal: 60,
                        paddingVertical: 13,
                        backgroundColor: '#13A3E1',
                        borderRadius: 25,
                        marginTop: 10
                    }}><Text style={{ color: '#fff', fontSize: 14, fontFamily: 'poppins_bold' }}>ADD</Text></Pressable>
                </View>
            </GestureHandlerRootView>
            <Toast  position='top' bottomOffset={20} />
        </Modal>
    )
}

export default LanguageModal
