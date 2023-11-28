import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { Image } from 'react-native'
import { Pressable } from 'react-native'
import { View } from 'react-native'
import { Modal } from 'react-native'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'

const ResumeModal = ({ visible, toggleResumeVisibility, add, edit, data }) => {

    const [resume, setResume] = useState('');

    useEffect(() => {
        if (data !== null) {
            setResume(data.resume)
        }
    }, [data]);

    const Add = () => {
        if (resume.length >= 2) {
            if (data !== null) {
                edit(resume, data.id)
            } else {
                add(resume)
            }
            toggleResumeVisibility()
        } else {
            Toast.show({position:'top',type:'error',text1:'Please Enter Your Resume' })
        }


    }

    return (
        <Modal visible={visible} animationType={"fade"} transparent={true} onRequestClose={toggleResumeVisibility}>
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
                        onPress={() => toggleResumeVisibility()}><Image
                            style={{ width: 15, height: 15, marginLeft: 'auto' }}
                            source={require('../assets/close.png')} /></Pressable>
                    <Text style={{ fontSize: 16, fontFamily: 'poppins_bold' }}>Resumes</Text>
                    <TextInput onChangeText={text => setResume(text)} placeholder={'Enter Your Resume'} style={{
                        width: '80%',
                        marginTop: 20,
                        borderColor: '#adadad',
                        borderRadius: 20,
                        borderWidth: 0.5,
                        height: 50,
                        textAlign: 'center'
                    }}>{data?.resume}</TextInput>
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

export default ResumeModal
