import React, { useState } from 'react'
import { Image, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import Toast from "react-native-toast-message";

const ManageCoverLetter = ({ navigation, apply, visible, toggleVisible }) => {

    const [proposal, setProposal] = useState('')
    const [intro, setIntro] = useState('')

    const Apply = () => {
        if (intro.length > 20){
            if (proposal.length > 20){
                apply(intro, proposal)
                toggleVisible()
            } else {
                Toast.show({ type: 'error', position: 'top', text1: 'Proposal Length Must be greater than 20 Words' })
            }
        } else {
            Toast.show({ type: 'error', position: 'top', text1: 'Intro Length Must be greater than 20 Words' })
        }
    }



    return (
        <Modal visible={visible} animationType='fade' onRequestClose={toggleVisible}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{
                    flexDirection: 'column',
                    width: '100%',
                    height: 90,
                    marginBottom: 20
                }}>
                    <View style={{ flexDirection: 'row', height: 130 }}>
                        <Pressable onPress={() => toggleVisible()}
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
                            <Text style={{
                                marginTop: 67,
                                alignSelf: 'center',
                                fontSize: 16, fontFamily: 'poppins_medium', color: 'gray'
                            }} >Cover Letter</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Image source={require('../assets/coverletter2.png')} style={{ marginLeft: 'auto', marginRight: 'auto', width: 350, height: 250, marginTop: 20 }} />
                </View>
                <View style={{ marginHorizontal: 20, borderWidth: 1, padding: 16, borderRadius: 20, backgroundColor: 'white' }}>
                    <View style={{ width: '100%', fontSize: 13, fontFamily: 'poppins_medium', }}>
                        <Text style={{ marginTop: 10, fontSize: 16, fontFamily: 'poppins_semibold' }}>Intro</Text>
                        <TextInput value={intro} onChangeText={text => setIntro(text)} style={{ width: '100%', borderColor: '#adadad', borderRadius: 20, borderWidth: 0.5, textAlign: 'center', fontSize: 13, fontFamily: 'poppins_medium', padding: 20, backgroundColor: 'white' }}
                            multiline numberOfLines={5} placeholder={'Introduce Yourself'} >
                        </TextInput>
                    </View>
                    <View style={{
                        width: '100%',
                        fontSize: 13,
                        fontFamily: 'poppins_medium',
                    }}>
                        <Text style={{ marginTop: 10, fontSize: 16, fontFamily: 'poppins_semibold' }}>Body</Text>
                        <TextInput value={proposal} onChangeText={text => setProposal(text)} multiline numberOfLines={9} placeholder={'Proposal'} style={{
                            width: '100%',
                            borderColor: '#adadad',
                            borderRadius: 20,
                            borderWidth: 0.5,
                            textAlign: 'center',
                            fontSize: 13,
                            fontFamily: 'poppins_medium',
                            padding: 20,
                            marginBottom: 'auto',
                            backgroundColor: 'white'
                        }}></TextInput>
                    </View>
                </View>
                <Pressable onPress={() => Apply()} style={{
                    marginHorizontal: 60,
                    paddingVertical: 13,
                    backgroundColor: '#13A3E1',
                    borderRadius: 25,
                    marginTop: 10,
                    marginBottom: 40
                }}><Text style={{ color: '#fff', fontSize: 14, fontFamily: 'poppins_bold', textAlign: 'center' }}>Create Now</Text></Pressable>
            </ScrollView>
            <Toast
                position='top'
                bottomOffset={20}
            />
        </Modal>
    )
}

export default ManageCoverLetter
