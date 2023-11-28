import React, { useEffect, useState } from 'react'
import { Image, Modal, Pressable, Text, View } from 'react-native'
import { GestureHandlerRootView, NativeViewGestureHandler, TextInput } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message';

const EducationModal = ({ visible, toggleEducationVisibility, add, data, edit }) => {

    const [degree, setDegree] = useState('');
    const [timeperiod, setTimePeriod] = useState('');
    const [university, setUniversity] = useState('');

    useEffect(() => {
        if (data !== null) {
            setDegree(data?.degree)
            setTimePeriod(data?.timeperiod)
            setUniversity(data?.institute)
        }
    }, [data]);

    const Add = () => {

        if (degree.length >= 4) {
            if (university.length >= 4) {
                if (timeperiod.length >= 4) {
                    if (data !== null) {
                        edit(degree, timeperiod, university, data.id)
                    } else {
                        add(degree, timeperiod, university)
                    }
                    toggleEducationVisibility()
                } else {
                    Toast.show({ type: 'error', position: 'top', text1: 'Please Enter Timperiod' })
                }
            } else {
                Toast.show({ type: 'error', position: 'top', text1: 'Please Enter Institute' })
            }
        } else {
            Toast.show({ type: 'error', position: 'top', text1: 'Please Enter Degree' })
        }
    }

    return (
        <Modal visible={visible} animationType={"fade"} transparent={true} onRequestClose={toggleEducationVisibility}>
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
                    <Pressable style={{ width: 15, height: 15, marginLeft: 'auto', paddingLeft: 10, paddingRight: 30, paddingBottom: 30, paddingTop: 10 }}
                        onPress={() => toggleEducationVisibility()}><Image
                            style={{ width: 15, height: 15, marginLeft: 'auto' }}
                            source={require('../assets/close.png')} /></Pressable>
                    <Text style={{ fontSize: 16, fontFamily: 'poppins_bold' }}>Education</Text>
                    <TextInput onChangeText={text => setDegree(text)} placeholder={'Degree'} style={{
                        width: '80%',
                        marginTop: 20,
                        borderColor: '#adadad',
                        borderRadius: 20,
                        borderWidth: 0.5,
                        height: 50,
                        textAlign: 'center'
                    }}>{data?.degree}</TextInput>
                    <TextInput onChangeText={text => setUniversity(text)} placeholder={'Institute'} style={{
                        width: '80%',
                        marginTop: 8,
                        borderColor: '#adadad',
                        borderRadius: 20,
                        borderWidth: 0.5,
                        height: 50,
                        textAlign: 'center'
                    }}>{data?.institute}</TextInput>
                    <TextInput onChangeText={text => setTimePeriod(text)} placeholder={'Time Period'} style={{
                        width: '80%',
                        marginTop: 8,
                        borderColor: '#adadad',
                        borderRadius: 20,
                        borderWidth: 0.5,
                        height: 50,
                        textAlign: 'center'
                    }}>{data?.timeperiod}</TextInput>
                    <Pressable onPress={() => Add()} style={{
                        paddingHorizontal: 60,
                        paddingVertical: 13,
                        backgroundColor: '#13A3E1',
                        borderRadius: 25,
                        marginTop: 10
                    }}><Text style={{ color: '#fff', fontSize: 14, fontFamily: 'poppins_bold' }}>ADD</Text></Pressable>
                </View>
            </GestureHandlerRootView>

            <Toast position='top' bottomOffset={20} />


        </Modal>

    )
}

export default EducationModal
