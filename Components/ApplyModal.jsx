import React, { useState } from 'react'
import { Image, Modal, Pressable, Text, View } from 'react-native'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'

const ApplyModal = ({ visible, toggleVisible, apply }) => {

    const [proposal, setProposal] = useState()
    const [intro, setIntro] = useState()

    const Apply = () => {
        toggleVisible()
        apply(intro, proposal)
    }

    return (
        <Modal visible={visible} animationType={"fade"} transparent={true} onRequestClose={toggleVisible} >
            <GestureHandlerRootView style={{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(66, 66, 66, 0.4)',

            }}>
                <View style={{
                    margin: 35,
                    elevation: 24,
                    borderRadius: 25,
                    backgroundColor: '#fff',
                    opacity: 1,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 550
                }}>
                    <Pressable style={{ width: 15, height: 15, marginLeft: 'auto' }} onPress={() => toggleVisible()}>
                        <Image style={{ width: 15, height: 15, marginLeft: 'auto' }} source={require('../assets/close.png')} />
                    </Pressable>
                    <Text style={{ fontSize: 16, fontFamily: 'poppins_bold', }}>Send Cover Letter</Text>
                    <View style={{
                        width: '100%',
                        fontSize: 13,
                        fontFamily: 'poppins_medium',
                    }}>
                        <Text style={{ marginTop: 10, fontSize: 16, fontFamily: 'poppins_semibold' }}>Intro</Text>
                        <TextInput style={{ width: '100%', borderColor: '#adadad', borderRadius: 20, borderWidth: 0.5, textAlign: 'center', fontSize: 13, fontFamily: 'poppins_medium', padding: 20, marginBottom: 'auto' }}
                            onChangeText={text => setIntro(text)} multiline numberOfLines={5} placeholder={'Introduce Yourself'} ></TextInput>
                    </View>
                    <View style={{
                        width: '100%',
                        fontSize: 13,
                        fontFamily: 'poppins_medium',
                    }}>
                        <Text style={{ marginTop: 10, fontSize: 16, fontFamily: 'poppins_semibold' }}>Body</Text>
                        <TextInput onChangeText={text => setProposal(text)} multiline numberOfLines={9} placeholder={'Proposal'} style={{
                            width: '100%',
                            borderColor: '#adadad',
                            borderRadius: 20,
                            borderWidth: 0.5,
                            textAlign: 'center',
                            fontSize: 13,
                            fontFamily: 'poppins_medium',
                            padding: 20,
                            marginBottom: 'auto'
                        }}></TextInput>
                    </View>
                    <Pressable onPress={() => Apply()} style={{
                        paddingHorizontal: 60,
                        paddingVertical: 13,
                        backgroundColor: '#13A3E1',
                        borderRadius: 25,
                        marginTop: 10
                    }}><Text style={{ color: '#fff', fontSize: 14, fontFamily: 'poppins_bold' }}>Send</Text></Pressable>
                </View>
            </GestureHandlerRootView>
        </Modal>
    )
}

export default ApplyModal
