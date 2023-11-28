import React from 'react'
import { Image, Modal, Pressable, Text, View } from 'react-native'

const VerificationStatusModal = ({ visible, toggleVisibility,line }) => {
    return (
        <Modal visible={visible} onRequestClose={toggleVisibility} >
            <View style={{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.6)'
            }}>
                <View style={{
                    width: '100%',
                    maxWidth: 300,
                    margin: 48,
                    elevation: 24,
                    borderRadius: 15,
                    backgroundColor: '#fff',
                    opacity: 1,
                    padding: 20
                }}>
                    <Pressable onPress={() => toggleVisibility()} style={{ padding: 10, marginLeft: 'auto' }}>
                        <Image source={require('../assets/close.png')} style={{ width: 12, height: 12, }} />
                    </Pressable>
                    <Image source={require('../assets/alert.png')} style={{ width: 80, height: 65, marginLeft: 'auto', marginRight: 'auto' }} />
                    <Text style={{ fontSize: 17, fontFamily: 'poppins_medium', textAlign: 'center', marginTop: 15 }}>{line}</Text>

                </View>
            </View>
        </Modal>
    )
}

export default VerificationStatusModal
