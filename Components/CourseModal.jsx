import React, { useEffect, useState } from 'react'
import { Image, Modal, Pressable, Text, View } from 'react-native'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'

const CourseModal = ({ visible, toggleCourseVisibility, add, edit, data }) => {

    const [course, setCourse] = useState('')
    const [timeperiod, setTimePeriod] = useState('')
    const [institute, setInstitute] = useState('')

    useEffect(() => {
        if (data !== null) {
            setCourse(data.course)
            setTimePeriod(data.timeperiod)
            setInstitute(data.institute)
        }
    }, [data]);

    const Add = () => {
        if (course.length >= 2) {
            if (timeperiod.length >= 2) {
                if (institute.length >= 2) {
                    if (data !== null) {
                        edit(course, timeperiod, institute, data.id)
                    } else {
                        add(course, timeperiod, institute)
                    }
                    toggleCourseVisibility()

                } else {
                    Toast.show({ type: 'error', position: 'top', text1: 'Enter Your Course Time period' })
                }
            } else {
                Toast.show({ type: 'error', position: 'top', text1: 'Please Enter Institute' })
            }
        } else {
            Toast.show({ type: 'error', position: 'top', text1: 'Please Enter Course Name' })
        }
    }

    return (
        <Modal visible={visible} animationType={"fade"} transparent={true} onRequestClose={toggleCourseVisibility}>
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
                    <Pressable style={{ width: 15, height: 15, marginLeft: 'auto' }}
                        onPress={() => toggleCourseVisibility()}><Image
                            style={{ width: 15, height: 15, marginLeft: 'auto' }}
                            source={require('../assets/close.png')} /></Pressable>
                    <Text style={{ fontSize: 16, fontFamily: 'poppins_bold' }}>Courses</Text>
                    <TextInput onChangeText={text => setCourse(text)} placeholder={'Course'} style={{
                        width: '80%',
                        marginTop: 20,
                        borderColor: '#adadad',
                        borderRadius: 20,
                        borderWidth: 0.5,
                        height: 50,
                        textAlign: 'center'
                    }}>{data?.course}</TextInput>
                    <TextInput onChangeText={text => setInstitute(text)} placeholder={'Institute'} style={{
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

export default CourseModal
